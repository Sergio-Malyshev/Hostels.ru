const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the CRUD by Sergio Malyshev');
});

// create
app.post('/users', (req, res) => {
    const { name } = req.body;
    const query = `INSERT INTO users (name) VALUES (?)`;
    db.run(query, [name], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).send({ id: this.lastID, name });
        }
    });
});

//read all users
app.get('/users', (req, res) => {
    const query = `SELECT * FROM users`;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(rows);
        }
    });
});

//read user by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM users WHERE id = ?`;
    db.get(query, [id], (err, row) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (!row) {
            res.status(404).send('User not found');
        } else {
            res.send(row);
        }
    });
});


//update
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = `UPDATE users SET name = ? WHERE id = ?`;
    db.run(query, [name, id], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else if (this.changes === 0) {
            res.status(404).send('User not found');
        } else {
            res.send({ id, name });
        }
    });
});

//delete
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM users WHERE id = ?`;
    db.run(query, [id], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else if (this.changes === 0) {
            res.status(404).send('User not found');
        } else {
            res.send({ message: 'User deleted' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});