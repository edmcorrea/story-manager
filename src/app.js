const express = require('express');
const { productsController, salesController } = require('./controllers');
const validateSaleInput = require('./middlewares/validateSaleInput');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.listProducts);

app.get('/products/:id', productsController.getProductById);

app.post('/products', productsController.createNewProduct);

app.get('/sales', salesController.listSales);

app.get('/sales/:id', salesController.getSaleById);

app.post('/sales', validateSaleInput, salesController.createNewSale);

app.put('/products/:id', productsController.changeName);

app.delete('/products/:id', productsController.deleteProduct);

app.delete('/sales/:id', salesController.deleteSale);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;