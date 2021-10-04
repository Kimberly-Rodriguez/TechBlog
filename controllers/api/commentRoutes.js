const router = require('express').Router();
const { Comment } = require('../../models')

//POST to create a new comment all //
router.post('/', async (req, res) => {
  try {
    console.log(req.session.user_id);
    console.log(req.body);
    const newComment = await Comment.create(
      {
        comment: req.body.comment,
        date_created: req.body.date_created,
        user_id: req.session.user_id,
        post_id: req.body.post_id
      }
    )

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//PUT Route to update Comment // complete
router.put ('/:id', async (req, res) => {
  try {
    const dbprojectData = await Comment.update(req.body,
      {
        where: {id: req.params.id},
      }
    )

    res.status(200).json(dbprojectData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;