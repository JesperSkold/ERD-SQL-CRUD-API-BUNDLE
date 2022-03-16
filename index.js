const express = require('express')
const app = express()
const db = require('./queries')
const port = 3000

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API.'  })
})

app.get('/employee', db.getUsers)
app.get('/project', db.getProjects)
app.get('/project/:id', db.getProjectById)
app.get('/employee/:id', db.getUserById)
app.post('/project', db.createProject)
app.put('/project/:id', db.updateProject)
app.delete('/employee/:id', db.deleteUser)
app.delete('/project/:id', db.deleteProject)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})