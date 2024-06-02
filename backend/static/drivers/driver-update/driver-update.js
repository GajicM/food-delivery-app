
function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];

    fetch('http://127.0.0.1:7000/admin/drivers/' + id, {
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
        document.getElementById('licencePlate').value = data.licencePlate;
        document.getElementById('phoneNumber').value = data.phoneNumber;
    });

    document.getElementById('updateDrv').addEventListener('click', e => {
            e.preventDefault();
           
            const data = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                licencePlate: document.getElementById('licencePlate').value,
                phoneNumber: document.getElementById('phoneNumber').value,
            };
           
            fetch('http://127.0.0.1:7000/admin/drivers/'+id, {
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
                let up = confirm("Driver updated!");
                  document.cookie = `token=${data.token};SameSite=Lax`;
                  window.location.href = '/admin/drivers';
            })
    
        });
}