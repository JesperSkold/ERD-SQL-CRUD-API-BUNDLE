import pg from 'pg'
const pool = new pg.Pool()
export const query = (text?:any, params?:any[]) => pool.query(text, params)

