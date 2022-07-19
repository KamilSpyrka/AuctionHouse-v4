const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object({
        username: Joi.string() .min(6) .required(),
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required() 
    })

    const {error} = schema.validate(req.body)
    
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: `You must provide a valid email address`
          })
        break

        case 'password':
          res.status(400).send({
            error: `Password should be at least 6 characters long, and contain numbers and letters`
          })
        break

        case 'username':
          res.status(400).send({
              error: `You must provide a valid username`
          })
        break

        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    }
    else {
      next()
    }
  }
}