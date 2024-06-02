function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    
    fetch('http://127.0.0.1:7000/admin/schedules', {
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
            console.log(data);
            const lst = document.getElementById('schLst');

             lst.innerHTML += `<tr><th> ID </th><th>driverId</th> <th> start time </th><th>end time </th></tr>`;
            data.forEach( el => {
                lst.innerHTML += `<tr> <td> ${el.id} </td> <td>${el.driverId}</td> <td> ${el.startTime} </td> <td> ${el.endTime} </td>  <td>
                <a href="/admin/schedules/updateSchedule/${el.id}" class="btn btn-primary update">
                   Update
                </a>
                <button data-id="${el.id}" class="btn btn-secondary btn-dark delete" onclick="deleteSchedule(this)">
                  Delete
                </button>
            </td> </tr>`;
            });
        });
    
    document.getElementById('schBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            startTime: document.getElementById('startTime').value,
            endTime:document.getElementById('endTime').value,
            driverId:document.getElementById('driverId').value
        };
        console.log(data.itemName);
        fetch('http://127.0.0.1:7000/admin/schedules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    window.location.href = 'schedules';
                }
            });
    });




}


function deleteSchedule(obj) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    let result = confirm("Want to delete?");
    let id;
    if (result) {
         id = obj.getAttribute('data-id');

        fetch('http://127.0.0.1:7000/admin/schedules/' + id, {
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
            window.location.href = 'schedules';
        });
    }
}
