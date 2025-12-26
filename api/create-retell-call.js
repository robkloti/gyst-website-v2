// Vercel Serverless Function to securely create Retell web calls
// This keeps your API key safe on the server side

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { agent_id } = req.body;

        if (!agent_id) {
            return res.status(400).json({ error: 'agent_id is required' });
        }

        // Get API key from environment variable (configured in Vercel dashboard)
        const RETELL_API_KEY = process.env.RETELL_API_KEY;

        if (!RETELL_API_KEY) {
            console.error('RETELL_API_KEY environment variable is not set');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Call Retell API to create web call
        const response = await fetch('https://api.retellai.com/v2/create-web-call', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RETELL_API_KEY}`
            },
            body: JSON.stringify({
                agent_id: agent_id
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Retell API error:', errorData);
            return res.status(response.status).json({
                error: errorData.message || 'Failed to create web call'
            });
        }

        const data = await response.json();

        // Return only the necessary data to the client
        return res.status(200).json({
            access_token: data.access_token,
            sample_rate: data.sample_rate
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}
