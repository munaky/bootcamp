import { Client } from 'pg'

export async function showProject(req, res) {
    function dateDifference(start, end) {
        const date_to_ms = {
            day: 86400000,
            month: 2629746000,
            year: 31556952000,
        }

        let start_date = start != '' ? new Date(start) : Date.now();
        let end_date = end != '' ? new Date(end) : Date.now()

        let years = Math.floor((end_date - start_date) / date_to_ms.year);
        let months = Math.floor((end_date - start_date) / date_to_ms.month);
        let days = Math.floor((end_date - start_date) / date_to_ms.day);

        if (years >= 1) {
            return `${years} tahun`;
        }

        if (months >= 1) {
            return `${months} bulan`;
        }

        return `${days} hari`;
    }

    function formatDate(input) {
        const date = new Date(input);

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'batch61',
        password: 'admin',
        port: 5432,
    });
    
    await client.connect();

    const data = await client.query(`
        SELECT * FROM projects
        `);
    
    res.render('my-project', {
        projects: data.rows.map(project => {
            project.start_date = formatDate(project.start_date);
            project.end_date = formatDate(project.end_date);
            project.duration = dateDifference(project.start_date, project.end_date);

            return project;
        })
    })
}

export async function showProjectDetail(req, res) {
    function dateDifference(start, end) {
        const date_to_ms = {
            day: 86400000,
            month: 2629746000,
            year: 31556952000,
        }

        let start_date = start != '' ? new Date(start) : Date.now();
        let end_date = end != '' ? new Date(end) : Date.now()

        let years = Math.floor((end_date - start_date) / date_to_ms.year);
        let months = Math.floor((end_date - start_date) / date_to_ms.month);
        let days = Math.floor((end_date - start_date) / date_to_ms.day);

        if (years >= 1) {
            return `${years} tahun`;
        }

        if (months >= 1) {
            return `${months} bulan`;
        }

        return `${days} hari`;
    }

    function formatDate(input) {
        const date = new Date(input);

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'batch61',
        password: 'admin',
        port: 5432,
    });
    
    await client.connect();

    const data = await client.query(`
        SELECT * FROM projects WHERE id=${req.params.id}
        `);
    
    res.render('project-detail', {
        project: data.rows.map(project => {
            project.start_date = formatDate(project.start_date);
            project.end_date = formatDate(project.end_date);
            project.duration = dateDifference(project.start_date, project.end_date);

            return project;
        })[0]
    })
}

export async function createOrUpdateProject(req, res) {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'batch61',
        password: 'admin',
        port: 5432,
    });

    await client.connect();

    const image = req.files.image;
    const extension = image.name.split('.').findLast(x => true);
    const image_name = `${Date.now()}.${extension}`;

    image.mv(`src/assets/images/uploads/${image_name}`);

    await client.query(`
    INSERT INTO projects(
	name, image, description, start_date, end_date, techs)
	VALUES (
    '${req.body.name}',
    '/images/uploads/${image_name}', 
    '${req.body.description.replaceAll('\n', '<br>')}', 
    '${req.body.start_date}', 
    '${req.body.end_date}', 
    '${JSON.stringify({
            node_js: req.body.node_js ? true : false,
            next_js: req.body.next_js ? true : false,
            react_js: req.body.react_js ? true : false,
            typescript: req.body.typescript ? true : false,
        })}'
    );
    `)

    res.redirect('/my-project');
}

export async function updateProject(req, res) {
    
}

export async function deleteProject(req, res) {
    const id = req.body.id;

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'batch61',
        password: 'admin',
        port: 5432,
    });
    
    await client.connect();

    await client.query(`DELETE FROM projects WHERE id=${id}`);

    res.redirect('/my-project');
}