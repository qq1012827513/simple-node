import express from 'express'

const router = express.Router()
router.get('/:id', (req, res,next) => {
  const {id} = req.params
  const {name} = req.query
  res.send({
    name: name,
    age: id
  })
})

export default router