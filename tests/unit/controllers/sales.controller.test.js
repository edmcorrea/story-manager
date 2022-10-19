const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const salesService = require("../../../src/services/sales.service");
const salesController = require("../../../src/controllers/sales.controller");

const { sales, salesIdMock } = require("./mocks/sales.controller.mock.js");

describe("testes de funcoes no sales.controller", function () {
  afterEach(sinon.restore);

  it("verifica se a funcao de listagem de todos os sales ocorre devidamente", async function () {
    const res = {};
    const req = {};
    const salesList = [sales];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, "findAll")
      .resolves({ type: null, message: salesList });

    await salesController.listSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesList);
  });

  it("verifica se retorna  sales atraves do id", async function () {
    const res = {};
    const req = { params: { id: 1 } };
    const salesList = [salesIdMock];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, "findById")
      .resolves({ type: null, message: salesList });

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesList);
  });

  // it("verifica se retorna um unico product atraves do id", async function () {
  //   const res = {};
  //   const req = { params: { id: 1 } };
  //   const productsList = [products];

  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   sinon
  //     .stub(productsService, "findById")
  //     .resolves({ type: null, message: productsList[0] });

  //   await productsController.getProductById(req, res);

  //   expect(res.status).to.have.been.calledWith(200);
  //   expect(res.json).to.have.been.calledWith(productsList[0]);
  // });
});
