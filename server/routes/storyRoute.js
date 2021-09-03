const router = require('express').Router();
const fs = require('fs');

const readData = () => JSON.parse(fs.readFileSync('./data/story.json'))

router.get('/', (req, res) => {
   const story = readData();
   res.status(200).json(story)
})

router.get('/:id', (req, res) => {
    const story = readData();
    const storyLineId = req.params.id;
    const storyLineFound = story.find(storyLine => storyLine.id === storyLineId);

    storyLineFound ? res.status(200).json(storyLineFound) : res.status(400).send('THIS NEVER HAPPENED!')
})

module.exports = router