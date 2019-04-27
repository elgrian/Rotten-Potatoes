// models/review.js

const mongoose = require('mongoose');

const Reviews = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String
});

module.exports = Review;
module.exports = function (app, Reviews) {

    app.get('/', (req, res) => {
        Reviews.find()
            .then(reviews => {
                res.render('reviews-index', {
                    reviews: reviews
                });
            })
            .catch(err => {
                console.log(err);
            });
    });

}