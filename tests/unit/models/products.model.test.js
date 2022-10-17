const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/products.model");

const connection = require('../../../src/models/connection');
const { products } = require('./mocks/products.model.mock.js');

describe('testes de funcoes no product.model', function () {
  afterEach(sinon.restore);

  it('verifica se a funcao de listagem de todos os products ocorre devidamente', async function () {

    const productsIT = [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
      { id: 3, name: "Escudo do Capitão América" },
    ];

    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(products);
    
  });

  it("verifica se a funcao retorna o product id buscado", async function () {

    sinon.stub(connection, "execute").resolves([[products[2]]]);
    const productId = 3;
    const result = await productsModel.findById(productId);
    expect(result).to.be.deep.equal(products[2]);
  });
});
