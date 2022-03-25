import {query} from './index.js'

export const addEmployeeToProject = async (reqBody) => {
  // const response = await query('UPDATE employee_project SET project_id = $1, employee_id = $2, hourly_rate = $3',
  // [reqBody.project_id, reqBody.employee_id, reqBody.hourly_rate])
  const response = await query('INSERT INTO employee_project (project_id, employee_id, hourly_rate) VALUES ($1, $2, $3)', [reqBody.project_id, reqBody.employee_id, reqBody.hourly_rate])
  return response
  // return response
}