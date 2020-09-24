const User = require("../db/models").User
const { Op } = require("sequelize")

exports.findByEmail = async (email) => {
  return User.findOne({where: {email: email}})
}

exports.list = async (req, res) => {
  try {
    const keyword = req.query.keyword || null
    const options = {
      attributes: ["id", "email", "password"],
      page: parseInt(req.query.page)  || 1, // Default 1
      paginate: parseInt(req.query.paginate) || 10, // Default 25
      order: [["createdAt", "DESC"]]
    }
    console.log(options)
    if(keyword) {
      options.where = { email: { [Op.like]: "%"+ keyword +"%" } }
    }
    const {docs, pages, total} = await User.paginate(options)
    res.send({meta: {total: total, pages: pages }, data: docs})
  } catch(err) {
    res.status(400).send({
      message: err.message || "No data"
    })
  }
}

exports.create = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    res.send({data: newUser})
  } catch(err) {
    res.status(400).send({
      message: err.message || "No data"
    })
  }
}

exports.update = async (req, res) => {
  try {
    const paramId = req.params.id
    const updateUser = await User.findOne({ where: { id: paramId } })
    updateUser.email = req.body.email
    updateUser.password = req.body.password
    updateUser.save()
    res.send({data: updateUser})
  } catch(err) {
    res.status(400).send({
      message: err.message || "No data"
    })
  }
}

exports.delete = async (req, res) => {
  try {
    const paramId = req.params.id
    const deletedUser = await User.findOne({ where: { id: paramId } })
    deletedUser.destroy()
    res.json({message: "Berhasil menghapus Data"})
  } catch(err) {
    res.status(400).send({
      message: err.message || "No data"
    })
  }
}
