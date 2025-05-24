import express from 'express'
import { create } from 'express-handlebars';
import handleContact from './src/controllers/contactController.js';
import { showProject, showProjectDetail, createOrUpdateProject, deleteProject } from './src/controllers/projectController.js';
import testController from './src/controllers/test.js';
import fileUpload from 'express-fileupload';


const app = express();
const port = 3000;
const hbs = create({
    extname: '.hbs',
    defaultLayout: false,
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', 'src/views');

app.use(express.static('src/assets'))
app.use(fileUpload());
app.use(express.urlencoded());

app.get('/test', testController);

app.get('/', (req, res) => res.render('home'));
app.get('/home', (req, res) => res.render('home'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/my-project', showProject);
app.get('/project/:id', showProjectDetail);

app.post('/contact', handleContact);
app.post('/create/project', createOrUpdateProject);
app.post('/update/project', createOrUpdateProject);
app.post('/delete/project', deleteProject);

app.listen(port);