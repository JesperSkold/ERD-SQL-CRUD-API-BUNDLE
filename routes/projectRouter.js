import express from 'express'
import { getProjects, createProject, getProjectById, deleteProjectById, updateProjectById } from '../db/project.js'

const router = express.Router()


router.get('/', async (req, res) => {
  const projects = await getProjects()
  res.json(projects)
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const project = await getProjectById(id)
  res.json(project)
})

router.post('/', async (req, res) => {
  await createProject(req.body)
  res.json(`Successfully added ${req.body.project_name}`)
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const response = await deleteProjectById(id)
  res.json(response)
})

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const response = await updateProjectById(id, req.body)
  res.json(response)
})

export default router;

