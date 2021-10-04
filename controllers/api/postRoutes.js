const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// http://localhost:5001/api/post // to create a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title:req.body.post_title,
      contents:req.body.contents,
      user_id: req.session.user_id,
      date_created: req.body.date_created,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// http://localhost:5001/api/post/1 (the '1' is interchangeable) // This action method is the Controller. It accepts input and sends data to the Model and the View.
router.put('/:id', async (req, res) => {
  
  try {
    const post = await Post.update(
      {
        title: req.body.title,
        contents: req.body.contents
        // comment: req.body.comment,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // The updated data (post) is then sent back to handler that dispatched the fetch request.
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// http://localhost:5001/api/post/1 (the '1' is interchangeable) // delete post all together
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
