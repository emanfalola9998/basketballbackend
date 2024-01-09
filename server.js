const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001;

app.use('/api', async (req, res) => {
  try {
    const apiConfig = {
      method: req.method, // Assuming req.method is a string
      url: `https://www.balldontlie.io/api/v1${req.url}`,  // Remove the leading slash
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        // Add any other necessary headers
      },
    };

    const apiResponse = await axios(apiConfig);

    res.json(apiResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
