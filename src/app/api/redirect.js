export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Assuming the request body has an 'address' field you want to redirect to
        // Adjust the extraction logic based on your actual request structure and validate accordingly
        const { address } = req.body;
  
        // Encode the address to ensure it's safe for URL use
        const encodedAddress = encodeURIComponent(address);
  
        // Construct the redirect URL with the encoded address
        const redirectUrl = `https://airstack-nft-gif-builder.vercel.app/?address=${encodedAddress}`;
  
        // Respond with a 302 redirect status and set the Location header
        res.setHeader('Location', redirectUrl);
        res.status(302).send(null);
      } catch (error) {
        console.error('Error processing redirection:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      // Handle non-POST requests or provide a meaningful message/response
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  