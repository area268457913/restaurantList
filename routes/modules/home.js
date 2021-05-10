const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) //根據 _id 升冪排序
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))

})

//搜尋功能
router.get('/search', (req, res) => {

  const keyword = req.query.keyword

  return Todo.find()
    .lean()
    .then(todos => todos.filter(todos => {
      return todos.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || todos.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    }))

    .then((todos) => res.render('index', { todos, keyword }))
    .catch(error => console.log(error))

})

module.exports = router