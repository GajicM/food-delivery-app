const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const { registerSchema, loginSchema } = require('./models/schemas/userSchema');
const app = express();

var corsOptions = {
    origin: ['*','https://app-gui.onrender.com'],
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/register', async (req, res) => {
    console.log(req.body)
    const obj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        admin: req.body.admin,
        password: bcrypt.hashSync(req.body.password, 10),
        moderator: req.body.moderator,
        username:req.body.username
    };
   
    try{
    await registerSchema.validateAsync(obj, { abortEarly: false });

    Users.create(obj).then( rows => {
        
        const usr = {
            userId: rows.id,
            user: rows.username,
            admin:rows.admin,
            moderator:rows.moderator
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        
       
        
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
}    catch(err){
    console.log(err);
    let fullMsg = "";
    err.details.forEach(element => {
        fullMsg = fullMsg + element.message + "\n";
    });
    const data = {
        msg: fullMsg,
    }
    console.log(fullMsg);
    return res.status(400).json(data);
}
});

app.post('/login',async (req, res) => {
        console.log(req.body);
    const obj = {
        password: bcrypt.hashSync(req.body.password, 10),
        username:req.body.username
    };
  
    try{
        await loginSchema.validateAsync(obj, { abortEarly: false });
    Users.findOne({ where: { username: req.body.username } })
        .then( usr => {
           
            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.username,
                    admin:usr.admin,
                    moderator:usr.moderator
                };
           
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json({ msg: "Invalid username"}));
    } catch(err){
        console.log(err);
        let fullMsg = "";
        err.details.forEach(element => {
            fullMsg = fullMsg + element.message + "\n";
        });
        const data = {
            msg: fullMsg,
        }
        console.log(fullMsg);
        return res.status(400).json(data);
    }
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});