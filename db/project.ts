import {query} from './index'

export const getProjects = async () => {
  const response = await query('SELECT * FROM project')
  return response.rows
}

export const getProjectById = async (id:number) => {
  const response = await query('SELECT * from project WHERE project_id = $1', [id] )
  return response.rows
}

export const createProject = async (reqBody:any) => {
  const response = await query('INSERT INTO project (project_name, project_leader, project_budget) VALUES ($1, $2, $3) RETURNING project_id', [reqBody.project_name, reqBody.project_leader, reqBody.project_budget])
  return response
}

export const deleteProjectById = async (id:number) => {
    const response = await query('DELETE FROM project WHERE project_id = $1', [id])
    return response
}

export const updateProjectById = async (id:number, reqBody:any) => {
  const response = await query('UPDATE project SET project_name = $1, project_leader = $2, project_budget = $3 WHERE project_id = $4',
  [reqBody.project_name, reqBody.project_leader, reqBody.project_budget, id])
  return response
}

export const getEmployeesByProject = async (id:number) => {
  const response = await query('SELECT * FROM employee_project WHERE project_id = $1', [id])
  return response.rows
}

export const patchProjectById = async (id:any, reqBody:any) => {
  const response = await query("UPDATE project SET project_name = COALESCE (NULLIF($1, ''), project_name), project_leader = COALESCE(NULLIF($2, ''), project_leader), project_budget = COALESCE (NULLIF($3, -1), project_budget) WHERE project_id = $4", [reqBody.project_name, reqBody.project_leader, reqBody.project_budget, id])
  return response
}