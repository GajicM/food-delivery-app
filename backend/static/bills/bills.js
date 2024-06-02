function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    console.log("TOKEN "+token+ " TOKEN");
    fetch('http://127.0.0.1:7000/admin/bills', {
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
            const lst = document.getElementById('bllLst');

             lst.innerHTML += `<tr><th> ID </th> <th> TotalCost </th> <th> userId </th> <th> shopId </th><th> isPaid </th></tr>`;
            data.forEach( el => {
                lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.totalCost} </td> <td> ${el.userId} </td> <td> ${el.shopId} </td> <td> ${el.isPaid} </td>  <td>
                <a href="/admin/bills/updateBill/${el.id}" class="btn btn-primary update">
                   Update
                </a>
                <button data-id="${el.id}" class="btn btn-secondary btn-dark delete" onclick="deleteBill(this)">
                  Delete
                </button>
            </td> </tr>`;
            });
        });
    
    document.getElementById('bllBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            totalCost: document.getElementById('totalCost').value,
            isPaid:document.getElementById('isPaid').checked,
            userId:document.getElementById('userId').value,
            shopId:document.getElementById('shopId').value
        };
      
        fetch('http://127.0.0.1:7000/admin/bills', {
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
                    window.location.href = 'bills';
                }
            });
    });




}


function deleteItem(obj) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    let result = confirm("Want to delete?");
    let id;
    if (result) {
         id = obj.getAttribute('data-id');

        fetch('http://127.0.0.1:7000/admin/items/' + id, {
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
            window.location.href = 'items';
        });
    }
}
