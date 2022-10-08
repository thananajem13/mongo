import {Router} from 'express'
import { auth } from '../../middleware/auth.js'
import { addBlog, deleteBlog, getBlogDependOnCondition, getBlogs, updateBlog } from './controller/blog.js'
const router = Router()
router.post('/',auth(),addBlog)
router.get('/',getBlogs)
router.get('/blogDependOnCond',getBlogDependOnCondition)
router.put('/:blogId',auth(),updateBlog)
router.delete('/:blogId',auth(),deleteBlog)

export default router