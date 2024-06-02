
function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];

    fetch('http://127.0.0.1:7000/admin/users/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
    })
    .then( res => res.json() )
    .then( data => {
        if(data.msg){
            alert(data.msg);
            return;
        }
        document.getElementById('firstName').value = data.firstName;
        document.getElementById('lastName').value=data.lastName;
        document.getElementById('admin').checked = data.admin;
        document.getElementById('moderator').checked = data.moderator;
    });

    document.getElementById('updateUsr').addEventListener('click', e => {
            e.preventDefault();
           
            const data = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                admin: document.getElementById('admin').checked,
                moderator: document.getElementById('moderator').checked,
            };
           
            fetch('http://127.0.0.1:7000/admin/users/'+id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.msg){
                    alert(data.msg);
                    return;
                }
                let up = confirm("User updated!");
                  document.cookie = `token=${data.token};SameSite=Lax`;
                  window.location.href = '/admin/users';
            })
    
        });
}