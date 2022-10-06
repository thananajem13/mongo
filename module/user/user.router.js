import {Router} from 'express'
import { auth } from '../../middleware/auth.js'
import { deleteUser, getUsers,   softDelete,  updateUser } from './controller/user.js'
const router = Router()

router.get('/',getUsers)

router.patch('/',auth(),updateUser)
router.delete('/',auth(),deleteUser) 
router.patch('/:id',auth(),softDelete)
export default router