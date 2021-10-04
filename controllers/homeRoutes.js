const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// http://localhost:5001 // to show all post
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      user_id: req.session.user_id,
      logged_in: req.session.logged_in 
    });
  } catch (err) { 
    res.status(500).json(err);
  }
});

// http://localhost:5001/dashboard // Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log(user)

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:5001/post/edit/:id // Show user post for edits/updates
router.get('/post/edit/:id', async (req, res) => {
  try{

    if (!req.session.logged_in) {
      res.redirect('/');
      return;
    }

    const postData = await Post.findByPk(req.params.id, {
      include: {model: User}
    });
   
    const post = postData.get({ plain: true});

    res.render('edit', {
      post,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    })

  } catch (err) {
    res.status(500).json(err);
  }
})

//http://localhost:5001/dashboard/:id // Show all users posts & comments 
router.get('/dashboard/:id', async (req, res) => {
  try {

    if (!req.session.logged_in) {
      res.redirect('/');
      return;
    }

    const userData = await User.findByPk(req.params.id, {
      include: [{model: Post}, {
        model: Comment, 
        include: [{model: Post,
          include: {model: User}
        }]  
      }]    
    });
    const user = userData.get({ plain: true});
    
    res.render('dashboard',
      {
      user,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
}); 

//http://localhost:5001/post/:id (the id # changes dependingon the post request)  
router.get('/post/:id', async (req, res) => {
  try {

    if (!req.session.logged_in) {
      res.redirect('/');
      return;
    }
    const postData = await Post.findByPk(req.params.id, {
      include: [{
        model: Comment, 
        include: [{model: User}]  
      }, {model: User}]    
    });

    const post = postData.get({ plain: true});
    
    res.render('post',
      {
      post,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:5001/login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
