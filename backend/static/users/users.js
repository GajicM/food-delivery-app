function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    console.log(token);
    fetch('http://127.0.0.1:7000/admin/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then( data => {
           /// console.log(data);
           if(data.msg){
            console.log(data);
            alert(data.msg);
            document.cookie = `token=${data.token};SameSite=Lax`;
            window.location.href = '/admin/';
            return;
            }
            const lst = document.getElementById('usrLst');

             lst.innerHTML += `<tr><th> ID </th> <th>First Name </th> <th> Last Name</th><th> Username </th> <th> Admin </th> <th> Moderator </th> <th> Action </th> </tr>`;
            data.forEach( el => {
                lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.firstName} </td> <td> ${el.lastName} </td> <td> ${el.username} </td>  <td> ${el.admin} </td> <td> ${el.moderator} <td>
                <a href="/admin/users/updateUser/${el.id}" class="btn btn-primary update">
                   Update
                </a>
                <button data-id="${el.id}" class="btn btn-secondary btn-dark delete" onclick="deleteUser(this)">
                  Delete
                </button>
            </td> </tr>`;
            });
        });
    
    document.getElementById('usrBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            username:document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            admin: document.getElementById('admin').checked,
            moderator: document.getElementById('mod').checked
            
        };
        console.log(data.username);
        fetch('http://127.0.0.1:7000/admin/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    window.location.href = 'users';
                }
            });
    });




}


function deleteUser(obj) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    let result = confirm("Want to delete?");
    let id;
    if (result) {
         id = obj.getAttribute('data-id');

        fetch('http://127.0.0.1:7000/admin/users/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.msg){
                alert(data.msg);
                return;
            }
            document.cookie = `token=${data.token};SameSite=Lax`;
            window.location.href = 'users';
        });
    }
}
