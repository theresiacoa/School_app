const router = require('express').Router();
const hash = require('../helpers/password')
const Model = require('../models');

router.get('/', (req, res) => {
  res.redirect('/register');
})

router.get('/register', (req, res) => {
  res.render('login_page.ejs', { purpose: `register` })
})

router.get('/login', (req, res) => {
  res.render('login_page.ejs', { purpose: `login` })
})


//CRYPTO ------------------------------------------------------------------
router.post('/register', (req, res) => {
  let password = `hacktiv8` + req.body.name;
  let secret = hash(password);
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: secret.encrypt,
    secret: secret.key,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  Model.User.create(data)
    .then(() => {
      res.render(`login_page.ejs`, {purpose: `login`});
    })
    .catch(err => {
      res.send(err)
    }) 
})

// router.post('/login', (req, res) => {
//   Model.User.findOne({
//     where: { email: req.body.email }
//   })
//     .then((data) => {
//       if (!data) {
//         throw `You need to register first`
//       } else {
//         let inputPassword = hash(req.body.password, data.secret);
//         if (inputPassword.encrypt === data.password) {
//           res.send('<h1>You have successfully login</h1>')
//         }
//       }
//     })
//     .catch(err => {
//       res.send(err);
//     })
// })

//BCRYPT ---------------------------------------------------------------
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/register', (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  Model.User.create(data)
    .then(() => {
      res.render(`login_page.ejs`, { purpose: `login` });
    })
    .catch(err => {
      res.send(err)
    })
})

router.post('/login', (req, res) => {
  Model.User.findOne({
    where: { email: req.body.email }
  })
    .then((data) => {
      if (!data) {
        throw `You need to register first`
      } else {
        return new Promise((resolve, reject) => {
          bcrypt.compare(req.body.password, data.password)
            .then(function (res) {
              res ? resolve(true) :
              resolve(false)
            });
        })
      }
    })
    .then((value) => {
      (value) ? res.redirect(`/`) : res.send(`wrong password`);
    })
    .catch(err => {
      res.send(err);
    })
})





module.exports = router;