import express from 'express'
import { getProjects, createProject, getProjectById, deleteProjectById, updateProjectById } from '../db/project.js'

const router = express.Router()


router.get('/', async (req, res, next) => {
  try {
    const projects = await getProjects()
    res.json(projects)
  }
  catch (err){
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id)
  try{
    const project = await getProjectById(id)
    if (!project.length) {
      const err = new Error(`Project with id ${id} not found`)
      err.status = 404
      next(err)
    } else {
      res.json(project)
    }
  }catch(err){
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const result = await createProject(req.body)
    const projectId = result.rows[0].project_id
    res.status(200).json({ projectId, ...req.body })
  }catch (err) {
    err.status = 400
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id)
  try{
    const response = await deleteProjectById(id)
    if (response.rowCount) {
      res.status(204).json()
    } else {
      const err = new Error(`No rows were affected, the project with id ${id} might not exist`)
      err.status = 404
      next(err)
    }
  }catch(err){
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id)
  try{
    const response = await updateProjectById(id, req.body)
    if (response.rowCount) {
      res.status(200).json(req.body)
    } else {
      const err = new Error(`No rows were affected, the project with id ${id} might not exist`)
      err.status = 404
      next(err)
    }
  }catch(err){
    err.status = 400
    next(err)
  }
})

export default router;

