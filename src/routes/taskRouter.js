const express = require('express');
const Task = require('../models/taskModel');
const signale = require('signale');
const taskRouter = express.Router();

taskRouter.route('/')
    .get((req, res) => {
        Task.find({}, (err, tasks) => {
            res.json(tasks)
            signale.success('Tasks returned successfully')
        })  
    })
    .post((req, res) => {
        let task = new Task(req.body);
        task.save(err => {
            if(err) {
                res.status(500).send(err)
                signale.success("Oops, can't create task")
            } else {
                res.status(201).send(task)
                signale.success('Task created successfully')
            }
        });
    })

// Middleware 
taskRouter.use('/:taskId', (req, res, next)=>{
    Task.findById( req.params.taskId, (err,task)=>{
        if(err) {
            res.status(500).send(err)
            signale.error("Oops, Task not found")
        }
        else {
            req.task = task;
            next()
        }
    })

})
taskRouter.route('/:taskId')
    .get((req, res) => {
        res.json(req.task)
        signale.success('Task returned successfully')
    }) // end get tasks/:taskId 
    .put((req,res) => {
        req.task.content = req.body.content;
        req.task.priority = req.body.priority;
        req.task.isOver = req.body.isOver;
        req.task.save(err => {
            if(err) {
                res.status(500).send(err)
                signale.error("Oops, Task can't be updated")
            } else {
                res.json(req.task)
                signale.success('Task updated successfully')
            }
        })
    })
    .patch((req,res)=>{
        if(req.task._id){
            delete req.body._id;
        }
        for( let p in req.body ){
            req.task[p] = req.body[p]
        }
        req.task.save()
        res.json(req.task)
    })//patch
    .delete((req,res)=>{
        req.task.remove(err => {
            if(err){
                res.status(500).send(err)
                signale.success("Oops, Task can't be removed")
            }
            else{
                res.status(204).send('removed')
                signale.success('Task removed successfully')
            }
        })
    })//delete


module.exports = taskRouter;