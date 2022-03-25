import {query} from './index.js'

export const getProjects = async () => {
  const response = await query('SELECT * FROM project')
  return response.rows
}

export const getProjectById = async (id) => {
  const response = await query('SELECT * from project WHERE project_id = $1', [id] )
  return response.rows
}

export const createProject = async (reqBody) => {
  const response = await query('INSERT INTO project (project_name, project_leader, project_budget) VALUES ($1, $2, $3) RETURNING project_id', [reqBody.project_name, reqBody.project_leader, reqBody.project_budget])
  return response
}

export const deleteProjectById = async (id) => {
    const response = await query('DELETE FROM project WHERE project_id = $1', [id])
    return response
}

export const updateProjectById = async (id, reqBody) => {
  const response = await query('UPDATE project SET project_name = $1, project_leader = $2, project_budget = $3 WHERE project_id = $4',
  [reqBody.project_name, reqBody.project_leader, reqBody.project_budget, id])
  return response
}

export const getEmployeesByProject = async (id) => {
  const response = await query('SELECT * FROM employee_project WHERE project_id = $1', [id])
  return response.rows
}
