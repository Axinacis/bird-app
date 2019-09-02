const express = require('express');
const Bird = require('../models/bird');

const router = new express.Router();

router.post('/birds', async (req, res) => {
    try {
        const bird = new Bird(req.body);
        await bird.save();
        res.status(201).send(bird)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.get('/birds', async (req, res) => {
    try {
        const birds = await Bird.find({});
        res.send(birds)
    } catch (e) {
        res.status(500).send(e)
    }
});


router.get('/birds/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const bird = await Bird.findById({_id});
        if(!bird) {
            return res.status(400).send()
        }
        res.send(bird)
    } catch (e) {
        res.status(500).send()
    }
});

router.delete('/birds/:id', async (req, res) => {
    try {
        const bird = await Bird.findByIdAndDelete(req.params.id);
        if(!bird) {
            return res.status(404).send()
        }
        res.send(bird)
    } catch (e) {
        res.status(500).send()
    }
});

router.patch('/birds/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','count','place']
    const isValid = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValid) {
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const bird = await Bird.findById(req.params.id)
        if(!bird) {
            return res.status(404).send()
        }
        updates.forEach((update) => bird[update] = req.body[update])
        await bird.save()
        res.send(bird)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router