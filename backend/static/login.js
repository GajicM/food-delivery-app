function init() {
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        console.log(data);
        fetch('http://127.0.0.1:9000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
               console.log(el);
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    window.location.href = '/admin/';
                }
            });
    });
}