const express = require('express');
const app = express();
const port = 3000;

function setFooBar(number) {
    let value = '';
    
    if (number % 2 === 0) {
        value = "foo";
    }
    if (number % 3 === 0) {
        value = value + "bar";
    }

    return value;
}

app.get('/api/foobar', (req, res, next) => {
    const { number } = req.query;
    const value = setFooBar(number);
    res
        .header({ 'Access-Control-Allow-Origin': '*' })
        .send({ value });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});