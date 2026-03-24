// ============================================================
// BANTANI CYMRU CURRICULUM WIZARD — Express Server
// ============================================================

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 18801;

// API key from environment or fallback
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname)));

// ---- POST /api/generate — AI Activity Generation ----
app.post('/api/generate', async (req, res) => {
  try {
    const { context } = req.body;
    if (!context) {
      return res.status(400).json({ error: 'Missing context' });
    }

    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const systemPrompt = `You are a creative educational activity designer specialising in the Curriculum for Wales 2022 (Cwricwlwm i Gymru).

Your role is to generate engaging, practical activity ideas for Welsh teachers based on their lesson plan selections.

Key principles:
- Activities should be rooted in the Four Purposes of the curriculum
- Activities should reflect the Welsh context (cynefin — sense of place, Welsh language, Welsh culture, local environment)
- Activities should be inclusive and support learner progression
- Activities should be practical, creative, and achievable in the given timeframe
- Where appropriate, suggest bilingual (Welsh/English) elements
- Reference the specific Areas of Learning & Experience, Statements of What Matters, and teaching/assessment methods the teacher has chosen

Format your response as 4-6 activity ideas. For each activity:
1. Give it a creative name (with an emoji)
2. Brief description (2-3 sentences)
3. How it connects to the selected curriculum elements
4. Differentiation tip (how to adapt for different learners)
5. Welsh language/culture connection (where relevant)

Make activities varied — mix individual, pair, group, indoor, outdoor, digital, hands-on.`;

    const userMessage = `Please generate creative activity ideas for this Welsh curriculum lesson plan:

${context}

Generate 4-6 varied, engaging activity ideas that align with these selections.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return res.status(502).json({ error: 'AI service error', details: errText });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || 'No response generated.';

    res.json({ activities: text });
  } catch (err) {
    console.error('Generate error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---- POST /api/register — Email Capture ----
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, school, planType, timestamp } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const leadsPath = path.join(__dirname, 'leads.json');
    let leads = [];
    try {
      const existing = fs.readFileSync(leadsPath, 'utf8');
      leads = JSON.parse(existing);
    } catch {
      // File doesn't exist yet
    }

    leads.push({ name, email, school: school || '', planType: planType || 'pdf', timestamp: timestamp || new Date().toISOString() });
    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));

    res.json({ success: true });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---- POST /api/rubric — AI Rubric Generation ----
app.post('/api/rubric', async (req, res) => {
  try {
    const { area, areaId, progressionStep, selectedStatements, customOutcomes, taskDescription, uploadedText } = req.body;

    if (!area && !customOutcomes && !taskDescription) {
      return res.status(400).json({ error: 'Please provide an area, outcomes, or task description.' });
    }

    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Build the statements context
    let statementsContext = '';
    if (selectedStatements && selectedStatements.length > 0) {
      statementsContext = selectedStatements.map(s =>
        `- "${s.title}" (${s.area}): ${s.summary}\n  Full: ${s.description}`
      ).join('\n');
    }

    const systemPrompt = `You are an expert Welsh education assessment designer specialising in the Curriculum for Wales 2022 (Cwricwlwm i Gymru).

Your task is to create professional analytic rubrics that Welsh teachers can use directly in their classrooms.

Key principles:
- Criteria must be mapped to the selected Statements of What Matters from the Curriculum for Wales
- Performance levels must align with Descriptions of Learning from the curriculum
- Language must be appropriate for the specified Progression Step
- Use Welsh curriculum terminology throughout (cynefin, Four Purposes, Descriptions of Learning, etc.)
- Rubric must be specific enough to be immediately usable
- Each criterion should have clear, distinct descriptors at each performance level

CRITICAL: You MUST return valid JSON in this exact format:
{
  "title": "Rubric title describing the assessment",
  "levels": ["Emerging", "Developing", "Securing", "Excelling"],
  "criteria": [
    {
      "name": "Criterion name",
      "swm": "Related Statement of What Matters (if applicable)",
      "descriptors": {
        "emerging": "What emerging performance looks like for this criterion",
        "developing": "What developing performance looks like",
        "securing": "What securing performance looks like",
        "excelling": "What excelling performance looks like"
      }
    }
  ]
}

Generate 4-8 criteria depending on the complexity of the task. Each descriptor should be 1-3 sentences.
The four levels should show clear, meaningful progression:
- Emerging: Beginning to engage; needs significant support; shows initial awareness
- Developing: Growing understanding; needs some support; can demonstrate with guidance
- Securing: Confident application; works independently; consistent demonstration
- Excelling: Sophisticated, deep understanding; leads and innovates; exceeds expectations

Return ONLY the JSON object. No markdown code fences, no explanation — just the raw JSON.`;

    let userMessage = `Create an analytic rubric for the following:\n\n`;
    userMessage += `AREA OF LEARNING AND EXPERIENCE: ${area || 'Not specified'}\n`;
    userMessage += `PROGRESSION STEP: ${progressionStep || 'Not specified'}\n\n`;

    if (statementsContext) {
      userMessage += `STATEMENTS OF WHAT MATTERS (from the Curriculum for Wales):\n${statementsContext}\n\n`;
    }

    if (customOutcomes) {
      userMessage += `CUSTOM LEARNING OUTCOMES:\n${customOutcomes}\n\n`;
    }

    if (taskDescription) {
      userMessage += `TASK DESCRIPTION:\n${taskDescription}\n\n`;
    }

    if (uploadedText) {
      userMessage += `ADDITIONAL CONTEXT FROM UPLOADED DOCUMENT:\n${uploadedText.substring(0, 3000)}\n\n`;
    }

    userMessage += `Generate the rubric as JSON now. Remember: criteria mapped to the Statements of What Matters, language appropriate for ${progressionStep || 'the selected step'}, Welsh curriculum terminology throughout.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return res.status(502).json({ error: 'AI service error', details: errText });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '{}';

    res.json({ rubric: text });
  } catch (err) {
    console.error('Rubric generation error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---- Catch-all: serve index.html ----
app.get('*', (req, res) => {
  // Serve rubric.html for /rubric path
  if (req.path === '/rubric' || req.path === '/rubric.html') {
    return res.sendFile(path.join(__dirname, 'rubric.html'));
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🏴󠁧󠁢󠁷󠁬󠁳󠁿 Cymru Wizard running on http://localhost:${PORT}`);
});
