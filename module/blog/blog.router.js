import {Router} from 'express'
import { auth } from '../../middleware/auth.js'
import { addBlog, deleteBlog, getBlogByID, getBlogs, updateBlog } from './controller/blog.js'
const router = Router()
router.post('/',auth(),addBlog)
router.get('/',getBlogs)
router.get('/:id',getBlogByID)
router.put('/:blogId',auth(),updateBlog)
router.delete('/:blogId',auth(),deleteBlog)

export default router