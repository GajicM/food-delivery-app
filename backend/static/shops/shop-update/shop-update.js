
function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];

    fetch('http://127.0.0.1:7000/admin/shops/' + id, {
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
        document.getElementById('ShopName').value = data.ShopName;
        document.getElementById('imgUrl').value=data.imgUrl;
    });

    document.getElementById('updateShp').addEventListener('click', e => {
            e.preventDefault();
           
            const data = {
                ShopName: document.getElementById('ShopName').value,
                imgUrl:document.getElementById('imgUrl').value

            };
           
            fetch('http://127.0.0.1:7000/admin/shops/'+id, {
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
                let up = confirm("Shop updated!");
                  document.cookie = `token=${data.token};SameSite=Lax`;
                  window.location.href = '/admin/shops';
            })
    
        });
}