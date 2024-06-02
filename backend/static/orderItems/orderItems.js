function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    console.log("TOKEN "+token+ " TOKEN");
    fetch('http://127.0.0.1:7000/admin/orderItems', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then( data => {
            console.log(data);
           if(data.msg){
            alert(data.msg);
            return;
            }
            const lst = document.getElementById('oriLst');

             lst.innerHTML += `<tr><th> ID </th> <th>quantity </th></th> <th>ShopItemId </th></th> <th>OrderId </th></tr>`;
            data.forEach( el => {
                lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.quantity} </td><td> ${el.shopItemId} </td><td> ${el.orderId} </td>  <td>
                <a href="/admin/orderItems/updateOrderItem/${el.id}" class="btn btn-primary update">
                   Update
                </a>
                <button data-id="${el.id}" class="btn btn-secondary btn-dark delete" onclick="deleteOrderItem(this)">
                  Delete
                </button>
            </td> </tr>`;
            });
        });
    
    document.getElementById('oriBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            quantity: document.getElementById('quantity').value,
            orderId:document.getElementById('orderId').value,
            shopItemId:document.getElementById('shopItemId').value
        };
        console.log(data.ShopName);
        fetch('http://127.0.0.1:7000/admin/orderItems', {
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
                    window.location.href = 'orderItems';
                }
            });
    });




}


function deleteOrderItem(obj) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    let result = confirm("Want to delete?");
    let id;
    if (result) {
         id = obj.getAttribute('data-id');

        fetch('http://127.0.0.1:7000/admin/orderItems/' + id, {
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
            window.location.href = 'orderItems';
        });
    }
}
