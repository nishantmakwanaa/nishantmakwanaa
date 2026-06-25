const express = require("express")
const app = express()
app.use(express.json())

let users = [ 
    {
        id:1,
        name:"Nishant",
        age:22
    },
    {
        id:2,
        name:"Divya",
        age:24
    }
]

app.post("/users", (req, res) => {

    const user = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age,
    }

    users.push(user)
    res.json(user)
})

app.get("/users", (req, res) => {
    res.json(users)
})

app.get("/users/:id", (req, res) => {

    const id = Number(req.params.id)

    const user = users.find(
        u => u.id === id
    )

    res.json(user)
})

app.put("/users/:id", (req, res) => {

    const id = Number(req.params.id)

    const user = users.find(
        u => u.id === id
    )

    user.name = req.body.name
    user.age = req.body.name

    res.json(user)
})

app.delete("/users/:id", (req, res) => {

    const id = Number(req.params.id)

    const user = users.filter(
        u => u.id !== id
    )

    res.json({
        messeage: "User Deleted"
    })
})

app.listen(3000)