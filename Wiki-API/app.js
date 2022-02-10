const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engire', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const url = "mongodb://localhost:27017/wikiDB";
mongoose.connect(url, { useNewUrlParser: true });

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model('Article', articleSchema);


///////// Request Targetting All Articles /////////
app.route('/articles')
    .get(function (req, res) {
        Article.find({}, function (err, foudArticles) {
            if (!err) {
                res.send(foudArticles);
            } else {
                res.send(err)
            }
        })
    })

    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })

        newArticle.save(function (err) {
            if (!err) {
                res.send('Successfully added a new article.')
            } else {
                res.send(err)
            }
        });
    })

    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send('Successfully deleted all articles.')
            } else {
                res.send(err);
            }
        })
    });

///////// Request Targetting A Specific Article /////////

app.route("/articles/:articleTitle")

    .get(function (req, res) {
        Article.findOne({ title: req.params.articleTitle }, function (err, foundArticle) {
            if (foundArticle) {
                res.send(foundArticle)
            } else {
                res.send("No article matching that title was found")
            }
        })
    })

    .put(function (req, res) {
        Article.updateOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },

            function (err, results) {
                if (!err) {
                    res.send("Successfully updated article.")
                }
            }
        )
    })

    .patch(function (req, res) {
        Article.updateOne(
            { title: req.params.articleTitle },
            { $set: req.body },
            function (err, results) {
                if (!err) {
                    res.send("Successfully updated article.")
                } else {
                    res.send(err)
                }
            }
        )
    })

    .delete(function (req, res) {
        Article.deleteOne(
            { title: req.params.articleTitle },
            function (err, results) {
                if (!err) {
                    res.send("Successfully deleted article.")
                } else {
                    res.send(err)
                }
            }
        )
    })

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})