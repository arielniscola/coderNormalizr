const express = require('express')
const path = require('path')
const ProductosAleatorios = require('../contenedor/productosAleatorios')
const router = express.Router();
const productos = new ProductosAleatorios();


router.route("/productos-test").get((req, res, next) => {
  try {
    productos.dataCreate();
    
    res.sendFile(path.join(__dirname, '../public/productosAleatorios.html'))

  } catch (err) {
    next({ message: err.message, statusCode: 500 });
  }
});


async function renderProductosAleatorios(productos){
  try {
    //const response = await fs.readFileSync(path.join(__dirname, './productoTabla.hbs'), 'utf-8')
    //const document = await fs.readFileSync(path.join(__dirname, './productosAleatorios.html'), 'utf-8')
    const response = await fetch('/productoTabla.hbs')
    const plantilla = await response.text()
    console.log('llega');
    const template = handlebars.compile(plantilla)
    const html = template({productos: productos})
    document.querySelector('#productosAleatorios').innerHTML = html
  } catch (error) {
    console.log(error);
  }
}




module.exports = router