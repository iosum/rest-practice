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

    schemas: {
        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}
