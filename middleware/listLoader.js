const List = require('../models/List')

const loadUserLists = async (req, res, next) => {
    const user = req.session.user
    res.locals.user = user

    if (!user) {
        res.locals.lists = []
        return next()
    }

    try {
        res.locals.lists = await List.find({ user: user._id })
    } catch (error) {
        console.log("List load error:", error)
        res.locals.lists = []
    }

    next()
}

module.exports = loadUserLists
