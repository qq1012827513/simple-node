import http from 'node:http'
import { URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

const __basepath = path.join(import.meta.dirname,'..', '..')

const server = http.createServer((req, res) => {
  let reqData = ''
  const type = req.headers['content-type']
  res.statusCode = 200
  
  const fullUrl = new URL(req.url, 'http://localhost:7777')
  req.on('data', (chunk) => {''
    reqData += chunk
  })
  req.on('error', (err) => {
    res.statusCode = 500
    res.end('Internal Server Error')
  })
  req.on('end', () => {
    try {
      console.log(reqData);
      
      switch (fullUrl.pathname) {
        case '/json':
          const data = JSON.parse(reqData)
          res.setHeader('Content-type', 'application/json')
          res.end(JSON.stringify(data))
          break
        case '/form':
          const param = new URLSearchParams(reqData)
          res.end(param.toString())
          break
        case '/html':
          res.setHeader('Content-type', 'text/html; charset=utf-8')
          const html = fs.readFileSync(__basepath + '/public/index.html')
          res.end(html)
          break
        default:
          res.statusCode = 404
          res.end('404 Not Found')
          break;
      }
    } catch (error) {
      console.error(error);
      res.statusCode = 500
      res.end('Internal Server Error')
    }
  })
})
server.listen(7777)