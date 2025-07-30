const List = require('../models/List')
const Task = require('../models/Task')
const router = require('express').Router()

router.get('/new', (req, res) => {
    res.render('list/new.ejs')
})

router.post('/new', async (req, res) => {
    try {
        const addList = await List.create(req.body)

        res.redirect('/lists')
    } catch (error) {
        console.log(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const allLists = await List.find()
        res.render('list/allLists.ejs', { allLists: allLists })
    } catch (error) {
        console.log(error)
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const foundList = await List.findById(req.params.id)
        res.render('list/updateList.ejs', { foundList: foundList})
    }
    catch (error) {
        console.log(error)
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const updatedList = await List.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/lists')
    } catch (e) {
        console.log(e)
    }
})

//add validation when the delete btn is clickd it askes the user if they are sure they want to delete because the task in the list would be deleteda
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedList = await List.findByIdAndDelete(req.params.id)
        res.redirect('/lists')
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const foundList = await List.findById(req.params.id).populate('tasks')
        res.render('list/listDetails.ejs', { foundList: foundList })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router