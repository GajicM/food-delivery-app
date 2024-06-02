
function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];

    fetch('http://127.0.0.1:7000/admin/orderItems/' + id, {
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
        document.getElementById('quantity').value = data.quantity;
        document.getElementById('orderId').value=data.orderId;
        document.getElementById('shopItemId').value=data.shopItemId;
    });

    document.getElementById('updateOri').addEventListener('click', e => {
            e.preventDefault();
           
            const data = {
                quantity: document.getElementById('quantity').value,

            };
           
            fetch('http://127.0.0.1:7000/admin/OrderItems/'+id, {
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
                let up = confirm("orderItem updated!");
                  document.cookie = `token=${data.token};SameSite=Lax`;
                  window.location.href = '/admin/orderItems';
            })
    
        });
}