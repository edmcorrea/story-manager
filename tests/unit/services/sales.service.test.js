const { expect } = require("chai");
const sinon = require("sinon");
const salesModel = require("../../../src/models/sales.model");
const salesService = require("../../../src/services/sales.service");

const { sales, salesIdMock } = require('./mocks/sales.service.mock.js');

describe('testes de funcoes no sales.service', function () {
  afterEach(sinon.restore);

  it('retorna a listagem de todos os sales devidamente', async function () {

    sinon.stub(salesModel, "findAll").resolves(sales);
    const result = await salesService.findAll();
    expect(result.message).to.be.deep.equal(sales);
    
  });

  it("retorna os salesId buscado", async function () {

    sinon.stub(salesModel, "findById").resolves(salesIdMock);

    const result = await salesService.findById(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(salesIdMock);
  });
});
