import { query } from './index.js'

export const createEmployee = async (reqBody) => {
  const response = await query('INSERT INTO employee (dep_num, employee_name) VALUES ($1, $2) RETURNING employee_id', [reqBody.dep_num, reqBody.employee_name])
  return response
}

export const getEmployee = async (id) => {
  const response = await query('SELECT * FROM employee')
  return response.rows
}
export const getEmployeeById = async (id) => {
  const response = await query('SELECT * FROM employee WHERE employee_id = $1', [id])
  return response.rows
}