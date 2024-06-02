function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    console.log(token);
    fetch('http://127.0.0.1:7000/admin/drivers', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then( data => {
           /// console.log(data);
           if(data.msg){
            alert(data.msg);
            return;
            }
            const lst = document.getElementById('drvLst');

             lst.innerHTML += `<tr><th> ID </th> <th>First Name </th> <th> Last Name</th><th> Driver Licence </th> <th> PhoneNumber </th></tr>`;
            data.forEach( el => {
                lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.firstName} </td> <td> ${el.lastName} </td> <td> ${el.licencePlate} </td>  <td> ${el.phoneNumber} </td> <td>
                <a href="/admin/drivers/updateDriver/${el.id}" class="btn btn-primary update">
                   Update
                </a>
                <button data-id="${el.id}" class="btn btn-secondary btn-dark delete" onclick="deleteDriver(this)">
                  Delete
                </button>
            </td> </tr>`;
            });
        });
    
    document.getElementById('drvBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            licencePlate:document.getElementById('licencePlate').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            
            
        };
        console.log(data.username);
        fetch('http://127.0.0.1:7000/admin/drivers', {
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
                    window.location.href = 'drivers';
                }
            });
    });




}


function deleteDriver(obj) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    let result = confirm("Want to delete?");
    let id;
    if (result) {
         id = obj.getAttribute('data-id');

        fetch('http://127.0.0.1:7000/admin/drivers/' + id, {
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
            window.location.href = 'drivers';
        });
    }
}
