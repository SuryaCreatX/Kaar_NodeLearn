const express  = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model.js');
const app = express()

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from NodeAPI Server');
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Update Product
app.put('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)

        if (!product){
            return res.status(404).json({message: "Product not found"});
        }
        const updateProduct = await Product.findById(id)
        res.status(200).json(updateProduct)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Delete Product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)

        if (!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json(updateProduct)
    } catch (error) {
        res.status(500).json({message: "Product not found! Deleted succesfully"});
    }
});

mongoose.connect("mongodb+srv://crud_app_test:test%40123@crudapp.qkth5fo.mongodb.net/Node-API?retryWrites=true&w=majority&appName=crudapp")
.then(() => {
    console.log("Connected to DB!");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch((error) => {
    console.log("Connection! Failed:", error.message);
});