const foreCast = require('./utils/forecast');
const geoCode = require('./utils/geocode');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Defined Path for Express Config
const publicFolder = path.join(__dirname, '../publicFolder');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handler bars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(publicFolder));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mars'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ovie'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        body: 'Help page',
        name: 'Okiemute'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });   
    }
    geoCode(req.query.address, (error, {latitude, longitude, location}= {})=> {
        if(error){
            return res.send({
                error
            });
        }
        foreCast(latitude, longitude, (error, data) => {
            if(error){
                return res.send({
                    error
                });
            }
            res.send({
                forecast: data,
                address: req.query.address,
                location
            });
        });
    });
});



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'mars',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        name: 'Okiemute',
        errorMessage: 'Page not found'
    })
})





app.listen(3000, () => {
    console.log('Application has started on port 3000')
})