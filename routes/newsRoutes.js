const express = require('express');
const router = express.Router();
const NewsPost = require('../models/news');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
    try {
        const { limit, offset, search, sort, order } = req.query;

        let queryOptions = {
            limit: limit ? parseInt(limit) : 10,
            offset: offset ? parseInt(offset) : 0,
            where: {},
            order: [[sort || 'createdAt', order || 'DESC']]
        };

        if (search) {
            queryOptions.where = {
                [Op.or]: [
                    { title: { [Op.like]: `%${search}%` } },
                    { content: { [Op.like]: `%${search}%` } }
                ]
            };
        }

        const news = await NewsPost.findAll(queryOptions);
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const post = await NewsPost.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });
    res.json(post);
});

router.post('/', async (req, res) => {
    try {
        const newPost = await NewsPost.create(req.body);
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ error: "Validation error: " + err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await NewsPost.findByPk(req.params.id);
        if (post) {
            await post.update(req.body);
            res.json(post);
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const result = await NewsPost.destroy({ where: { id: req.params.id } });
    if (result) res.json({ message: "Deleted" });
    else res.status(404).json({ message: "Not found" });
});

module.exports = router;