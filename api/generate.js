// Vercel Serverless Function — AI Activity Generation
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { context, includeDetailedFormat, hasInclusionNeeds } = req.body;
    if (!context) {
      return res.status(400).json({ error: 'Missing context' });
    }

    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const baseSystemPrompt = `You are a creative educational activity designer specialising in the Curriculum for Wales 2022 (Cwricwlwm i Gymru).

Your role is to generate engaging, practical activity ideas for Welsh teachers based on their lesson plan selections.

Key principles:
- Activities should be rooted in the Four Purposes of the curriculum
- Activities should reflect the Welsh context (cynefin — sense of place, Welsh language, Welsh culture, local environment)
- Activities should be inclusive and support learner progression
- Activities should be practical, creative, and achievable in the given timeframe
- Where appropriate, suggest bilingual (Welsh/English) elements
- Reference the specific Areas of Learning & Experience, Statements of What Matters, and teaching/assessment methods the teacher has chosen`;

    const detailedFormat = `

Format your response as 4-6 activity ideas using this EXACT structure for each:

## [Emoji] [Creative Activity Name]

**Overview:** [1-2 sentence summary of the activity]

**Full Description:** [3-4 sentences describing the activity in detail - what learners do, how it unfolds, expected outcomes]

**How It Delivers on Your Curriculum Selections:** [Explain specifically how this activity addresses the Four Purposes, Areas of Learning, Statements of What Matters, and skills the teacher selected. Be specific and reference their actual selections.]

${hasInclusionNeeds ? `**Inclusion & Differentiation:** [Provide SPECIFIC adaptations for the Additional Learning Needs the teacher indicated. Don't just say "differentiate" — give concrete strategies for each need mentioned, e.g., "For dyslexic learners: provide word mats and allow verbal responses. For ADHD: break into 10-minute chunks with movement breaks."]` : `**Differentiation Tips:** [General suggestions for adapting to different abilities]`}

**Welsh Language & Culture:** [How Welsh language, culture, cynefin, or local context can be woven in — specific vocabulary, cultural connections, local examples]

**Resources Needed:** [List of materials, technology, or preparation required]

---

Make activities varied — mix individual, pair, group, indoor, outdoor, digital, hands-on approaches.`;

    const simpleFormat = `

Format your response as 4-6 activity ideas. For each activity:
1. Give it a creative name (with an emoji)
2. Brief description (2-3 sentences)
3. How it connects to the selected curriculum elements
4. Differentiation tip (how to adapt for different learners)
5. Welsh language/culture connection (where relevant)

Make activities varied — mix individual, pair, group, indoor, outdoor, digital, hands-on.`;

    const systemPrompt = baseSystemPrompt + (includeDetailedFormat ? detailedFormat : simpleFormat);

    const userMessage = `Please generate creative activity ideas for this Welsh curriculum lesson plan:

${context}

Generate 4-6 varied, engaging activity ideas that align with these selections.${hasInclusionNeeds ? ' Pay special attention to the INCLUSION / ADDITIONAL LEARNING NEEDS section and provide specific, practical adaptations for each need listed.' : ''}`;

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
    const text = data.content?.[0]?.text || 'No response generated.';

    res.json({ activities: text });
  } catch (err) {
    console.error('Generate error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
