const express = require('express');
const { sequelize } = require('./models');
const adminRoutes = require('./routes/admin');



require('dotenv').config();
const app = express();
const cors = require('cors');
var corsOptions = {
    origin: ['*','https://app-gui.onrender.com'],
    optionsSuccessStatus: 200
}
app.use(express.json());




app.use(cors(corsOptions));
app.use('/admin', adminRoutes);

app.listen({ port: 7000 }, async () => {
      await sequelize.authenticate();
});
// BAZA U SLUCAJU POTREBE ZA connection 
//Connection string= mysql://v3p0ft2qdci5o66m:qlylpzaep7o3jlfb@f80b6byii2vwv8cx.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/ep9upyd7k3iz8n18