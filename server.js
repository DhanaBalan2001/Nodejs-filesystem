import express, { json } from 'express';
import { promises as fs } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const folderPath = join(__dirname, 'timestamp');

// Ensure the timestamps folder exists
fs.mkdir(folderPath, { recursive: true }).catch(console.error);

app.use(json());

app.get('/', (req, res) => {
   res.redirect('/get');
});

// Endpoint to create a text file with current timestamp
app.post('/create', async (req, res) => {
  try {
    const now = new Date();
    const fileName = now.toISOString().replace(/:/g, '-') + '.txt';
    const filePath = join(folderPath, fileName);
    await fs.writeFile(filePath, now.toISOString());
    res.status(201).json({ message: 'File created successfully', fileName });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create file' });
  }
});

// Endpoint to retrieve all text files in the folder
app.get('/get', async (req, res) => {
  try {
    const files = await fs.readdir(folderPath);
    const textFiles = files.filter(file => extname(file) === '.txt');
    if (textFiles.length > 0) {
      const timestamps = await Promise.all(textFiles.map(async (file) => {
        const filePath = join(folderPath, file);
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
      }));
      res.type('text/plain').send(timestamps.join('\n'));
    } else {
      res.status(404).send('No timestamp files found');
    }
  } catch (error) {
    res.status(500).send('Failed to retrieve files');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});