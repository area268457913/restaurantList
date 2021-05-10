const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// 新增
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/new', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  // const name = req.body.name
  // const name_en = req.body.name_en
  // const category = req.body.category
  // const image = req.body.image
  // const location = req.body.location
  // const phone = req.body.phone
  // const google_map = req.body.google_map
  // const rating = req.body.rating
  // const description = req.body.description
  return Todo.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 遊覽特定頁面
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})
//  修改
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  // const name = req.body.name
  // const name_en = req.body.name_en
  // const category = req.body.category
  // const image = req.body.image
  // const location = req.body.location
  // const phone = req.body.phone
  // const google_map = req.body.google_map
  // const rating = req.body.rating
  // const description = req.body.description
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.name_en = name_en
      todo.category = category
      todo.image = image
      todo.location = location
      todo.phone = phone
      todo.google_map = google_map
      todo.rating = rating
      todo.description = description
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})
// 刪除
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router