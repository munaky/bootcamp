let button_submit = document.getElementById('button-submit');

function showData(e){
    if(!document.querySelector('form').checkValidity()){
        return
    }
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone_number = document.getElementById('phone_number').value;
    let subject = document.getElementById('subject').value;
    let message = document.getElementById('message').value;

    alert(`
        Name = ${name}
        Email = ${email}
        Phone Number = ${phone_number}
        Subject = ${subject}
        Message = ${message}
        `);

    console.table([
        {
            'Key': 'Name',
            'Value': name,
        },
        {
            'Key': 'Email',
            'Value': email,
        },
        {
            'Key': 'Phone Number',
            'Value': phone_number,
        },
        {
            'Key': 'Subject',
            'Value': subject,
        },
        {
            'Key': 'Message',
            'Value': message,
        },
    ]);
}

button_submit.addEventListener('click', showData);