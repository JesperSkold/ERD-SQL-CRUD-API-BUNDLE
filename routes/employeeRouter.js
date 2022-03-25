import express from "express";
import { createEmployee } from "../db/employee.js";

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const result = await createEmployee(req.body)
    const employeeId = result.rows[0].employee_id
    res.status(200).json({ employeeId, ...req.body })
  } catch (err) {
    err.status = 400
    next(err)
  }
})

export default router 