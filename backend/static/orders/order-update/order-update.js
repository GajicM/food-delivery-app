
function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];

    fetch('http://127.0.0.1:7000/admin/orders/' + id, {
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
        document.getElementById('TotalCost').value = data.TotalCost;
        document.getElementById('isDelivered').checked = data.isDelivered;
        document.getElementById('Time').value=data.Time;
        document.getElementById('driverId').value=data.driverId;
        document.getElementById('userId').value=data.userId;
    });

    document.getElementById('updateOrd').addEventListener('click', e => {
            e.preventDefault();
           
            const data = {
                TotalCost: document.getElementById('TotalCost').value,
                
                isDelivered: document.getElementById('isDelivered').checked,
                Time:document.getElementById('Time').value
            };
           
            fetch('http://127.0.0.1:7000/admin/orders/'+id, {
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
                let up = confirm("orders updated!");
                  document.cookie = `token=${data.token};SameSite=Lax`;
                  window.location.href = '/admin/orders';
            })
    
        });
}