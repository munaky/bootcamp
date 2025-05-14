let projects = [];
let date_to_ms = {
    day: 86400000,
    month: 2629746000,
    year: 31556952000,
}

function dateDifference(start, end) {
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

function resetInput() {
    document.getElementById('name').value = '';
    document.getElementById('start_date').value = '';
    document.getElementById('end_date').value = '';
    document.getElementById('description').value = '';
    document.getElementById('node_js').checked = false;
    document.getElementById('next_js').checked = false;
    document.getElementById('react_js').checked = false;
    document.getElementById('typescript').checked = false;
    document.getElementById('image').value = '';
}

function dataToHTML(data){
    return `
    <div class="col-4 py-3 px-3">
        <div class="card border-0 p-2 w-100 shadow">
            <div class="ratio ratio-4x3">
                <img src="${data.image}" alt="Gambar Project" class="card-img-top w-100 h-100 rounded object-fit-cover w-100">
            </div>
            <div class="pt-3">
                <p class="mb-0 lh-1 fw-semibold text-truncate">${data.name}</p>
                <p class="project-text text-secondary">durasi : ${dateDifference(data.start_date, data.end_date)}</p>
                <p class="project-text project-description overflow-auto">${data.description}</p>
                <div class="d-flex gap-3 mb-4">
                    ${data.techs.node_js ? `
                    <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 32 32">
                        <title>file_type_node</title>
                        <path
                            d="M16,30a2.151,2.151,0,0,1-1.076-.288L11.5,27.685c-.511-.286-.262-.387-.093-.446a6.828,6.828,0,0,0,1.549-.7.263.263,0,0,1,.255.019l2.631,1.563a.34.34,0,0,0,.318,0l10.26-5.922a.323.323,0,0,0,.157-.278V10.075a.331.331,0,0,0-.159-.283L16.158,3.875a.323.323,0,0,0-.317,0L5.587,9.794a.33.33,0,0,0-.162.281V21.916a.315.315,0,0,0,.161.274L8.4,23.814c1.525.762,2.459-.136,2.459-1.038V11.085a.3.3,0,0,1,.3-.3h1.3a.3.3,0,0,1,.3.3V22.777c0,2.035-1.108,3.2-3.038,3.2a4.389,4.389,0,0,1-2.363-.642L4.661,23.788a2.166,2.166,0,0,1-1.076-1.872V10.075A2.162,2.162,0,0,1,4.661,8.2L14.922,2.276a2.246,2.246,0,0,1,2.156,0L27.338,8.2a2.165,2.165,0,0,1,1.077,1.87V21.916a2.171,2.171,0,0,1-1.077,1.872l-10.26,5.924A2.152,2.152,0,0,1,16,30Z"
                            style="fill:#83cd29" />
                        <path
                            d="M14.054,17.953a.3.3,0,0,1,.3-.3h1.327a.3.3,0,0,1,.295.251c.2,1.351.8,2.032,3.513,2.032,2.161,0,3.082-.489,3.082-1.636,0-.661-.261-1.152-3.62-1.481-2.808-.278-4.544-.9-4.544-3.144,0-2.07,1.745-3.305,4.67-3.305,3.287,0,4.914,1.141,5.12,3.589a.3.3,0,0,1-.295.323H22.566a.3.3,0,0,1-.288-.232c-.319-1.421-1.1-1.875-3.2-1.875-2.36,0-2.634.822-2.634,1.438,0,.746.324.964,3.51,1.385,3.153.417,4.651,1.007,4.651,3.223,0,2.236-1.864,3.516-5.115,3.516C14.995,21.743,14.054,19.682,14.054,17.953Z"
                            style="fill:#83cd29" />
                    </svg>` : ''
        }
                    ${data.techs.react_js ? `
                    <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 32 32">
                        <title>file_type_reactjs</title>
                        <circle cx="16" cy="15.974" r="2.5" style="fill:#00d8ff" />
                        <path
                            d="M16,21.706a28.385,28.385,0,0,1-8.88-1.2,11.3,11.3,0,0,1-3.657-1.958A3.543,3.543,0,0,1,2,15.974c0-1.653,1.816-3.273,4.858-4.333A28.755,28.755,0,0,1,16,10.293a28.674,28.674,0,0,1,9.022,1.324,11.376,11.376,0,0,1,3.538,1.866A3.391,3.391,0,0,1,30,15.974c0,1.718-2.03,3.459-5.3,4.541A28.8,28.8,0,0,1,16,21.706Zm0-10.217a27.948,27.948,0,0,0-8.749,1.282c-2.8.977-4.055,2.313-4.055,3.2,0,.928,1.349,2.387,4.311,3.4A27.21,27.21,0,0,0,16,20.51a27.6,27.6,0,0,0,8.325-1.13C27.4,18.361,28.8,16.9,28.8,15.974a2.327,2.327,0,0,0-1.01-1.573,10.194,10.194,0,0,0-3.161-1.654A27.462,27.462,0,0,0,16,11.489Z"
                            style="fill:#00d8ff" />
                        <path
                            d="M10.32,28.443a2.639,2.639,0,0,1-1.336-.328c-1.432-.826-1.928-3.208-1.327-6.373a28.755,28.755,0,0,1,3.4-8.593h0A28.676,28.676,0,0,1,16.71,5.995a11.376,11.376,0,0,1,3.384-2.133,3.391,3.391,0,0,1,2.878,0c1.489.858,1.982,3.486,1.287,6.859a28.806,28.806,0,0,1-3.316,8.133,28.385,28.385,0,0,1-5.476,7.093,11.3,11.3,0,0,1-3.523,2.189A4.926,4.926,0,0,1,10.32,28.443Zm1.773-14.7a27.948,27.948,0,0,0-3.26,8.219c-.553,2.915-.022,4.668.75,5.114.8.463,2.742.024,5.1-2.036a27.209,27.209,0,0,0,5.227-6.79,27.6,27.6,0,0,0,3.181-7.776c.654-3.175.089-5.119-.713-5.581a2.327,2.327,0,0,0-1.868.089A10.194,10.194,0,0,0,17.5,6.9a27.464,27.464,0,0,0-5.4,6.849Z"
                            style="fill:#00d8ff" />
                        <path
                            d="M21.677,28.456c-1.355,0-3.076-.82-4.868-2.361a28.756,28.756,0,0,1-5.747-7.237h0a28.676,28.676,0,0,1-3.374-8.471,11.376,11.376,0,0,1-.158-4A3.391,3.391,0,0,1,8.964,3.9c1.487-.861,4.01.024,6.585,2.31a28.8,28.8,0,0,1,5.39,6.934,28.384,28.384,0,0,1,3.41,8.287,11.3,11.3,0,0,1,.137,4.146,3.543,3.543,0,0,1-1.494,2.555A2.59,2.59,0,0,1,21.677,28.456Zm-9.58-10.2a27.949,27.949,0,0,0,5.492,6.929c2.249,1.935,4.033,2.351,4.8,1.9.8-.465,1.39-2.363.782-5.434A27.212,27.212,0,0,0,19.9,13.74,27.6,27.6,0,0,0,14.755,7.1c-2.424-2.152-4.39-2.633-5.191-2.169a2.327,2.327,0,0,0-.855,1.662,10.194,10.194,0,0,0,.153,3.565,27.465,27.465,0,0,0,3.236,8.1Z"
                            style="fill:#00d8ff" />
                    </svg>` : ``
        }
                    ${data.techs.next_js ? `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="28px" height="28px"
                        viewBox="0 0 32 32">
                        <title>file_type_light_next</title>
                        <path
                            d="M29.874,13.964A14.058,14.058,0,0,0,20.3,2.653a14.74,14.74,0,0,0-2.915-.61c-.263-.027-2.072-.057-2.3-.035h0c-.06,0-.252.024-.424.038A14.034,14.034,0,0,0,4.6,7.848a13.855,13.855,0,0,0-2.471,6.116A10.731,10.731,0,0,0,2,16a10.737,10.737,0,0,0,.126,2.039A14.055,14.055,0,0,0,11.7,29.352a14.772,14.772,0,0,0,2.956.613,25.525,25.525,0,0,0,2.682,0,14.139,14.139,0,0,0,5.045-1.475c.24-.123.287-.156.254-.183s-1.048-1.393-2.28-3.057l-2.239-3.024-2.8-4.152c-1.544-2.282-2.814-4.148-2.825-4.148s-.022,1.841-.027,4.094a32.213,32.213,0,0,1-.06,4.2.5.5,0,0,1-.241.249c-.088.044-.165.052-.578.052h-.473l-.126-.079a.517.517,0,0,1-.184-.2l-.057-.123.005-5.487.009-5.49.084-.107a.768.768,0,0,1,.2-.167c.112-.054.156-.06.629-.06.559,0,.652.022.8.181.041.044,1.56,2.331,3.377,5.087s4.3,6.519,5.524,8.366L23.59,27.8l.112-.074A14.357,14.357,0,0,0,26.579,25.2a13.932,13.932,0,0,0,3.295-7.156A10.737,10.737,0,0,0,30,16,10.731,10.731,0,0,0,29.874,13.964Zm-8.761,1.855-.008,4.921-.868-1.33-.87-1.33V14.5c0-2.312.011-3.612.027-3.675a.558.558,0,0,1,.271-.345c.112-.058.153-.063.583-.063.4,0,.476.005.566.055a.546.546,0,0,1,.277.323C21.113,10.869,21.118,12.39,21.113,15.819Z" />
                    </svg>
                        ` : ``
        }
                    ${data.techs.typescript ? `
                    <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 32 32">
                        <title>file_type_typescript_official</title>
                        <rect x="2" y="2" width="28" height="28" rx="1.312" style="fill:#3178c6" />
                        <path
                            d="M18.245,23.759v3.068a6.492,6.492,0,0,0,1.764.575,11.56,11.56,0,0,0,2.146.192,9.968,9.968,0,0,0,2.088-.211,5.11,5.11,0,0,0,1.735-.7,3.542,3.542,0,0,0,1.181-1.266,4.469,4.469,0,0,0,.186-3.394,3.409,3.409,0,0,0-.717-1.117,5.236,5.236,0,0,0-1.123-.877,12.027,12.027,0,0,0-1.477-.734q-.6-.249-1.08-.484a5.5,5.5,0,0,1-.813-.479,2.089,2.089,0,0,1-.516-.518,1.091,1.091,0,0,1-.181-.618,1.039,1.039,0,0,1,.162-.571,1.4,1.4,0,0,1,.459-.436,2.439,2.439,0,0,1,.726-.283,4.211,4.211,0,0,1,.956-.1,5.942,5.942,0,0,1,.808.058,6.292,6.292,0,0,1,.856.177,5.994,5.994,0,0,1,.836.3,4.657,4.657,0,0,1,.751.422V13.9a7.509,7.509,0,0,0-1.525-.4,12.426,12.426,0,0,0-1.9-.129,8.767,8.767,0,0,0-2.064.235,5.239,5.239,0,0,0-1.716.733,3.655,3.655,0,0,0-1.171,1.271,3.731,3.731,0,0,0-.431,1.845,3.588,3.588,0,0,0,.789,2.34,6,6,0,0,0,2.395,1.639q.63.26,1.175.509a6.458,6.458,0,0,1,.942.517,2.463,2.463,0,0,1,.626.585,1.2,1.2,0,0,1,.23.719,1.1,1.1,0,0,1-.144.552,1.269,1.269,0,0,1-.435.441,2.381,2.381,0,0,1-.726.292,4.377,4.377,0,0,1-1.018.105,5.773,5.773,0,0,1-1.969-.35A5.874,5.874,0,0,1,18.245,23.759Zm-5.154-7.638h4V13.594H5.938v2.527H9.92V27.375h3.171Z"
                            style="fill:#ffffff;fill-rule:evenodd" />
                    </svg>   
                        ` : ``
        }
                </div>
                <div class="d-flex justify-content-between gap-1">
                        <button class="btn text-white py-0 w-100 fw-semibold">edit</button>
                        <button class="btn text-white py-0 w-100 fw-semibold">delete</button>
                </div>
            </div>
        </div>
    </div>
    `
}

function showProjects(){
    const projectsHTML = projects.map(data => dataToHTML(data));

    document.getElementById('projects').innerHTML = projectsHTML.join('');
}

document.getElementById('button-submit').addEventListener('click', (e) => {
    if(!document.querySelector('form').checkValidity()){
        return
    }
    e.preventDefault();

    let data = {
        name: document.getElementById('name').value || 'Project',
        start_date: document.getElementById('start_date').value,
        end_date: document.getElementById('end_date').value,
        description: document.getElementById('description').value || 'Description',
        techs: {
            node_js: document.getElementById('node_js').checked,
            next_js: document.getElementById('next_js').checked,
            react_js: document.getElementById('react_js').checked,
            typescript: document.getElementById('typescript').checked,
        },
        image: document.getElementById('image').files,
    }

    if (data.image.length == 0) {
        data.image = 'images/project-default.jpg';
    }
    else {
        data.image = URL.createObjectURL(data.image[0]);
    }

    projects.push(data);

    showProjects();
    resetInput();
});