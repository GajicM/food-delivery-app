
function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];

    fetch('http://127.0.0.1:7000/admin/shopItems/' + id, {
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
       
        document.getElementById('price').value = data.price;
        document.getElementById('shopId').value=data.shopId;
        document.getElementById('itemId').value=data.itemId;
    });

    document.getElementById('updateItm').addEventListener('click', e => {
            e.preventDefault();
           
            const data = {
          
                price: document.getElementById('price').value,
            };
           
            fetch('http://127.0.0.1:7000/admin/shopItems/'+id, {
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
                let up = confirm("Shop Item updated!");
                  document.cookie = `token=${data.token};SameSite=Lax`;
                  window.location.href = '/admin/shopItems';
            })
    
        });
}