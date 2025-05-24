document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/')[1]

    if (path == 'my-project' || path == 'project') {
        document.querySelector('nav [href="/my-project"]').classList.add('fw-bold');
    }
    else if (path == '' || path == 'home'){
        document.querySelector('nav [href="/home"]').classList.add('fw-bold');
    }
});