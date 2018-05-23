const express = require('express');
const Project = require('../models/projectModel');
const projectRouter = express.Router();

projectRouter.route('/')
    .get((req, res) => {
        Project.find({}, (err, projects) => {
            res.json(projects)
        })  
    })
    .post((req, res) => {
        let project = new Project(req.body);
        project.save(err => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(project)
            }
        });
    })

// Middleware 
projectRouter.use('/:projectId', (req, res, next)=>{
    Project.findById( req.params.projectId, (err,project)=>{
        if(err)
            res.status(500).send(err)
        else {
            req.project = project;
            next()
        }
    })

})
projectRouter.route('/:projectId')
    .get((req, res) => {
        res.json(req.project)
    }) // end get projects/:projectId 
    .put((req,res) => {
        req.project.name = req.body.name;
        req.project.color = req.body.color;
        req.project.isArchived = req.body.isArchived;
        req.project.save(err => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.json(req.project);
            }
        })
    })
    .patch((req,res)=>{
        if(req.body._id){
            delete req.body._id;
        }
        for( let p in req.body ){
            req.project[p] = req.body[p]
        }
        req.project.save()
        res.json(req.project)
    })//patch
    .delete((req,res)=>{
        req.project.remove(err => {
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(204).send('removed')
            }
        })
    })//delete


module.exports = projectRouter;