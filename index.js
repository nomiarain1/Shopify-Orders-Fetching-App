const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
// const session = require('express-session');
// const crypto = require('crypto');
// const cookieParser = require('cookie-parser');
// const fetch =  require('node-fetch');
// const querystring = require('querystring');

dotenv.config();
const app = express();
const PORT = 4000;
const SHOPIFY_APP_URL= process.env.SHOPIFY_APP_URL;
const SHOPIFY_API_ACCESS_TOKEN= process.env.SHOPIFY_API_ACCESS_TOKEN;
const SHOPIFY_API_KEY= process.env.SHOPIFY_API_KEY;


// Orders Page
app.get('/orders', async (req, res) => {
//   const shop = req.session.shop;
//   const token = req.session.accessToken;

//   if (!shop || !token) return res.redirect('/');
console.log("url",SHOPIFY_APP_URL, SHOPIFY_API_ACCESS_TOKEN, SHOPIFY_API_KEY);
try {
  const response = await axios.get(`https://${SHOPIFY_API_KEY}:${SHOPIFY_API_ACCESS_TOKEN}@${SHOPIFY_APP_URL}/admin/api/2024-07/orders.json`, {
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_API_ACCESS_TOKEN,
      'Content-Type': 'application/json'
    }
  });

  const data = response.data;
  console.log('Orders:', data);

  // const orders = data.orders;
  // res.render('orders', { shop: SHOPIFY_APP_URL, orders });

} catch (err) {
  console.error('Error fetching orders:', err.message);
  if (err.response) {
    console.error('Status:', err.response.status);
    console.error('Data:', err.response.data);
  }
  res.send('Error fetching orders');
}
});


// // Update order note
// app.post('/update-note', async (req, res) => {
//   const { order_id, note } = req.body;
//   const shop = req.session.shop;
// //  const token = req.session.accessToken;

//   try {
//     await axios.put(`https://${shop}/admin/api/2023-01/orders/${order_id}.json`, {
//       order: {
//         id: order_id,
//         note
//       }
//     }, {
//       headers: {
//         'X-Shopify-Access-Token': token,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.redirect('/orders');
//   } catch (err) {
//     console.error(err);
//     res.send('Error updating note');
//   }
// });

// Home
app.get('/', (req, res) => {
  res.send('<h2>Order Notes Tracker</h2><a href="/install?shop=your-store.myshopify.com">Install App</a>');
});

app.listen(PORT, () => console.log(`✅ App running on http://localhost:${PORT}`));
