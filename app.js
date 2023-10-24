const express = require('express');
const cors = require('cors');
const mongoose = require("./db");
const productController = require('./productController');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to DressStore application"});
});

app.get("/api/product", productController.getAllProducts);
app.get("/api/product/:id", productController.getProductById);
app.post("/api/product", productController.addNewProduct);
app.put("/api/product/:id", productController.updateProduct);
app.delete("/api/product/:id", productController.deleteProduct);
app.delete("/api/product", productController.deleteAllProducts);
app.get("/api/product/search", productController.findProductsByName);
