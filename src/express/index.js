import express from 'express'
import user from './router/user.js'
import path from 'path'

const app = new express()
app.set('view engine', 'ejs')
const __dirname = import.meta.dirname
app.set('views', path.join(__dirname, 'views'))

app.use('/user', user)
// app.use('/static', express.static(path.join(__dirname, 'static')))
app.get('/healthCheck', (req, res) => {
  throw new Error('error')
  res.send('ok')
})
app.get('/', (req, res) => {
  res.render('index', {name: 'xx', age: 28})
})
app.use((req, res, next) => {
  res.status(404).send('404')
})
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(3000)