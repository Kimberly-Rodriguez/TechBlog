const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// http://localhost:5001/api/post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      post_title:req.body.post_title,
      contents:req.body.contents,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// According to MVC, what is the role of this action method?
// This action method is the Controller. It accepts input and sends data to the Model and the View.
router.put('/:id', async (req, res) => {
  // Where is this action method sending the data from the body of the fetch request? Why?
  // It is sending the data to the Model so that one dish can be updated with new data in the database.
  try {
    const post = await Post.update(
      {
        post_title: req.body.post_title,
        contents: req.body.contents
        // comment: req.body.comment,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // If the database is updated successfully, what happens to the updated data below?
    // The updated data (dish) is then sent back to handler that dispatched the fetch request.
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});


// http://localhost:5001/api/post/1 (the '1' is interchangeable)
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
