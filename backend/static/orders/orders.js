function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    console.log("TOKEN "+token+ " TOKEN");
    fetch('http://127.0.0.1:7000/admin/orders', {
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
            const lst = document.getElementById('ordLst');

             lst.innerHTML += `<tr><th> ID </th> <th> TotalCost </th><th> isDelivered </th><th>Time</th> <th> userId </th><th> driverId </th></tr>`;
            data.forEach( el => {
                lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.TotalCost} </td> <td> ${el.isDelivered} </td> <td>${el.Time}</td> <td>${el.userId}</td><td>${el.driverId}</td><td>
                <a href="/admin/orders/updateOrder/${el.id}" class="btn btn-primary update">
                   Update
                </a>
                <button data-id="${el.id}" class="btn btn-secondary btn-dark delete" onclick="deleteOrder(this)">
                  Delete
                </button>
            </td> </tr>`;
            });
        });
    
    document.getElementById('ordBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            TotalCost: document.getElementById('TotalCost').value,
            isDelivered:document.getElementById('isDelivered').checked,
            Time:document.getElementById('Time').value,
            userId:document.getElementById('userId').value,
            driverId:document.getElementById('driverId').value
        };
        console.log(data.itemName);
        fetch('http://127.0.0.1:7000/admin/orders', {
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
                    window.location.href = 'orders';
                }
            });
    });




}


function deleteOrder(obj) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    let result = confirm("Want to delete?");
    let id;
    if (result) {
         id = obj.getAttribute('data-id');

        fetch('http://127.0.0.1:7000/admin/orders/' + id, {
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
            window.location.href = 'orders';
        });
    }
}
