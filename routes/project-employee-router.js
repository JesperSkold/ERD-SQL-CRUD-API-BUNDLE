import express from "express";
import { addEmployeeToProject } from "../db/project-employee.js";

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const result = await addEmployeeToProject(req.body)
    console.log(result);
    // const employeeId = result.rows[0].employee_id
    // const projectId = result.rows[1].project_id
    res.status(200).json(req.body)
  } catch (err) {
    err.status = 400
    next(err)
  }
})

export default router