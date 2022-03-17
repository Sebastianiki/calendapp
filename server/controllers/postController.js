const { Post } = require('../models');

exports.getPosts = async (req, res) =>{
    try{
        console.log('ENTROIOOOOOOOOOOOOOOOOOOOOOOO')
        const posts = await Post.findAll();
        res.json({ data: posts });
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error');
    }
}