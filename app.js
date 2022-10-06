import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { connDB } from './DB/connection.js'
import {userRouter,blogRouter,authRouter} from './module/index.router.js'
const port = 5000
const baseUrl = '/api/v1'
const app = express()
app.use(express.json())
connDB()
app.use(`${baseUrl}/auth`,authRouter)
app.use(`${baseUrl}/user`,userRouter)
app.use(`${baseUrl}/blog`,blogRouter)
app.use('*',(req,res,next)=>{res.json({message:'invalid router'})})
app.listen(port ,()=>{console.log(`server is running ar port ${port} ... `);})
 