# 🗓️✔️ JustDo 

A user-friendly to-do list app built with the MEN stack (MongoDB, Express.js, Node.js). JustDo helps users manage their daily tasks with ease through lists, due dates, completion tracking, and an intuitive interface.

<img width="945" height="413" alt="Image" src="https://github.com/user-attachments/assets/ef17e1be-25bd-4030-b250-bdc74ded1833" />

---

## 🌟 About the App

JustDo lets users:
- Register and log in securely
- Create multiple task lists
- Add, edit, and delete tasks
- Set due dates and mark tasks as completed
- View all their tasks or filter by list

This website was built to practice full CRUD functionality using a Node.js backend, EJS templating for views, and MongoDB for data persistence. It was designed to be clean, fast, and easy to use.

---

## 🚀 Getting Started
- 🟢 [**Live Demo**](https://justdo-wje5.onrender.com)

---

## 🛠️ Technologies Used
- [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
- [![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
- [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#)
- [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)](#)
- [![EJS](https://img.shields.io/badge/EJS-B4CA65?logo=ejs&logoColor=fff)](#)
- [![CSS](https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff)](#)

---

## 📌 Features
- Full user authentication (signup/login logout)
- Protected routes with middleware
- Custom user sessions
- Task completion toggling
- Dynamic sidebar with user's lists 

---

## Challanges
One of the biggest challenges I faced was keeping a task’s completed state in sync across multiple views (the homepage task list, the list details page, and the edit task overview). I needed a way for the user to check off a task from any of these three locations and have it immediately reflect everywhere without duplicating a bunch of logic.

**The Problem**
 - The same “checkbox toggle” UI appears in three different EJS templates
 - Toggling a task needed to update the database and then refresh the user back to the correct page
 - I didn’t want to write three separate handlers or duplicate save logic in multiple places

**The Solution** <br>
  I created a single toggle route that flips the completed flag and then redirects the user to the home page.

```js
router.post('/:id/toggle', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)

        task.completed = !task.completed
        await task.save()

        res.redirect('/auth/homepage')
    } catch (error) {
        console.log(error)
    }
})
```
Then, in each of the three templates, I wired up the checkbox to submit to this route on change.

```
<form action="/tasks/<%= task._id %>/toggle" method="POST" class="inline-form">
     <input type="checkbox" name="completed" <%= task.completed ? 'checked' : '' %> onchange="this.form.submit()" />
</form>
```
This approach kept my code clean and ensured that toggling tasks felt consistent everywhere in the app.

---

## 🔗 Attributions
- [Fonts](https://fonts.google.com/specimen/Nunito)
- [Logo](https://logo.com/dashboard)
- [Bootstrap Icons](https://icons.getbootstrap.com)
- [Code Resources](https://stackoverflow.com/questions/3200249/html-list-style-type-dash)
- [Code Resources](https://www.w3schools.com/jsref/jsref_toisostring.asp)

---

## 🔮 Next Steps
- Add calendar view for due dates
- Share Lists with other users

# Thank you for checking out JustDo!