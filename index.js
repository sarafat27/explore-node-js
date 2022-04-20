const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('I can use node js from  now')
});

const users = [
    { id: 1, name: 'brad pitt', job: 'acting', movie: 'seven' },
    { id: 2, name: 'chris bale', job: 'acting', movie: 'batman' },
    { id: 3, name: 'd caprio', job: 'acting', movie: 'inception' },
    { id: 4, name: 'hugh jackman', job: 'acting', movie: 'the prestige' },
    { id: 5, name: 'tom cruise', job: 'acting', movie: 'Top gun' },
    { id: 6, name: 'cylian murphy', job: 'acting', movie: 'dunkirk' }
]

app.get('/users', (req, res) => {
    //filter by search query parameter
    if (req.query.name) {
        const search = req.query.name.toLowerCase();
        const matched = users.filter(user => user.name.toLowerCase().includes(search));
        res.send(matched)
    }
    else {
        res.send(users)
    }
})

app.get('/user/:id', (req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id)
    res.send(user)
})

app.get('/fruits', (req, res) => {
    res.send(['mango', 'pineapple', 'jackfruit'])
})

app.post('/user', (req, res) => {
    console.log('request', req.body)
    const user = req.body;
    user.id = users.length + 1;
    users.push(user)
    res.send(user)
})

app.get('/fruits/mango/fazli', (req, res) => {
    res.send('it is little sour')
})

app.listen(port, () => {
    console.log('Listening to port', port)
})