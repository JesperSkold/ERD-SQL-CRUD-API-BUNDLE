import express from "express";
import { createEmployee, getEmployee, getEmployeeById, getProjectByEmployee } from "../db/employee";

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const result:any = await createEmployee(req.body)
    const employeeId = result.rows[0].employee_id
    res.status(200).json({ employeeId, ...req.body })
  } catch (err:any) {
    err.status = 400
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const result = await getEmployee()
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id)
  try {
    const result = await getEmployeeById(id)
    if (!result.length) {
      const err:any = new Error(`Project with id ${id} not found`)
      err.status = 404
      next(err)
    } else {
      res.status(200).json(result)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id/project', async (req, res, next) => {
  const id = parseInt(req.params.id)
  try {
    const response = await getProjectByEmployee(id)
    if (!response.length) {
      const err:any = new Error(`Employee with id ${id} not found`)
      err.status = 404
      next(err)
    } else {
      res.status(200).json(response)
    }
  } catch (err) {
    next(err)
  }
})

export default router 