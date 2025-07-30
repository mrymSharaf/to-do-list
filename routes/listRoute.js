const List = require('../models/List')
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

router.get('/:id', async (req, res) => {
    try {
        const foundList = await List.findById(req.params.id).populate('tasks')
        res.render('list/listDetails.ejs', { foundList: foundList })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router