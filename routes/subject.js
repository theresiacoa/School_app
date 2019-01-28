const express = require('express')
const router = express.Router();
const Model = require('../models');

router.get('/', (req, res) => {
  Model.Subject.findAll()
    .then((subj) => {
      let allData = subj.map(data => {
        return new Promise((resolve, reject) => {
          data.getTeachers()
            .then((allTeachers) => {
              data.dataValues.teachers = allTeachers
              resolve(data)
            })
            .catch(err => {
              reject(err)
            })
        })
      })
      return Promise.all(allData);
    })
    .then((data) => {
      res.render('subjects_data.ejs', { data: data });
    })
    .catch((err) => {
      res.send(err);
    })
})

router.get('/add', (req, res) => {
  res.render('subjects_form.ejs')
})

router.post('/add', (req, res) => {
  let data = {
    subjectName: req.body.subjectName,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  Model.Subject.create(data)
    .then(() => {
      res.redirect('/subjects')
    })
    .catch((err) => {
      res.send(err);
    })
})

router.get('/edit/:id', (req, res) => {
  Model.Subject.findByPk(req.params.id)
    .then((data) => {
      res.render('subjects_update_form.ejs', { data })
    })
    .catch((err) => {
      res.send(err);
    })
})

router.post('/edit/:id', (req, res) => {
  let data = {
    subjectName: req.body.subjectName,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  Model.Subject.update(data, {
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.redirect('/subjects')
    })
    .catch((err) => {
      res.send(err);
    })

})

router.get('/delete/:id', (req, res) => {
  Model.Subject.destroy({
    where: { id: req.params.id }
  })
    .then(() => {
      res.redirect('/subjects')
    })
    .catch((err) => {
      res.send(err);
    })
})

router.get('/:id/enrolled-students', (req, res) => {

  Model.Subject.findByPk(req.params.id, {
    include: Model.Student
  })
    .then((data) => {
      res.send(data);
    })
    .then(students => {
      console.log(students)
      // res.send(students)
      // res.render('subjects_studentsScore.ejs', {data: students});
    })
    .catch(err => {
      res.send(err);
    })
})



module.exports = router;