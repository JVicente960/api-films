const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()

app.use(cors());

app.use(express.json())

const port = 3000

const Film = mongoose.model('Film', { 
    title: String,
    description: String,
    trailer_url: String,
 });

app.get('/', async (req, res) => {
    try {
        const films = await Film.find()
        return res.send(films)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
})
app.get('/:id', async (req, res) => {
  try {
      const film = await Film.findById(req.params.id)
      return res.send(film)
  } catch (error) {
      console.error(error)
      return res.status(500).send('Internal Server Error')
  }
})

app.delete("/:id", async (req, res) => {
    try {
        const film = await Film.findByIdAndDelete(req.params.id)
        if (!film) {
            return res.status(404).send('Film not found')
        }
        console.log(film)
        
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
})

app.put("/:id", async (req, res) => {
    try {
        const film = await Film.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            trailer_url: req.body.trailer_url
        }, {
            new: true
        })
        if (!film) {
            return res.status(404).send('Film not found')
        }
        return res.send(film)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
})

app.post('/', async (req, res) => {
    try {
        const film = new Film({
            title: req.body.title,
            description: req.body.description,
            trailer_url: req.body.trailer_url
        })
        await film.save()
        res.send(film)
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    try {
        mongoose.connect('mongodb://localhost:27017/first_api');
    } catch (error) {
        console.error(error)
    }
})


