import express from "express";
import { addEmployeeToProject, deleteEmployeeFromProject } from "../db/project-employee";

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    await addEmployeeToProject(req.body)
    res.status(200).json(req.body)
  } catch (err:any) {
    err.status = 400
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const result = await deleteEmployeeFromProject(req.query)
    if (result.rowCount) {
      res.status(204).json()
    } else {
      const err:any = new Error(`No rows were affected, the project with id ${req.query.project} and employee with id ${req.query.employee} might not exist`)
      err.status = 404
      next(err)
    }
  } catch (err) {
    next(err)
  }
})

export default router