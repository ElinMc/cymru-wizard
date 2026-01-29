// Vercel Serverless Function — AI Rubric Generation
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { area, progressionStep, selectedStatements, customOutcomes, taskDescription, uploadedText } = req.body;

    if (!area && !customOutcomes && !taskDescription) {
      return res.status(400).json({ error: 'Please provide an area, outcomes, or task description.' });
    }

    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

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
}
