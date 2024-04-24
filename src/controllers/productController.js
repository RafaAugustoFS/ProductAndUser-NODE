const productRepository = require('../services/productRepository');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productRepository.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({error: err.toString() })
    }
}

exports.getProductById = async(req,res) =>{
    try {
        const product = await productRepository.getProductById(req.params.id);
        if(!product) {
            res.status(404).json({error:"produto não encontrado"});
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(200).json({ error: error.toString() });
    }
};

exports.createProduct = async (req,res) => {
    try {
        const product = await productRepository.createProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({error:err.toString()});
    }
}

exports.updateProduct = async(req,res) => {
    try {
        const product = await productRepository.updateProduct(req.params.id, req.body);
        if (product) {
            res.status(404).json({error: 'produto não encontrado'})
        } else {
            res.status(200).json(product);
        } 
    } catch (error) {
        res.status(500).json({error: err.toString});
    }
}
exports.deleteProduct = async (req, res) =>{
    try {
        const product = await productRepository.deleteProduct(req.params.id);
        if (product>0) {
            res.status(404).json({error: "produto não encontrado"});
        } else {
            res.status(200).json({msg: "produto deletado com sucesso"});
        }
    } catch (error) {
        res.status(500).json({error:error.toString()});
    }
}