import express from 'express';

import users from '../controllers/user.js';

import pkg from 'express-validator';
const { check, validationResult } = pkg;

const router = express.Router();

router.get('/', users.onGetAllUsers);
router.post('/',[
    check('firstName').exists(),
    check('lastName').exists(),
    check('type').exists()
],users.onCreateUser);
router.get('/:id',users.onGetUserById);
router.delete('/:id',users.onDeleteUserById);

export default router;