const User = require("../models/userModel")

const createNewUser = (req, res) => {
    User.create({_id: req.params.id}).then(
        (user) => res.json(user)
    )
}

const modifyUserAttributes = (req, res) => {
    const id = req.params.id

    User.findByIdAndUpdate(id, req.body).then(
        () => {
            User.findById(id).then(
                (user) => res.json(user)
            )
        }
    )
}

const getUserAttribute = (req, res) => {
    const id = req.params.id
    const attribute = req.params.attribute

    User.findById(id).then(
        (user) => {
            res.json(user[`${attribute}`])
        }
    )
}

module.exports = {
    createNewUser,
    modifyUserAttributes,
    getUserAttribute
}
