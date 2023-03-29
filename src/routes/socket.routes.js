import { Router } from 'express'
import { getManagerProducts } from '../dao/daoManager.js';
//import { managerMessages } from '../index.js';

const routerSocket = Router()

const prodManagerData = await getManagerProducts()
const prodManager = new prodManagerData()

routerSocket.get('/', async (req, res) => {
    let { limit } = req.query;

    let products
    !limit
        ? products = await prodManager.getElements(0)
        : products = await prodManager.getElements(limit)
    res.render("home", { products })

    
})

routerSocket.get("/realtimeproducts", async (req, res) => {

    try {

        const products = await prodManager.getElements(0)
        console.log(products)
        res.render("realTimeProducts", { products: products })
    } catch (error) {
        console.log(error)
    }


    
})



export default routerSocket