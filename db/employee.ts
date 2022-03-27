import { query } from './index'

export const createEmployee = async (reqBody:any) => {
  const response = await query('INSERT INTO employee (dep_num, employee_name) VALUES ($1, $2) RETURNING employee_id', [reqBody.dep_num, reqBody.employee_name])
  return response
}

export const getEmployee = async () => {
  const response = await query('SELECT * FROM employee')
  return response.rows
}
export const getEmployeeById = async (id:any) => {
  const response = await query('SELECT * FROM employee WHERE employee_id = $1', [id])
  return response.rows
}

export const getProjectByEmployee = async (id:any) => {
  const response = await query('SELECT * FROM employee_project WHERE employee_id = $1', [id])
  return response.rows
}