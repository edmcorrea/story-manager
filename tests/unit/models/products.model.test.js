const { expect } = require("chai");
const sinon = require("sinon");
const { productsModel } = require("../../../src/models");

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

    sinon.stub(connection, 'execute').resolves(products);
    // const productId = 3;
    console.log(products);
    const result = await productsModel.findAll();
    console.log('result', result);
    expect(result).to.be.deep.equal(products);
    
  });

  it("verifica se a funcao retorna o product id buscado", async function () {

    sinon.stub(connection, "execute").resolves(products[2]);
    const productId = 3;
    // console.log(products[2]);
    const result = await productsModel.findById(productId);
    expect(result).to.be.deep.equal(products[2]);
  });
});

  // it("Recuperando a lista de pessoas passageiras", async function () {
  //   sinon.stub(connection, "execute").resolves([passengers]);
  //   const result = await passengerModel.findAll();
  //   expect(result).to.be.deep.equal(passengers);
  // });

  // it("Recuperando uma pessoa passageira a partir do seu id", async function () {
  //   sinon.stub(connection, "execute").resolves([[passengers[0]]]);
  //   const result = await passengerModel.findById(1);
  //   expect(result).to.be.deep.equal(passengers[0]);
  // });

