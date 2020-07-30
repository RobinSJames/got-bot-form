const User = require('../models/users');

// @description add a user
// @route POST /api/users/add

exports.addUser = async (req, res) => {
  try {
    const users = await User.find({ email: req.body.email })
    if (users.length >= 1) {
      return res.status(409).json({
        success: false,
        message: "This email exists. Please enter a different email."
      })
    } else {
      try {
        let id
        await User.create({
          email: req.body.email,
          name: req.body.name,
          number: req.body.number
        }, function(err, res) {
          if (err) return Error(err)
          id = res._id
        });
        return res.status(201).json({
          success: true,
          message: 'Your details are logged and secured',
          userId: id
        })
      } catch (error) {
        if(error.name === 'ValidationError') {
          const messages = Object.values(error.errors).map(element => element.message);
          return res.status(422).json({
            success: false,
            errorMessage: messages
          })
        } else {
          return res.status(500).json({
            success: false,
            errorMessage: 'Server Error'
          })
        }
      }
    }
  } catch (error) {
    if(error.name === 'ValidationError') {
			const messages = Object.values(error.errors).map(element => element.message);
			return res.status(400).json({
				success: false,
				errorMessage: messages
			})
		} else {
			return res.status(500).json({
				success: false,
				errorMessage: 'Server Error'
			})
		}
  }
}

// @description update a user
// @route PUT /api/users/:id

exports.editUser = async (req, res) => {
  try {
    let edit = {}
    edit.email = req.body.email
    edit.name = req.body.name
    edit.number = req.body.number
    edit.updatedAt = Date.now()

    await User.findOneAndUpdate({email: req.body.email}, { $set: edit }, { new: true }, function(err, update) {
			if(err) {
				return res.status(404).json({
					success: false,
          errorMessage: 'The document you are looking for is deleted or never existed',
          error: err
				})
      } else {
        res.status(200).json({
          success: true,
          count: update.length,
          data: update
        })
      }
    })
  } catch (error) {
    return res.status(500).json({
			success: false,
			errorMessage: error.message
		})
  }
}

// @description get all users
// @route GET /api/users/

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json({
      success: true,
      data: users
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      errorMessage: 'Server error'
    })
  }
}
