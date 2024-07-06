const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];

app.get('/', (req, res) => {
    res.send('Welcome to the CRUD by Sergio Malyshev');
});

// create
app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
});

//read
app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.send(user);
});

//update
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    user.name = req.body.name;
    res.send(user);
});

//delete
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found');

    const deletedUser = users.splice(userIndex, 1);
    res.send(deletedUser);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});