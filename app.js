var exphbs = require('express-handlebars');
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const reviews = require('./controllers/reviews')(app);
// override with POSt having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', {
    useNewUrlParser: true
});
module.exports = app;
// const Reviews = mongoose.model('Review', {
//     title: String,
//     description: String,
//     movieTitle: String
// });



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


//SHOW
app.get('/reviews/:id', (req, res) => {
    Reviews.findById(req.params.id).then((review) => {
        console.log(review)
        res.redirect(`/reviews/${review._id}`) // Redirect to reviews /:id
    }).catch((err) => {
        console.log(err.message);
    })
})

// EDIT
app.get('/reviews.id:/edit', (req, res) => {
    Reviews.findById(req.params.id, function (err, review) {
        res.render('reviews-edit', {
            review: review
        });
    })
})

//UPDATE
app.put('/reviews/:id', (req, res) => {
    Reviews.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
})

//DELETE
app.delete('/reviews/:id', function (req, res) {
    console.log("DELETE review")
    Reviews.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
    }).catch(err) => {
        console.log(err.message);
    })
})