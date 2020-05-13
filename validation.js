const Joi=require('@hapi/joi');
// /////VALIDATE USER

//on registration
const registerValidation=(data)=>{
    const schema=Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()
    });
    
    return  schema.validate(data);
};

//on log in
const loginValidation=(data)=>{
    const schema=Joi.object({
        // name: Joi.string(),
        email: Joi.string().email().min(6),
        password: Joi.string().min(6).required()
    });
    
    return schema.validate(data);
};

module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;




