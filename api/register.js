// Vercel Serverless Function — Email Capture
// Note: On Vercel, we can't write to filesystem. Leads are logged to console
// and can be captured via Vercel's log drain, or switch to a database later.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, school, planType, timestamp } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Log the lead (visible in Vercel logs / log drain)
    console.log('NEW_LEAD:', JSON.stringify({
      name,
      email,
      school: school || '',
      planType: planType || 'pdf',
      timestamp: timestamp || new Date().toISOString()
    }));

    res.json({ success: true });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
