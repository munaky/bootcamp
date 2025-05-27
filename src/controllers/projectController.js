import { Client } from 'pg'
import { executeQuery } from '../utils/db.js'
import {formatDate, dateDifference} from '../utils/date.js'

export async function showProject(req, res) {
    const data = await executeQuery('SELECT * FROM projects');
    
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
    const data = await executeQuery(`SELECT * FROM projects WHERE id=${req.params.id}`);
    
    res.render('project-detail', {
        project: data.rows.map(project => {
            project.start_date = formatDate(project.start_date);
            project.end_date = formatDate(project.end_date);
            project.duration = dateDifference(project.start_date, project.end_date);

            return project;
        })[0]
    })
}

export async function updateProjectView(req, res) {
    let data = await executeQuery(`SELECT * FROM projects WHERE id=${req.params.id}`);
    data = data.rows[0];
    data.start_date = new Date(data.start_date).toISOString().split('T')[0];
    data.end_date = new Date(data.end_date).toISOString().split('T')[0];
    
    res.render('update-project', {
        project: data,
    })
}

export async function createOrUpdateProject(req, res) {
    const id = req.body.id;
    const image = req.files?.image ?? false;
    
    if(image){
        const extension = image.name.split('.').findLast(x => true);
        var image_name = `${Date.now()}.${extension}`;
        await image.mv(`src/assets/images/uploads/${image_name}`);
    }

    /* Insert New */
    if(!id){
        await executeQuery(`
            INSERT INTO projects(name, description, start_date, end_date, techs, ${image ? `image` : ''})
            VALUES (
                '${req.body.name}',
                '${req.body.description.replaceAll('\n', '<br>')}', 
                '${req.body.start_date}', 
                '${req.body.end_date}', 
                '${JSON.stringify({
                        node_js: req.body.node_js ? true : false,
                        next_js: req.body.next_js ? true : false,
                        react_js: req.body.react_js ? true : false,
                        typescript: req.body.typescript ? true : false,
                    })}'
                ${image ? `,'/images/uploads/${image_name}'` : ''}
            );
            `);
    }

    /* Update */
    else{
        await executeQuery(`
            UPDATE projects
            SET 
            name='${req.body.name}',
            description='${req.body.description.replaceAll('\n', '<br>')}',
            start_date='${req.body.start_date}',
            end_date='${req.body.end_date}',
            techs='${JSON.stringify({
                        node_js: req.body.node_js ? true : false,
                        next_js: req.body.next_js ? true : false,
                        react_js: req.body.react_js ? true : false,
                        typescript: req.body.typescript ? true : false,
                    })}'
            ${image ? `,image='/images/uploads/${image_name}'` : ''}
            WHERE id=${id};
        `);
    }

    res.redirect('/my-project');
}

export async function deleteProject(req, res) {
    executeQuery(`DELETE FROM projects WHERE id=${req.body.id}`);

    res.redirect('/my-project');
}