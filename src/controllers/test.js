import { Client } from 'pg'

export default async function testController(req, res) {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'batch61',
        password: 'admin',
        port: 5432, // Default PostgreSQL port
    });

    await client.connect()

    const result = await client.query(`SELECT * FROM projects`)
    console.log(result.rows)
    res.send(result.rows)
}