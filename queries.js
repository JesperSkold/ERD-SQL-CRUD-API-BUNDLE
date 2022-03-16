const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'changeme',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM employee', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  
  pool.query('SELECT * FROM employee WHERE employee_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProjects = (request, response) => {
  pool.query('SELECT * FROM project', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProjectById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM project WHERE project_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createProject = (request, response) => {
  const { project_name, project_leader, project_budget } = request.body

  pool.query('INSERT INTO project (project_name, project_leader, project_budget) VALUES ($1, $2, $3)', [project_name, project_leader, project_budget], (error, results) => { 
    if (error) {
      throw error
    }
    response.status(201).send(`Project added successfuly`)

  })
}

const updateProject = (request, response) => {
  const id = parseInt(request.params.id)
  const { project_name, project_leader, project_budget, } = request.body

  pool.query(
    'UPDATE project SET project_name = $1, project_leader = $2, project_budget = $3 WHERE project_id = $4',
    [project_name, project_leader, project_budget, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Project modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM employee WHERE employee_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const deleteProject = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM project WHERE project_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Project deleted with ID: ${id}`)
  })
}

module.exports = {
  getProjects,
  getProjectById,
  getUsers,
  getUserById,
  createProject,
  updateProject,
  deleteUser,
  deleteProject
}

/*

o GET /project Listar alla projekt DONE
o GET /project/:id Hämtar ett specifikt projekt DONE
o POST /project Lägger in ett nytt project  DONE
o DELETE /project/:id Tar bort ett projekt DONE
o PUT /project/:id Uppdaterar ett befintligt projekt DONE

*/