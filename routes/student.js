const express = require('express')
const router = express.Router();
const Model = require('../models');


router.get('/', (req, res) => {
  Model.Student.findAll()
    .then((data) => {
      // res.send(data)
      res.render('students_data.ejs', { data: data })
    })
    .catch((err) => {
      res.send(err);
    })
})

router.get('/add', (req, res) => {
  res.render('students_form.ejs')
})

router.post('/add', (req, res) => {
  let data = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  Model.Student.create(data)
    .then(() => {
      res.redirect('/students')
    })
    .catch((err) => {
      res.send(err);
    })
})

router.get('/edit/:id', (req, res) => {
  Model.Student.findByPk(req.params.id)
    .then((data) => {
      if (!data) {
        res.send(`<h1>There's no student with that ID: ${req.params.id}</h1>`)
      }
      res.render('students_update_form.ejs', { data })
    })
    .catch((err) => {
      res.send(err);
    })
})

router.post('/edit/:id', (req, res) => {
  req.body.id = req.params.id;
  Model.Student.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.redirect('/students')
    })
    .catch((err) => {
      res.send(err);
    })

})

router.get('/delete/:id', (req, res) => {
  Model.Student.destroy({
    where: { id: req.params.id }
  })
    .then(() => {
      res.redirect('/students')
    })
    .catch((err) => {
      res.send(err);
    })
})

router.get('/:id/addSubject', (req, res) => {
  let data = '';
  Model.Student.findByPk(req.params.id)
    .then((student) => {
      data = student
      return Model.Subject.findAll()
    })
    .then((subj) => {
      res.render('add_subject.ejs', { data: data, subj: subj })
    })  
    .catch(err => {
      res.send(err);
    })
})

router.post('/:id/addSubject', (req, res) => {
  Model.Subject.findOne({
    where: {subjectName: req.body.subject}
  })
    .then((data) => {
      let newData = {
        SubjectId: data.id,
        StudentId: Number(req.params.id),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      return Model.StudentSubject.create(newData)
    })
    .then(() => {
      res.redirect('/students')
    })
    .catch((err) => {
      res.send(err)
    })
})


module.exports = router;