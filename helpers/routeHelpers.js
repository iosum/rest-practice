const Joi = require('@hapi/joi');

module.exports = {
    /**
     * use validateParam before actually triggering the route
     */
    validateParam: (schema, name) => {
        return (req, res, next) => {
            console.log('req.params', req.params);
            // validate the different types of id using an abstract name called name
            // req['params'][name] can validate req.params.id or req.params.postId or anything that has an id properity
            //const result = Joi.validate({ param: req['params'][name]} ,schema)
            const result = schema.validate({ param: req['params'][name] })
            if(result.error) {
                // error happend
                return res.status(400).json(result.error);
            }
            else {
                // no error, continue the controller
                if(!req.value) {
                    req.value = {};
                }
                if(!req.value['params']) {
                    req.value['params'] = {}
                }
                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.body);

            if(result.error) {
                return res.status(400).json(result.error);
            }
            else {
                // there is an body
                if(!req.value) {
                    req.value = {};
                }
                // if the req.value has a body object
                if(!req.value['body']) {
                    req.value['body'] = {};
                }
                req.value['body'] = result.value;
                // escape the validate function
                next();
            }
        }
    },

    schemas: {
        
        userSchema: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required()
        }),

        userOptionalSchema: Joi.object().keys({
            firstName: Joi.string(),
            lastName: Joi.string()
        }),

        postSchema: Joi.object().keys({
            content: Joi.string().required(),
            createdAt: Joi.date().required()
        }),

        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}
