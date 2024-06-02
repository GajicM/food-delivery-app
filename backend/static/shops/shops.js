function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    console.log("TOKEN "+token+ " TOKEN");
    fetch('http://127.0.0.1:7000/admin/shops', {
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
            const lst = document.getElementById('shpLst');

             lst.innerHTML += `<tr><th> ID </th> <th>Shop Name </th><th>imgUrl</th></tr>`;
            data.forEach( el => {
                lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.ShopName} </td> <td>${el.imgUrl}</td> <td>
                <a href="/admin/shops/updateShop/${el.id}" class="btn btn-primary update">
                   Update
                </a>
                <button data-id="${el.id}" class="btn btn-secondary btn-dark delete" onclick="deleteShop(this)">
                  Delete
                </button>
            </td> </tr>`;
            });
        });
    
    document.getElementById('shpBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            ShopName: document.getElementById('ShopName').value,
            imgUrl:document.getElementById('imgUrl').value

        };
        console.log(data.ShopName);
        fetch('http://127.0.0.1:7000/admin/shops', {
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
                    window.location.href = 'shops';
                }
            });
    });




}


function deleteShop(obj) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    let result = confirm("Want to delete?");
    let id;
    if (result) {
         id = obj.getAttribute('data-id');

        fetch('http://127.0.0.1:7000/admin/shops/' + id, {
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
            window.location.href = 'shops';
        });
    }
}
