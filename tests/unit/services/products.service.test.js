const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/products.model");
const productsService = require("../../../src/services/products.service");

const { products } = require('./mocks/products.service.mock.js');

describe('testes de funcoes no product.service', function () {
  afterEach(sinon.restore);

  it('retorna a listagem de todos os products devidamente', async function () {

    sinon.stub(productsModel, 'findAll').resolves(products);
    const result = await productsService.findAll();
    expect(result.message).to.be.deep.equal(products);
    
  });

  it("retorna o product id buscado", async function () {

    sinon.stub(productsModel, "findById").resolves(products[2]);
    const productId = 3;

    const result = await productsService.findById(productId);

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(products[2]);
  });
});
