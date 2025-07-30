const router = require('express').Router()
const Task = require('../models/Task')
const List = require('../models/List')

router.get('/new', async (req, res) => {
    const allLists = await List.find({ user: req.session.userId })
    res.render('task/new.ejs', { allLists })
})

router.post('/new', async (req, res) => {
    try {
        const addTask = await Task.create(req.body)
        res.redirect('/tasks')
    } catch (error) {
        console.log(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const allTasks = await Task.find({ user: req.session.userId }).populate('list')
        res.render('task/allTasks.ejs', { allTasks: allTasks })
    } catch (error) {
        console.log(error)
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const foundTask = await Task.findById(req.params.id)
        res.render('task/updateTask.ejs', { foundTask: foundTask })
    }
    catch (error) {
        console.log(error)
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/tasks')//change
    } catch (e) {
        console.log(e)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        res.redirect('/tasks')
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const foundTask = await Task.findById(req.params.id).populate('list')
        res.render('task/taskDetails.ejs', { foundTask: foundTask })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router