const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const memoryFile = 'memory.json';

// Hafıza dosyasını oku
app.get('/memory', (req, res) => {
  fs.readFile(memoryFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send({ error: 'Hafıza dosyası okunamadı.' });
    }
    res.send(JSON.parse(data));
  });
});

// Hafıza dosyasını güncelle
app.post('/memory', (req, res) => {
  const updatedMemory = req.body;
  fs.writeFile(memoryFile, JSON.stringify(updatedMemory, null, 2), (err) => {
    if (err) {
      return res.status(500).send({ error: 'Hafıza dosyası güncellenemedi.' });
    }
    res.send({ status: 'Hafıza güncellendi.' });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${port}`);
});
