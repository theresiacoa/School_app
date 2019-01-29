const express = require('express');
const app = express();
const studentRoutes = require('./routes/student')
const teacherRoutes = require('./routes/teacher')
const subjectRoutes = require('./routes/subject')
const userRoutes = require('./routes/user')

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', (req, res) => {
  res.render(`home.ejs`);
})

app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/subjects', subjectRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => {
  console.log(`listening to PORT ---- 3000`);
})