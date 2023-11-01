import {Router} from 'express';
import * as userCtrl from '../controllers/user.controller'
const router = Router();


router.get('/users', userCtrl.getUsers )
router.get('/users/:id', userCtrl.getUser )
router.delete('/users/:id', userCtrl.deleteUser )
router.put('/users/:id', userCtrl.updateUser )

export default router; 