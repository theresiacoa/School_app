const express = require('express')
const router = express.Router();
const Model = require('../models');

router.get('/', (req, res) => {
  Model.Teacher.findAll({ include: Model.Subject })
    .then((data) => {
      res.render('teachers_data.ejs', { data: data })
    })
    .catch((err) => {
      res.send(err);
    })
})

router.get('/add', (req, res) => {
  Model.Subject.findAll()
    .then((subj) => {
      res.render('teachers_form.ejs', { subj })
    })
    .catch(err => {
      res.send(err);
    })
})

router.post('/add', (req, res) => {
  Model.Subject.findOne({
    where: { subjectName: req.body.subject }
  })
    .then((subj) => {
      let data = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        SubjectId: subj.dataValues.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      return Model.Teacher.create(data);
    })
    .then(() => {
      res.redirect('/teachers')
    })
    .catch((err) => {
      res.send(err);
    })
})

router.get('/edit/:id', (req, res) => {
  let teacher = '';
  Model.Teacher.findByPk(req.params.id)
    .then((data) => {
      teacher = data;
      return Model.Subject.findAll()
    })
    .then((subj) => {
      res.render('teachers_update_form.ejs', { data: teacher, subj: subj })
    })
    .catch((err) => {
      res.send(err);
    })
})

router.post('/edit/:id', (req, res) => {

  Model.Subject.findOne({
    where: {subjectName: req.body.subject}
  })
    .then((subj) => {
      let data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        SubjectId: subj.dataValues.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: req.params.id
      }
      return Model.Teacher.update(data, {where: {id: req.params.id}});
    })
    .then(() => {
      res.redirect('/teachers')
    })
    .catch((err) => {
      res.send(err);
    })

})

router.get('/delete/:id', (req, res) => {
  Model.Teacher.destroy({
    where: { id: req.params.id }
  })
    .then(() => {
      res.redirect('/teachers')
    })
    .catch((err) => {
      res.send(err);
    })
})



module.exports = router;