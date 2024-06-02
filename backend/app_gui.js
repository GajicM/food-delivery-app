const express = require('express');
const { sequelize } = require('./models');
const path = require('path');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const history = require('connect-history-api-fallback');
const app = express();


function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}





const staticMdl = express.static(path.join(__dirname, 'FoodDelivery'));

app.use(staticMdl);

app.use(history({ index: '/index.html' }));

app.use(staticMdl);

app.use(express.static(path.join(__dirname, 'static')));


app.get('/register', (req, res) => {
   
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
  
    res.sendFile('login.html', { root: './static' });
});


app.use(authToken);


app.get('/admin/',(req,res)=>{

    res.sendFile('index.html',{root:'./static'});
})

app.get('/admin/users', (req, res) => {
    
    res.sendFile('users.html', {root:'./static/users/'});
  
});

app.get('/admin/users/updateUser/:id', (req, res) => {
    
    res.sendFile('user-update.html', {root:'./static/users/user-update/'});
  
});



app.get('/admin/shops', (req, res) => {
    
    res.sendFile('shops.html', {root:'./static/shops/'});
  
});
app.get('/admin/shops/updateShop/:id', (req, res) => {
    
    res.sendFile('shop-update.html', {root:'./static/shops/shop-update/'});
  
});

app.get('/admin/items', (req, res) => {
    
    res.sendFile('items.html', {root:'./static/items/'});
  
});

app.get('/admin/items/updateItem/:id', (req, res) => {
    
    res.sendFile('item-update.html', {root:'./static/items/item-update/'});
  
});

app.get('/admin/schedules', (req, res) => {
    
    res.sendFile('schedules.html', {root:'./static/schedules/'});
  
});

app.get('/admin/schedules/updateSchedule/:id', (req, res) => {
    
    res.sendFile('schedule-update.html', {root:'./static/schedules/schedule-update/'});
  
});
app.get('/admin/drivers', (req, res) => {
    
    res.sendFile('drivers.html', {root:'./static/drivers/'});
  
});

app.get('/admin/drivers/updateDriver/:id', (req, res) => {
    
    res.sendFile('driver-update.html', {root:'./static/drivers/driver-update/'});
  
});
app.get('/admin/bills', (req, res) => {
    
    res.sendFile('bills.html', {root:'./static/bills/'});
  
});

app.get('/admin/bills/updateBill/:id', (req, res) => {
    
    res.sendFile('bill-update.html', {root:'./static/bills/bill-update/'});
  
});
app.get('/admin/orderItems', (req, res) => {
    
    res.sendFile('orderItems.html', {root:'./static/orderItems/'});
  
});

app.get('/admin/orderItems/updateOrderItem/:id', (req, res) => {
    
    res.sendFile('orderItem-update.html', {root:'./static/orderItems/orderItem-update/'});
  
});
app.get('/admin/locations', (req, res) => {
    
    res.sendFile('locations.html', {root:'./static/locations/'});
  
});

app.get('/admin/locations/updateLocation/:id', (req, res) => {
    
    res.sendFile('location-update.html', {root:'./static/locations/location-update/'});
  
});

app.get('/admin/shopItems', (req, res) => {
    
    res.sendFile('shopItems.html', {root:'./static/shopItems/'});
  
});

app.get('/admin/shopItems/updateShopItem/:id', (req, res) => {
    
    res.sendFile('shopItem-update.html', {root:'./static/shopItems/shopItem-update/'});
  
});


app.get('/admin/orders', (req, res) => {
    
    res.sendFile('orders.html', {root:'./static/orders/'});
  
});

app.get('/admin/orders/updateOrder/:id', (req, res) => {
    
    res.sendFile('order-update.html', {root:'./static/orders/order-update/'});
  
});




app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});