function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    console.log("TOKEN "+token+ " TOKEN");
    fetch('http://127.0.0.1:7000/admin/items', {
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
            const lst = document.getElementById('itmLst');

             lst.innerHTML += `<tr><th> ID </th> <th> Item name </th><th> price </th><th>imgUrl</th></tr>`;
            data.forEach( el => {
                lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.itemName} </td> <td> ${el.price} </td><td>${el.imgUrl}</td>  <td>
                <a href="/admin/items/updateItem/${el.id}" class="btn btn-primary update">
                   Update
                </a>
                <button data-id="${el.id}" class="btn btn-secondary btn-dark delete" onclick="deleteItem(this)">
                  Delete
                </button>
            </td> </tr>`;
            });
        });
    
    document.getElementById('itmBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            itemName: document.getElementById('name').value,
            price:document.getElementById('price').value,
            imgUrl:document.getElementById('imgUrl').value
        };
        console.log(data.itemName);
        fetch('http://127.0.0.1:7000/admin/items', {
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
                    window.location.href = 'items';
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
