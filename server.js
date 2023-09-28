const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware per impostare gli header 'Cache-Control' e 'X-Content-Type-Options'
app.use((req, res, next) => {
  // Imposta l'header 'Cache-Control' per una cache pubblica con un timeout di 1 giorno (86400 secondi)
  res.setHeader('Cache-Control', 'public, max-age=86400');

  // Imposta l'header 'X-Content-Type-Options'
  res.setHeader('X-Content-Type-Options', 'nosniff');

  next();
});

// Servi i file statici (HTML, CSS, JavaScript, JSON, ecc.) dalla directory corrente
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


