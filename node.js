const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/start-mining', (req, res) => {
    exec('ethminer -P stratum://0xafbb9726c0b603b9cac4d5d77dbe6aa50c4fc012@ethpool.org:3333', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting mining: ${error}`);
            return res.json({ message: 'Error starting mining' });
        }
        res.json({ message: 'Mining started' });
    });
});

app.post('/stop-mining', (req, res) => {
    exec('pkill ethminer', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error stopping mining: ${error}`);
            return res.json({ message: 'Error stopping mining' });
        }
        res.json({ message: 'Mining stopped' });
    });
});

app.listen(port, () => {
    console.log(`Ethereum mining app listening at http://localhost:${port}`);
});
