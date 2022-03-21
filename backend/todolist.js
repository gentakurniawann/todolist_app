const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const db = require('./config')

//get all todolist
app.get('/', (req,res) => {
    let sql= "select * from todolist"
    db.query(sql, (err, result) => {
        if (err) {
           res.json({
               message: err.message
           })
        }else{
            res.json({
                count: result.length,
                todolist: result
            })
        }
    })
})

//get completed todolist
app.get('/completed', (req,res) => {
    let sql= "select * from todolist where status = 'completed'"
    db.query(sql, (err, result) => {
        if (err) {
           res.json({
               message: err.message
           })
        }else{
            res.json({
                count: result.length,
                todolist: result
            })
        }
    })
})

//get uncompleted todolist
app.get('/uncompleted', (req,res) => {
    let sql= "select * from todolist where status = 'uncompleted'"
    db.query(sql, (err, result) => {
        if (err) {
           res.json({
               message: err.message
           })
        }else{
            res.json({
                count: result.length,
                todolist: result
            })
        }
    })
})

//save todolist
app.post('/save', (req,res) => {
    let data = {
        activity: req.body.activity,
        status: req.body.status
    }
    let sql = "insert into todolist set ?"
    db.query(sql, data, (err,result) => {
        if(err) {
            res.json({
                message: err.message
            })
        }else{
            res.json({
                message: result.affectedRows + " row inserted"
            })
        }
    })
})

//update todolist
app.post('/update', (req,res) => {
    let data = [
        {
            activity: req.body.activity,
            status: req.body.status
        },
            req.body.id
    ]
    let sql = "update todolist set ? where id = ?"
    db.query(sql, data, (err,result) => {
        if(err) {
            res.json({
                message: err.message
            })
        }else{
            res.json({
                message: result.affectedRows + " row updated"
            })
        }
    })
})

//delete todolist
app.delete('/:id', (req,res) => {
    let data = {
        id: req.params.id
    }
    let sql = "delete from todolist where ?"
    db.query(sql, data, (err,result) => {
        if(err) {
            res.json({
                message: err.message
            })
        }else{
            res.json({
                message: result.affectedRows + " row deleted"
            })
        }
    })
})
module.exports = app