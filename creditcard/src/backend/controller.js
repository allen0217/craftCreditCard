'use strict';

const express    = require('express');       

const router = express.Router();    

 

const User     = require('./model');

 

router.get('/', (req, res) => {

    res.json({ message: 'welcome to our api!' });  

});

 

 

    router.post('/new', (req, res) => {

       var user = new User(req.body);     

    

        user.save(err => {

            if (err)

                res.status(500).send(err);

            else

            res.status(200).json({user})

        });

       

    });