const router = require('express').Router()
const User = require('../models/User')
const List = require('../models/List')
const bcrypt = require('bcrypt')

router.get('/signUp', (req, res) => {
    res.render('auth/signUp.ejs', { error: null })
})

router.post('/signUp', async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.render("auth/signUp", {
                error: "All fields are required."
            })
        }

        if (password.length < 6) {
            return res.render("auth/signUp", {
                error: "Password must be at least 6 characters long."
            })
        } else if (/\s/.test(password)) {
            return res.render("auth/signUp", {
                error: "Password contains empty space."
            })
        }

        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.render("auth/signUp", {
                error: "Username is already taken."

            })
        }

        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = {
            username,
            password: hashedPassword,
        }

        const createdUser = await User.create(newUser)
        req.session.user = {
            username: createdUser.username,
            _id: createdUser._id 
        }
        res.redirect("/auth/homepage")

    } catch (error) {
        console.error("Sign Up error:", error)
        res.render("auth/signUp", {
            error: "Something went wrong. Please try again."
        })
    }
})


router.get("/homepage", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/auth/login")
    }

    try {
        const userLists = await List.find({ user: req.session.user._id }).populate('tasks')
        res.render("auth/homepage.ejs", { userLists })
    } catch (error) {
        console.log(error)
    }
})


router.get("/login", (req, res) => {
    res.render("auth/login.ejs", { error: null })
})

router.post('/login', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username })

        if (!userInDatabase) {
            return res.render("auth/login", { error: "Username not found." })
        }

        const validPassword = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password
        )

        if (!validPassword) {
            return res.render("auth/login", { error: "Incorrect password." })
        }

        req.session.user = {
            username: userInDatabase.username,
            _id: userInDatabase._id
        }

        res.redirect("/auth/homepage")

    } catch (error) {
        console.error("Error during sign in:", error)
        res.render("auth/signUp", { error: "An unexpected error occurred." })
    }
})

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/auth/login")
})

module.exports = router