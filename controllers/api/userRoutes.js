const router = require('express').Router();
const { User } = require('../../models');

// // http://localhost:5001/api/user // TESTING TO SEE IF ROUTE IS NEEDED
// router.post('/', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

//http://localhost:5001/api/user/create // to create a new user
router.post('/create', async (req, res) => {
  try {
      console.log(req.body);
      let userData = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
      });

      req.session.save(() => {

          req.session.user_id = userData.id
          req.session.logged_in = true;
          res.status(200).json({ message: 'Success!' });
          
      });

  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

// http://localhost:5001/api/user/login // to login in a user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// http://localhost:5001/api/user/logout // to logout a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
