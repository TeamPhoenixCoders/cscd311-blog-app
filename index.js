const express = require("express");
const bcrypt = require('bcryptjs');
const app = express();

const dbManager = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users/:id', (req, res) => {
    dbManager.models.User.findById(req.params.id, (err, user) => {
        if (err) res.status(500).send(err);

        res.json(user);

    })
});

app.get("/users", (req, res) => {
    dbManager.models.User.find((err, users) => {
        if (err) res.status(500).send(err);

        res.json(users);
    });
});

app.post('/users', async (req, res) => {
    try {
        console.log(req.body);
        req.body.password = bcrypt.hashSync(req.body.password);
        const user = new dbManager.models.User(req.body);

        await user.save();

        console.log(user);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.delete('/users/:id', (req, res) => {
    dbManager.models.User.findByIdAndDelete(req.params.id, (err, user) => {
        if (err) res.send(err);

        res.json(user);
    });

});

app.post('/users/login', (req, res) => {

    const user = dbManager.models.User.findOne({ email: req.body.email }, (err, user) => {
        if (err) res.send(err);

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) res.send(err);

            res.json(user);
        });
    });
});

app.get('/categories/:id', (req, res) => {
    dbManager.models.Category.findById(req.params.id, (err, category) => {
        if (err) res.status(500).send(err);

        res.json(category);
    })
});

app.get('/categories/:id/posts', (req, res) => {
    dbManager.models.Post.find({ 'category': req.params.id }, (err, posts) => {
        if (err) res.status(500).send(err);

        res.json(posts);
    });
});

app.get('/categories', (req, res) => {
    dbManager.models.Category.find((err, categories) => {
        if (err) res.status(500).send(err);

        res.json(categories);

    })
});

app.post('/categories', async (req, res) => {
    try {
        const category = new dbManager.models.Category(req.body);

        await category.save();

        res.json(category);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.delete('/categories/:id', (req, res) => {
    
})

app.get('/posts/:id', (req, res) => {
    dbManager.models.Post.findById(req.params.id, (err, post) => {
        if (err) res.status(500).send(err);

        res.json(post);
    });
});

app.get('/posts/:id/comments', (req, res) => {
    dbManager.models.Comment.find({ 'post': req.params.id }, (err, comments) => {
        if (err) return res.send(err);

        res.json(comments);
    });
});

app.get('/posts', (req, res) => {
    dbManager.models.Post.find((err, posts) => {
        if (err) res.status(500).send(err);

        res.json(posts);
    });
});

app.post('/posts', async (req, res) => {
    try {
        const post = new dbManager.models.Post(req.body);

        await post.save();

        res.json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.delete('/posts/:id', (req, res) => {
    dbManager.models.Post.findByIdAndDelete(req.params.id, (err, post) => {
        res.send(data);
    });
})


dbManager.connectDb().then(async () => {
    app.listen(3000, () => console.log("Connection successful!"));
})