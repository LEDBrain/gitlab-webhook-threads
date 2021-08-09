const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());

import WebhookEvent from './events/WebhookEvent';

app.post('/incoming', (req, res) => {
    console.log(req.body);
    WebhookEvent.emit('post', req.body);
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
