const usersRoutes = require('./users');
const shopRoutes= require('./shops');
const itemRoutes=require('./items');
const scheduleRoutes=require('./schedules');
const driverRoute=require('./drivers');
const billRoute=require('./bills');
const orderItemRoute=require('./orderItem');
const locationRoute=require('./locations');
const shopItemRoute=require('./shopItems');
const orderRoute=require('./orders');
const express = require('express');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.use('/users', usersRoutes);
route.use('/shops',shopRoutes);
route.use('/items',itemRoutes);
route.use('/schedules',scheduleRoutes);
route.use('/drivers',driverRoute);
route.use('/bills',billRoute);
route.use('/orderItems',orderItemRoute);
route.use('/locations',locationRoute);
route.use('/shopItems',shopItemRoute);
route.use('/orders',orderRoute);

module.exports = route;