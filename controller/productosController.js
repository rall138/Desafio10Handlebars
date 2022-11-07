const express = require('express')

class productosController{

    constructor(){

        this.productosRouter = express.Router()
        this.productos = []
        /*
        
        this.productos = 
        [{nombre: 'Azucar', precio: 43, foto:'https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Strawberry-64.png'}, 
        {nombre: 'Harina', precio: 35, foto: 'https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Camera-64.png'}, 
        {nombre: 'Asado', precio: 200}]
        
        */

        this.productosRouter.get('/productos', (req, res) =>{
            if(this.productos.length === 0){
                res.render('errorPage', {error: 'No hay productos'})
            }else{
                res.render('productos', {productos: this.productos})
            }
        })

        this.productosRouter.post('/productos', (req, res) =>{
            const newProducto = req.body
            if(!this.isNullOrUndefined(newProducto)){
                if (!this.isNullOrUndefined(this.productos.filter(p => p.nombre === newProducto.nombre)[0])){
                    res.render('errorPage', {error: `El producto ${newProducto.nombre} ya existe`})
                }else{
                    this.productos.push(newProducto)
                    res.render('producto')
                }
            }
        })

    }

    isNullOrUndefined(objeto){
        return (objeto === null || objeto === undefined)
    }

    getRouter(){
        return this.productosRouter
    }


}

module.exports = productosController