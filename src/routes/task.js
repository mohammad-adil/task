let express = require('express')
let router = new express.Router()
const User = require('../models/user')
const Task = require('../models/task')


router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const allowedTasks = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!allowedTasks) {
        res.status(400).send('Invalid Task Update')
    }
    try {
        let updateTask = await Task.findByIdAndUpdate(_id, req.body, { new: true })
        if (!updateTask) {
            res.status(404).send('No Such Task Found')
        } else {

            res.status(200).send(updateTask)
        }
    } catch (e) {

        res.status(500).send('Something went Wrong')
    }

})


router.delete('/tasks/:id', async (req, res) => {
    let id = req.params.id
    try {
        let task = await Task.findByIdAndDelete(id)
        if (!task) {
            res.status(404).send('No Such Task')
        } else {
            res.status(200).send(task)
        }
    } catch (e) {
        res.status(500).send('Something went wrong')
    }
})

module.exports = router