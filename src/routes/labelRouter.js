const express = require('express');
const Label = require('../models/labelModel');
const labelRouter = express.Router();

labelRouter.route('/')
    .get((req, res) => {
        Label.find({}, (err, labels) => {
            res.json(labels)
        })  
    })
    .post((req, res) => {
        let label = new Label(req.body);
        if(!label.name || !label.color) {
            res.status(403).send("Fields name, color can't be blank")
        } else {
            label.name = req.body.name;
            label.color = req.body.color;
            label.save()
            res.status(201).send(label) 
        }
    })

// Middleware 
labelRouter.use('/:labelId', (req, res, next)=>{
    Label.findById( req.params.labelId, (err,label)=>{
        if(err)
            res.status(500).send(err)
        else {
            req.label = label;
            next()
        }
    })

})
labelRouter.route('/:labelId')
    .get((req, res) => {
        res.json(req.label)
    }) // end get labels/:labelId 
    .put((req,res) => {
        if(!req.body.name || !req.body.color) {
            res.status(403).send("Fields name, color can't be blank")
        } else {
            req.label.name = req.body.name;
            req.label.color = req.body.color;
            req.label.save()
            res.json(req.label)
        }
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
            }
            else{
                res.status(204).send('removed')
            }
        })
    })//delete


module.exports = labelRouter;