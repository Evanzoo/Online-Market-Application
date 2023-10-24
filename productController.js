const Product = require("./productModel");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
const addNewProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }   catch (err) {
        res.status(400).json({ error: err.message});
    }
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
        new: true, // Return the updated product
      });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(updatedProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(deletedProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  
  const deleteAllProducts = async (req, res) => {
    try {
      await Product.deleteMany({});
      res.json({ message: "All products have been removed." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  const findProductsByName = async (req, res) => {
    const keyword = req.query.name;
    try {
      const products = await Product.find({ name: { $regex: keyword, $options: "i" } });
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports = {
    getAllProducts,
    getProductById,
    addNewProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    findProductsByName,
  };
  
  
  