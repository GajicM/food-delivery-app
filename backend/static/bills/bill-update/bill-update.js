
function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];

    fetch('http://127.0.0.1:7000/admin/bills/' + id, {
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
        document.getElementById('totalCost').value = data.totalCost;
        document.getElementById('isPaid').checked = data.isPaid;
        document.getElementById('shopId').value=data.shopId;
        document.getElementById('userId').value=data.userId;
    });

    document.getElementById('updateBll').addEventListener('click', e => {
            e.preventDefault();
           
            const data = {
                totalCost: document.getElementById('totalCost').value,
              
                isPaid: document.getElementById('isPaid').checked,
            };
           
            fetch('http://127.0.0.1:7000/admin/bills/'+id, {
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
                let up = confirm("bill updated!");
                  document.cookie = `token=${data.token};SameSite=Lax`;
                  window.location.href = '/admin/bills';
            })
    
        });
}