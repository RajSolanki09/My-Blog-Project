// const Product = require("../models/Product");

const Product = require("../models/Product");

// const addProduct = async (req, res) => {
//     try {

//         // const { productName, price, description, category, stock } = req.body;
//         const body = req.body || {};
//         const { productName, price, description, category, stock } = body;


//         const img = req.file ? req.file.filename : "";

//         const product = await Product.create({
//             productName,
//             price,
//             description,
//             img,
//             category,
//             stock,
//             user: req.user.userId
//         });
//         res.status(201).send({ message: "Product added successfully", product });

//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "Server error", error: error.message });
//     }
// }

// const AllProducts = async (req, res) => {

//     try {
//         const products = await Product.find().populate('user', 'userName email role');
//         res.status(200).send({ message: "All Products", products });
//     } catch (error) {
//         res.status(500).send({ message: "Server error", error: error.message });
//     }
// }

// const updateProduct = async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const updateData = req.body;

//         if (req.file) {
//             updateData.img = req.file.filename;
//         }

//         const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

//         if (!updatedProduct) {
//             return res.status(404).send({ message: "Product not found" });
//         }

//         res.status(200).send({ message: "Product updated successfully", product: updatedProduct });

//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "Server error", error: error.message });
//     }
// }

// const deleteProduct = async (req, res) => {
//     try {
//         const productId = req.params.id;

//         const deleteProduct = await Product.findByIdAndDelete(productId);
//              res.status(201).send({ message: "Product deleted successfully" });

//         if (!deleteProduct) {
//             return res.status(404).send({ message: "Product not found" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "Server error", error: error.message });
//     }
// }

// const getProductById = async (req, res) => {
//     try{
//         const productId = req.params.id;
//         const product = await Product.findById(productId).populate('user', 'userName email role');
//         if (!product) {
//             return res.status(404).send({ message: "Product not found" });
//         }
//         res.status(200).send({ message: "Product found", product });

//     }
//     catch(error) {
//         console.error(error);
//         res.status(500).send({ message: "Server error", error: error.message });
//     }
// }
// module.exports = {
//     addProduct, AllProducts, updateProduct,deleteProduct,getProductById
// };


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// after add ejs 

const addProduct = async (req, res) => {
    try {
        const { productName, price, description, category, stock } = req.body;
        const img = req.file ? req.file.filename : "";

        await Product.create({
            productName,
            price,
            description,
            img,
            category,
            stock,
            user: req.user?.userId || null
        });

        res.redirect("/products");
    } catch (error) {
        console.error(error);
        res.render("product-form", { error: "Failed to add product", product: req.body });
    }
};

const AllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('user', 'userName email role');
        res.render("products", { products });
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;

        if (req.file) {
            updateData.img = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).render("products", { error: "Product not found" });
        }

        res.redirect("/products");
    } catch (error) {
        console.error(error);
        res.status(500).render("products", { error: "Failed to update product" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        res.redirect("/products");
    } catch (error) {
        console.error(error);
        res.status(500).render("products", { error: "Failed to delete product" });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).render("products", { error: "Product not found" });
        }

        res.render("product-form", {
            formTitle: "Edit Product",
            formAction: `/products/update-product/${product._id}`,
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).render("products", { error: "Error fetching product" });
    }
};

module.exports = {
    addProduct,
    AllProducts,
    updateProduct,
    deleteProduct,
    getProductById
};
