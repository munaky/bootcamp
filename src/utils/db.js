import { Client } from 'pg'

export async function executeQuery(query) {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'bootcamp',
        password: 'admin',
        port: 5432,
    });

    await client.connect();

    const data = await client.query(`${query}`);

    return data;
}