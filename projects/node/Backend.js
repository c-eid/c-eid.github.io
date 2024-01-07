const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3020;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to save a string with title and author
app.post('/saveString', (req, res) => {
    const data = req.body;
    let jsonData = JSON.parse(fs.readFileSync('userkey.json', 'utf-8'));
    const foundString = jsonData.find(item => item.key === data.key);

    if (foundString) {
        if (!foundString.banned) {
            jsonData = [];
            try {
                const fileData = fs.readFileSync('data.json', 'utf-8');
                jsonData = JSON.parse(fileData);
            } catch (error) {
                console.error('Error reading data file:', error);
            }

            const newString = {
                id: jsonData.length + 1,
                title: data.title,
                author: data.author,
                value: data.value,
            };

            jsonData.push(newString);

            fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2), 'utf-8');

            res.json({ success: true, id: newString.id });
        }
    }else{
        res.json({ success: false})
    }

});

// Endpoint to get a string by ID, including title and author
app.get('/getString/:id', (req, res) => {
    const requestedId = parseInt(req.params.id);
    const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

    const foundString = jsonData.find(item => item.id === requestedId);

    if (foundString) {
        res.json({
            success: true,
            id: foundString.id,
            title: foundString.title,
            author: foundString.author,
            value: foundString.value,

        });
        console.log("success" + requestedId);
    } else {
        res.status(404).json({ success: false, message: 'String not found' });
    }
});

app.post('/chkString', (req, res) => {
    const data = req.body;
    console.log("checked");
    console.log(data.value.length);

    if (data.value.length > 230) {
        console.log("checkedWorked");
        res.json({ success: true });
    }

});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.post('/saveKey', (req, res) => {
    const data = req.body;

    let jsonData = [];
    try {
        const fileData = fs.readFileSync('userkey.json', 'utf-8');
        jsonData = JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading data file:', error);
    }

    const newString = {
        key: data.key,
        name: data.name,
        banned: false,
        online: false,
        id: jsonData.length + 1
    };

    jsonData.push(newString);

    fs.writeFileSync('userkey.json', JSON.stringify(jsonData, null, 2), 'utf-8');
    console.log("awsdhfa.k,sj;ldfhx");
    res.json({ success: true });
});

app.get('/getMyInfo/:id', (req, res) => {
    console.log(req.params.id);
    const requestedId = req.params.id;
    const jsonData = JSON.parse(fs.readFileSync('userkey.json', 'utf-8'));

    const foundString = jsonData.find(item => item.key === requestedId);

    if (foundString) {
        res.json({
            success: true,
            name: foundString.name,
            banned: foundString.banned,
            online: foundString.online,
            id: foundString.id
        });


    } else {
        res.status(404).json({ success: false, message: 'String not found' });
    }
});
