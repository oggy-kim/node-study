const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Oggy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Oggy'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'So What?'
    })

})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if(!address) {
        return res.send({
            error: 'You must provide an address!!'
        })
    }

    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})






app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('errorpage', {
        title: '404',
        errorMsg: 'Help article not found',
        name: 'Oggy'

    })
})

app.get('*', (req, res) => {
    res.render('errorpage', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Oggy'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})