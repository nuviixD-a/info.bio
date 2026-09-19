// Production server: serves the built site from dist/ and the view-counter API.
// Usage: node serve.cjs   (or set PORT env var)
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 80;
const VIEWS_FILE = path.join(__dirname, 'views.json');

// Load persisted view count so restarts don't reset it
let viewCount = 0;
try {
  viewCount = JSON.parse(fs.readFileSync(VIEWS_FILE, 'utf8')).count || 0;
} catch (_) { /* first run */ }

app.use(require('cors')());

app.get('/increment-view', (req, res) => {
  viewCount += 1;
  try { fs.writeFileSync(VIEWS_FILE, JSON.stringify({ count: viewCount })); } catch (_) {}
  res.json({ viewCount });
});

// Serve the built frontend
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serving dist/ on http://0.0.0.0:${PORT} (views: ${viewCount})`);
});
