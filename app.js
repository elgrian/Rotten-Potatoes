var exphbs = require('express-handlebars');
const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', {
    useNewUrlParser: true
});
const Reviews = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String
});



//Initialize handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// ROUTES


// app.get('/', (req, res) => {
//     res.render('home', {
//         msg: 'Handlebars are cool!'
//     });
// })

// INDEX
app.get('/', (req, res) => {
    res.render('reviews-index', {
            reviews: reviews
        })
        .catch(err => {
            console.log(err);
        })
})


// END OF ROUTES

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})


//Mock array of objects
let reviews = [{
        title: 'Great Review',
        movieTitle: 'Batman II'
    },
    {
        title: 'Awesome Movie',
        movieTitle: 'Titanic'
    }
]

Reviews.find()
    .then(review => {
        // Code in here is executed when the promise resolves      
    })
    .catch(err => {

    });

//NEW
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})