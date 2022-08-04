const express = require('express')
const path = require('path')
const ProductosAleatorios = require('../contenedor/productosAleatorios')
const router = express.Router();
const products = new ProductosAleatorios();


router.route("/productos-test").get( async (req, res, next) => {

   products.dataCreate()

   return res.render('productoTabla', { productos: products.productos})

});


async function renderProductosAleatorios(productos){
  try {
 
    const template = handlebars.compile(plantilla)
    const html = template({productos: productos})
    document.querySelector('#productosAleatorios').innerHTML = html
  } catch (error) {
    console.log(error);
  }
}




module.exports = router