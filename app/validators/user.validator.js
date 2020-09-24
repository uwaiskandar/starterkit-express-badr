const { body } = require("express-validator")
const validate = require("./index.js").validate
const User = require("../db/models").User

module.exports.createValidationRules = () => {
  return [
    // username must be an email
    body("email")
      .isLength({ min: 6 }).withMessage("must be at least 6 chars long")
      .isEmail().withMessage("must be at an email")
      .custom(value => { 
        if(value) {
          return User.findOne({ where: { email: value }, paranoid: false }).then(user => {
            if (user) {
              return Promise.reject("E-mail already in use")
            }
          })
        } else {
          return Promise.reject("invalid value")
        }
      }),
    // password must be at least 5 chars long
    body("password")
      .isLength({ min: 6 }).withMessage("must be at least 6 chars long"),
  ]
}

module.exports.validate = validate