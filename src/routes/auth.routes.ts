import {Router} from 'express';
import * as authCtrl from '../controllers/auth.controller'
import {TokenValidation} from '../libs/verifyToken'
const router = Router();

router.post('/signup',authCtrl.signUp)
router.post('/login',authCtrl.logIn)
router.get('/profile',TokenValidation,authCtrl.profile)

export default router; 