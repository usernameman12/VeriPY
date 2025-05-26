const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const sendCode = require('./mailer');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let currentCode = null;

app.post('/send', async (req, res) => {
  const { email } = req.body;
  currentCode = Math.floor(1000000 + Math.random() * 9000000).toString();
  try {
    await sendCode(email, currentCode);
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
});

app.post('/verify', (req, res) => {
  const { code } = req.body;
  res.send({ success: code === currentCode });
});

app.get('/after', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'after.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error loading content.');
    res.send(data);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
