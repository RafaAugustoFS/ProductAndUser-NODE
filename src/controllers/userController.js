const userRepository = require('../services/userRepository');

exports.getAllUsers = async (req, res) => {
    try {
        const Users = await userRepository.getAllUsers();
        res.status(200).json(Users);
    } catch (err) {
        res.status(500).json({error: err.toString() })
    }
}

exports.getUserById = async(req,res) =>{
    try {
        const User = await userRepository.getUserById(req.params.id);
        if(!User) {
            res.status(404).json({error:"User não encontrado"});
        } else {
            res.status(200).json(User);
        }
    } catch (error) {
        res.status(200).json({ error: error.toString() });
    }
};

exports.createUser = async (req,res) => {
    try {
        const User = await userRepository.createUser(req.body);
        res.status(201).json(User);
    } catch (err) {
        res.status(500).json({error:err.toString()});
    }
}

exports.updateUser = async(req,res) => {
    try {
        const User = await userRepository.updateUser(req.params.id, req.body);
        if (User) {
            res.status(404).json({error: 'User não encontrado'})
        } else {
            res.status(200).json(User);
        } 
    } catch (error) {
        res.status(500).json({error: err.toString});
    }
}
exports.deleteUser = async (req, res) =>{
    try {
        const User = await userRepository.deleteUser(req.params.id);
        if (User>0) {
            res.status(404).json({error: "User não encontrado"});
        } else {
            res.status(200).json({msg: "User deletado com sucesso"});
        }
    } catch (error) {
        res.status(500).json({error:error.toString()});
    }
}