const List = require('../models/List')
const Task = require('../models/Task')
const router = require('express').Router()

router.get('/new', (req, res) => {
    res.render('list/new.ejs')
})

router.post('/new', async (req, res) => {
    try {
        const addList = await List.create({
            name: req.body.name,
            user: req.session.user._id
        })
        res.redirect('/auth/welcome')
    } catch (error) {
        console.log(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const allLists = await List.find(req.session.user._id)
        res.render('list/allLists.ejs', { allLists: allLists })
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
        const updatedList = await List.findByIdAndUpdate({ _id: req.params.id, user: req.session.user._id }, req.body)
        res.redirect('/lists')
    } catch (e) {
        console.log(e)
    }
})

//add validation when the delete btn is clickd it askes the user if they are sure they want to delete because the task in the list would be deleteda
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedList = await List.findByIdAndDelete({ _id: req.params.id, user: req.session.user._id })
        res.redirect('/auth/welcome')
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