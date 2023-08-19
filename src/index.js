const express = require("express");
const {COINBASE_API_KEY, COINBASE_WEBHOOK_SECRET, DOMAIN} = require('./config');
//La clase "Client" me va a permitir conectarme a coinbase y el objeto "resources" crear órdenes de pago y otras funcionalidades de coinbase" 
const {Client, resources} = require('coinbase-commerce-node');

//conectar con coinbase
Client.init(COINBASE_API_KEY)
//crear orden de pago
const {Charge} = resources;

const app = express();
//definimos una ruta para decirle a coinbase cuanto queremos cobrar  por qué queremos cobrar
app.get('/create-charge', async (req, res)=>{
  
  const chargeData = {
    name: 'Cart Live Resine',
    description: 'Cartucho listo para vapear',
    local_price: {
      amount: '1',
      currency: 'USD'
    },
    pricing_type: 'fixed_price',
    metadata: {
      customer_id: 'id_123',
      customer_name: 'Jhon Doe'
    },
    redirect_url: `${DOMAIN}/success-payment`,
    cancel_url: `${DOMAIN}/cancel-payment`,
  }
  
  const charge = await Charge.create(chargeData)
  
  res.send(charge)
})

//Definimos una ruta que muestra un pago exitoso

app.get('/success-payment', (req,res)=>{
  res.send('Payment Successfull')
})

app.get('/cancel-payment', (req,res)=>{
  res.send('Payment Cancelled')
})




//escucha un puerto en el navegador
app.listen(3000);
console.log("Server on port", 3000);