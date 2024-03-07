import express from 'express';
import register from '../controllers/registerController.js';
import login from '../controllers/loginController.js';
import logout from '../controllers/logoutController.js';
import  verifyUser  from '../middlewares/verifyUser.js';
import homeController from '../controllers/homeController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/', verifyUser, homeController);


export default router;
