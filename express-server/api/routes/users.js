const express = require('express');
const router = express.Router();

const { addUser, getUsers, editUser } = require('../controllers/users')

router.route('/').get(getUsers);
router.route('/:id').put(editUser)
router.route('/add').post(addUser);

module.exports = router;
