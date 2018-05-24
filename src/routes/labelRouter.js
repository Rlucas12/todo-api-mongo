const express = require('express');
const Label = require('../models/labelModel');
const signale = require('signale');
const labelRouter = express.Router();

labelRouter.route('/')
    .get((req, res) => {
        Label.find({}, (err, labels) => {
            res.json(labels)
            signale.success('Labels returned successfully')
        })  
    })
    .post((req, res) => {
        let label = new Label(req.body);
        label.name = req.body.name;
        label.color = req.body.color;
        label.save(err => {
            if(err) {
                res.status(500).send(err)
                signale.error("Oops, can't create label")
            } else {
                res.status(201).send(label)
                signale.success('Label created successfully')
            }
        })
    })

// Middleware 
labelRouter.use('/:labelId', (req, res, next)=>{
    Label.findById( req.params.labelId, (err,label)=>{
        if(err) {
            res.status(500).send(err)
            signale.error("Oops, Label not found")
        }
        else {
            req.label = label;
            next()
        }
    })

})
labelRouter.route('/:labelId')
    .get((req, res) => {
        res.json(req.label)
        signale.success('Label returned successfully')
    }) // end get labels/:labelId 
    .put((req,res) => {
        req.label.name = req.body.name;
        req.label.color = req.body.color;
        req.label.save(err => {
            if(err) {
                res.status(500).send(err)
                signale.error("Oops, Label can't be updated")
            } else {
                res.json(req.label)
                signale.success('Label updated successfully')
            }
        })
    })
    .patch((req,res)=>{
        if(req.body._id){
            delete req.body._id;
        }
        for( let p in req.body ){
            req.label[p] = req.body[p]
        }
        req.project.save()
        res.json(req.label)
    })//patch
    .delete((req,res)=>{
        req.label.remove(err => {
            if(err){
                res.status(500).send(err)
                signale.success("Oops, Label can't be removed")
            }
            else{
                res.status(204).send('removed')
                signale.success('Label removed successfully')
            }
        })
    })//delete


module.exports = labelRouter;