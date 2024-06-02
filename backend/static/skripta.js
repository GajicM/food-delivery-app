
function init() {

    document.getElementById('users').addEventListener('click',e=>{
       window.location.href ='users';
    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = '../login.html';
    });
    document.getElementById('shops').addEventListener('click', e => {
        window.location.href = 'admin/shops';
    });
    document.getElementById('items').addEventListener('click', e => {
        window.location.href = 'items';
    });
    document.getElementById('schedules').addEventListener('click', e => {
        window.location.href = 'schedules';
    });
    document.getElementById('drivers').addEventListener('click', e => {
        window.location.href = 'drivers';
    });
    document.getElementById('bills').addEventListener('click', e => {
        window.location.href = 'bills';
    });
    document.getElementById('orderItems').addEventListener('click', e => {
        window.location.href = 'orderItems';
    });
    document.getElementById('locations').addEventListener('click', e => {
        window.location.href = 'locations';
    });
    document.getElementById('shopItems').addEventListener('click', e => {
        window.location.href = 'shopItems';
    });
    document.getElementById('orders').addEventListener('click', e => {
        window.location.href = 'orders';
    });
}