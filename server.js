import dotenv from 'dotenv'
import express from 'express'
import projectRouter from './routes/projectRouter.js'
import employeeRouter from './routes/employeeRouter.js'
import projectEmployeeRouter from './routes/project-employee-router.js'


dotenv.config({ path: `config/.env` });

const port = 3000
const app = express()


app.use(express.json())
app.use('/project', projectRouter)
app.use('/employee', employeeRouter)
app.use('/project-employee', projectEmployeeRouter)

app.use( (err, req, res, next) => {
  console.error(err.message)
  res.status(err.status || 500)
  res.json({ 
    error:{ 
    status: err.status || 500, 
    message: err.message }})
});
app.use( (req, res) => {
  res.status(404).send("404 not found")
})
app.listen(port, () => {
  console.log(`listening on port ${port}`);
})