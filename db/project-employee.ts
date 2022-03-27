import {query} from './index'

export const addEmployeeToProject = async (reqBody:any) => {
  const response = await query('INSERT INTO employee_project (project_id, employee_id, hourly_rate) VALUES ($1, $2, $3)', [reqBody.project_id, reqBody.employee_id, reqBody.hourly_rate])
  return response
}

export const deleteEmployeeFromProject = async (params:any) => {
  const response = await query('DELETE FROM employee_project WHERE employee_id = $1 AND project_id = $2', [params.employee, params.project])
  return response
}