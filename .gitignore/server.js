const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');

const app = express();

// MIDDDLEWARE
app.use(express.json);
app.use(cors());


const database = {
    users: [
        {
            id: '12',
            name: 'Nmesoma',
            email: 'rocks@gmail.com',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '13',
            name: 'Hamjad',
            email: 'ewa@gmail.com',
            entries: 0,
            joined: new Date(),
        },
    ], 
    login: [
        {
            id: "18",
            hash: "",
            email: "lammiejay02@gmail.com"
        }
    ]
}

// ROOT ROUTE
app.get('/', (req, res) => {
    res.send("database.users");
});


// SIGNIN ROUTE
app.post("/signin", (req, res) => {


    if (req.body.email === database.users[1].email && 
        req.body.password === database.users[1].password){
        res.json("Success");
    } else {
        res.status(400).json("error 400 bad request logging in and signing in");
    }
});

// REGISTER ROUTE
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash("password", null, null, function(err, hash) {
        console.log(hash);
    });

    database.users.push({
            id: '14',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date(),
    });
    res.json(database.users[database.users.length - 1]);
})


// PROFILE ROUTE
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user)
        }
    })
    if (!found) {
        res.status(404).json("not found");
    }
});


// LINK ROUTE
app.put('/link', (req, res) => {
    const { id } = req.body;
    let found = false;

    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries)
        }
    })
    if (!found) {
        res.status(404).json("not found");
    }
});


app.listen(3002, () => {
    console.log("the api is running on port 3002");
});











// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });