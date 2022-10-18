const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const productsService = require("../../../src/services/products.service");
const productsController = require("../../../src/controllers/products.controller");

const { products } = require('./mocks/products.controller.mock.js');

describe('testes de funcoes no product.controller', function () {
  afterEach(sinon.restore);

  it('verifica se a funcao de listagem de todos os products ocorre devidamente', async function () {

    const res = {};
    const req = {};
    const productsList = [products];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "findAll")
      .resolves({ type: null, message: productsList });

    await productsController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsList);    
  });

  it("verifica se retorna um unico product atraves do id", async function () {
    const res = {};
    const req = { params: { id: 1 } };
    const productsList = [products];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "findById")
      .resolves({ type: null, message: productsList[0] });

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsList[0]);
  });

    it("verifica se retorna um unico product atraves do id", async function () {
      const res = {};
      const req = { params: { id: 1 } };
      const productsList = [products];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "findById")
        .resolves({ type: null, message: productsList[0] });

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsList[0]);
    });
});
