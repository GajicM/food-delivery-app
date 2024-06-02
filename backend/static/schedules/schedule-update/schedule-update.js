
function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const urlParams = window.location.href.split('/');
    let id = urlParams[urlParams.length-1];

    fetch('http://127.0.0.1:7000/admin/schedules/' + id, {
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
        document.getElementById('startTime').value = data.startTime;
        document.getElementById('endTime').value = data.endTime;
        document.getElementById('driverId').value=data.driverId;
    });

    document.getElementById('updateSch').addEventListener('click', e => {
            e.preventDefault();
           
            const data = {
                startTime: document.getElementById('startTime').value,
                endTime: document.getElementById('endTime').value,
            };
           
            fetch('http://127.0.0.1:7000/admin/schedules/'+id, {
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
                let up = confirm("Schedule updated!");
                  document.cookie = `token=${data.token};SameSite=Lax`;
                  window.location.href = '/admin/schedules';
            })
    
        });
}