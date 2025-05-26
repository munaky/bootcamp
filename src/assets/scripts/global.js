document.addEventListener('DOMContentLoaded', () => {
    const segments = window.location.pathname.split('/');
    const first_segment = segments[1]

    if (first_segment == 'my-project' || first_segment == 'project' || (segments[1] == 'update' && segments[2] == 'project')) {
        document.querySelector('nav [href="/my-project"]').classList.add('fw-bold');
    }
    else if (first_segment == '' || first_segment == 'home'){
        document.querySelector('nav [href="/home"]').classList.add('fw-bold');
    }
});