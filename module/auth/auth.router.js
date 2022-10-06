import {Router} from 'express'
import { signin, signUp } from './controller/auth.js'
const router = Router()

router.post('/signup',signUp)
router.post('/signin',signin)
export default router
