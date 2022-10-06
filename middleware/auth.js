import jwt from 'jsonwebtoken'
import { userModel } from '../DB/model/user.js'
export const auth = ()=>{
    return async (req, res, next) => {
        const { authorization } = req.headers
        if (authorization.startsWith(process.env.bearerKey)) {
            const myToken = authorization.split(" ")[1]
            const decoded = jwt.verify(myToken, process.env.tokenSigniture)
            if (decoded.id) {
                const user = await userModel.findById(decoded.id)
                // res.json({ message: "Done", user })
                if (user) {
                    req.user = user
                    next()
                } else {
                    res.json({
                        message: "invalid token user"
                    })
                }
            } else {
                res.json({ message: "invalid token payload" })
            }
    
        }
        else {
            res.json({ message: "invalid bearer key" })
        }
    
    }
}
