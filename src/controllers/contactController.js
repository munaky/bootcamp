export default function handleContact(req, res){
    const { name, email, phone_number, subject, message } = req.body;
    
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

    res.redirect('/contact')
}