const express = require('express');
const { addProduct, AllProducts, updateProduct, deleteProduct, getProductById } = require('../controller/productController');
const upload = require('../middleware/upload');
const { onlyAdmin, authCheck } = require('../middleware/auth');

const productRouter = express.Router();

// productRouter.post('/add-product', authCheck, onlyAdmin, upload.single("img"), addProduct);
// productRouter.get('/', authCheck, onlyAdmin, AllProducts);
// productRouter.get('/get-product/:id', authCheck, onlyAdmin, getProductById);
// productRouter.delete('/delete-product/:id', authCheck, onlyAdmin, deleteProduct);
// productRouter.put('/update-product/:id', authCheck, onlyAdmin, upload.single("img"), updateProduct);


// module.exports = productRouter;

// =================================== after ejs 


// View all products (EJS rendered)
productRouter.get('/', authCheck, onlyAdmin, AllProducts);

// Show add product form
productRouter.get('/add', authCheck, onlyAdmin, (req, res) => {
  res.render("product-form", {
    formTitle: "Add Product",
    formAction: "/products/add-product",
    product: {}
  });
});

// Submit add product form
productRouter.post('/add-product', authCheck, onlyAdmin, upload.single("img"), addProduct);

// Show edit product form
productRouter.get('/edit/:id', authCheck, onlyAdmin, getProductById);

// Submit update product form
productRouter.post('/update-product/:id', authCheck, onlyAdmin, upload.single("img"), updateProduct);

// Delete product via GET (safe for buttons)
productRouter.get('/delete-product/:id', authCheck, onlyAdmin, deleteProduct);

module.exports = productRouter;

