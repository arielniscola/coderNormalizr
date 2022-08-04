const { faker } = require('@faker-js/faker')
faker.locale = "es";

class ProductosAleatorios{
    constructor(){
        this.productos = []
    }

    dataCreate(){
        for (let i = 0; i < 5; i++) {
          this.productos.push({
            id: i,
            nombre: faker.commerce.product(),
            precio: faker.commerce.price(),
            foto: faker.image.imageUrl()
          });
          }
    }
    
}

module.exports = ProductosAleatorios

