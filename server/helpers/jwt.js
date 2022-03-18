const jwt = require('jsonwebtoken')

exports.generateJWT = ( userId ) =>{
    return new Promise( (resolve, reject) => {
        const payload = { userId };
        console.log(userId, process.env.SECRET_JWT_SEED);
        jwt.sign( payload, process.env.SECRET_JWT_SEED, { expiresIn: '2h' } , (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }
            resolve(token);
        })
    });
}