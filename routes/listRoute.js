const List = require('../models/List')
const Task = require('../models/Task')
const router = require('express').Router()

router.get('/new', (req, res) => {
    res.render('list/new.ejs')
})

router.post('/new', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/auth/signUp')
        }
        const addList = await List.create({
            name: req.body.name,
            user: req.session.user._id
        })
        res.redirect('/auth/homepage')
    } catch (error) {
        console.log(error)
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const foundList = await List.findOne({ _id: req.params.id, user: req.session.user._id })
        res.render('list/updateList.ejs', { foundList: foundList })
    }
    catch (error) {
        console.log(error)
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const updatedList = await List.findOneAndUpdate({ _id: req.params.id, user: req.session.user._id }, req.body, { new: true })
        res.redirect('/auth/homepage')
    } catch (e) {
        console.log(e)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedList = await List.findOneAndDelete({ _id: req.params.id, user: req.session.user._id })
        res.redirect('/auth/homepage')
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const foundList = await List.findById(req.params.id).populate('tasks')

        if (!foundList || foundList.user.toString() !== req.session.user._id.toString()) {
            return res.status(403).send("Access denied")
        }
        res.render('list/listDetails.ejs', { foundList })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router