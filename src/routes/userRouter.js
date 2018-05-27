const express = require('express');
const User = require('../models/userModel');
const signale = require('signale');
const userRouter = express.Router();

userRouter.route('/')
    .get((req, res) => {
        User.find()
        .populate('projects')
        .populate('tasks')
        .populate('labels')
        .exec( (err, users) => {
            if(err) {
                res.status(500).send(err);
                signale.error("Oops, can't list users")
            } else {
                res.json(users)
                signale.success('Users returned successfully')
            } 
        });
    })
    .post((req, res) => {
        let user = new User(req.body);
        user.save(err => {
            if(err) {
                res.status(500).send(err);
                signale.error("Oops, can't create user")
            } else {
                res.status(201).send(user)
                signale.success('User created successfully')
            } 
        });
    })

// Middleware 
userRouter.use('/:userId', (req, res, next)=>{
    User.findById( req.params.userId, (err,user)=>{
        if(err) {
            res.status(500).send(err)
            signale.error("Oops, User not found")
        }
        else {
            req.user = user;
            next()
        }
    })

})
userRouter.route('/:userId')
    .get((req, res) => {
        res.json(req.user)
        signale.success('User returned successfully')
    }) // end get users/:userId 
    .put((req,res) => {
        req.user.firstname = req.body.firstname;
        req.user.lastname = req.body.lastname;
        req.user.email = req.body.email;
        req.user.save(err => {
            if(err) {
                res.status(500).send(err)
                signale.error("Oops, User can't be updated")
            } else {
                res.json(req.user)
                signale.success('User updated successfully')
            }
        })
    })
    .patch((req,res)=>{
        if(req.body._id){
            delete req.body._id;
        }
        for( let p in req.body ){
            req.user[p] = req.body[p]
        }
        req.user.save()
        res.json(req.user)
    })//patch
    .delete((req,res)=>{
        req.user.remove(err => {
            if(err){
                res.status(500).send(err)
                signale.success("Oops, User can't be removed")
            }
            else{
                res.status(204).send('removed')
                signale.success('User removed successfully')
            }
        })
    })//delete


module.exports = userRouter;