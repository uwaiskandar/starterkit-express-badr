var express = require("express")
var router = express.Router()

const user = require("../controllers/user.controller.js")
const userValidator = require("../validators/user.validator.js")

/**
 * @typedef User
 * @property {string} email.required - test@example.com - Email user
 * @property {string} password.required - password123 - Password user
 */

/* GET users listing. */
/**
 * This function comment is parsed by doctrine
 * @route GET /users
 * @group User - Operations about user
 * @param {string} keyword.query - Nama - Keyword
 * @param {integer} page.query - Page - 1
 * @param {integer} paginate.query - Paginate - 10
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get("/", user.list)

// POST users
/**
 * This function comment is parsed by doctrine
 * @route POST /users
 * @group User - Operations about user
 * @param {User.model} data.body - Email & Password - eg: user@domain
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post("/", userValidator.createValidationRules(), userValidator.validate, user.create)
// router.post('/', user.create);

// UPDATE users
/**
 * This function comment is parsed by doctrine
 * @route PATCH /users/{id}
 * @group User - Operations about user
 * @param {string} id.path.required - User ID - User ID 
 * @param {User.model} data.body test - Some Name description - Data body - example
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.patch("/:id", user.update)

// DELETE users
/**
 * This function comment is parsed by doctrine
 * @route DELETE /users/{id}
 * @group User - Operations about user
 * @param {string} id.path.required - User ID - User ID
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.delete("/:id", user.delete)

module.exports = router
