import { query } from './index.js'

export const createEmployee = async (reqBody) => {
  const response = await query('INSERT INTO employee (dep_num, employee_name) VALUES ($1, $2) RETURNING employee_id', [reqBody.dep_num, reqBody.employee_name])
  return response
}
