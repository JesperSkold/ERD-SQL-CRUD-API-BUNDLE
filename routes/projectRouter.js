import express from 'express'
import { getProjects, createProject, getProjectById, deleteProjectById, updateProjectById } from '../db/project.js'

const router = express.Router()


router.get('/', async (req, res) => {
  try {
    const projects = await getProjects()
    res.json(projects)
  }
  catch (err){
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const project = await getProjectById(id)
  if (!project.length) {
    res.status(404).json({ error: `Project with id ${id} not found` })
  } else {
    res.json(project)
  }
})

router.post('/', async (req, res) => {
  try {
    const result = await createProject(req.body)
    const projectId = result.rows[0].project_id
    res.status(200).json({ projectId, ...req.body })
  }
  catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const response = await deleteProjectById(id)
  if (response.rowCount) {
    res.status(204).json()
  } else {
    res.status(404).send("No rows were affected")
  }
})

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const response = await updateProjectById(id, req.body)
  if (response.rowCount) {
    res.status(200).json(req.body)
  } else {
    res.status(404).send("No rows were affected")
  }
})

export default router;

