const router = require('express').Router()
const Task = require('../models/Task')
const List = require('../models/List')

router.get('/new', async (req, res) => {
    const allLists = await List.find({ user: req.session.user._id })
    res.render('task/new.ejs', { allLists })
})

router.post('/new', async (req, res) => {
    try {
        const addTask = await Task.create({
            content: req.body.content,
            dueAt: req.body.dueAt,
            completed: req.body.completed,
            list: req.body.list,
            user: req.session.user._id
        })
        const foundList = await List.findById(addTask.list)
        foundList.tasks.push(addTask._id)
        await foundList.save()
        res.redirect(`/lists/${foundList._id}`)
    } catch (error) {
        console.log(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const allTasks = await Task.find({ user: req.session.user._id }).populate('list')
        res.render('task/allTasks.ejs', { allTasks: allTasks })
    } catch (error) {
        console.log(error)
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const foundTask = await Task.findOne({ _id: req.params.id, user: req.session.user._id })
        const allLists = await List.find({ user: req.session.user._id })
        res.render('task/updateTask.ejs', { foundTask, allLists })
    }
    catch (error) {
        console.log(error)
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const completedValue = req.body.completed === 'on' ? true : false
        const updatedTask = await Task.findByIdAndUpdate({ _id: req.params.id, user: req.session.user._id },
            {
                content: req.body.content,
                dueAt: req.body.dueAt,
                completed: completedValue,
                list: req.body.list
            }, { new: true })
        res.redirect('/auth/welcome')
    } catch (e) {
        console.log(e)
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete({
            _id: req.params.id,
            user: req.session.user._id
        })
        res.redirect('/auth/welcome')
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const foundTask = await Task.findById({ _id: req.params.id, user: req.session.user._id }).populate('list')
        res.render('task/taskDetails.ejs', { foundTask: foundTask })
    } catch (error) {
        console.log(error)
    }
})

router.post('/:id/toggle', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)

        task.completed = !task.completed
        await task.save()

        const listId = task.list
        res.redirect(`/lists/${listId}`)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router