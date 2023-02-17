
Router
//importo classes y obj para crear instancias de lo q voy a usar
import { Router } from "express";
import ProductManager, { Product }  from '../controllers/ProductManager.js';

// creo instancias
const productRouter = Router()
const productManager = new ProductManager(/Users/annie/Desktop/Backend/Clase-10-11-12/src/controllers/ProductManeger.js)

productRouter.get('/', async (req, res) => { 
    const { limit } = req.query; 
    console.log(limit)
    if(!limit) {

    }
    else {

    }
    const productos = await productManager.getProducts()
    console.log(productos)
    res.send(JSON.stringify(productos))
})
  
productRouter.get('/:id', async (req, res) => { 
    const producto = await productManager.getProductById(req.params.id)
    console.log(producto)
    res.send(JSON.stringify(producto))
})
  
productRouter.post('/', async (req, res) => { 
    let mensaje = await productManager.addProduct(req.body)
    res.send(mensaje)
})
  
productRouter.delete('/:id', async (req, res) => {
    let mensaje = await productManager.deleteProduct(req.params.id) 
    res.send(mensaje)
})
  
productRouter.put('/:id', async (req, res) => { 
    let mensaje = await productManager.updateProduct(req.params.id, req.body)
    res.send(mensaje)
})


export default productRouter