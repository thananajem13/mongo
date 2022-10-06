
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userModel } from '../../../DB/model/user.js'
export const signUp = async (req, res) => {
    try {
        const { password, cpassword, email, firstname, lastname } = req.body
        if (cpassword === password) {
            const user = await userModel.findOne({ email })
            console.log(user);
            if (user) {
                res.json({ message: "email Exist", user })
            } else {
                const hashedPass = await bcrypt.hash(password, parseInt(process.env.saltRound))
                const newUser = new userModel({ password: hashedPass, email, firstname, lastname })
                const savedUser = await newUser.save()
                savedUser ? res.json({ message: "Done", savedUser }) : res.json({ message: "" })
            }
        }
        else {
            res.json("missmatch password with cpassword")
        }

    } catch (error) {
        res.json({ message: "catch error", error })
    }



}
export const signin = async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email,isDeleted:false })
    if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            const token = jwt.sign({ id: user.id }, process.env.tokenSigniture,/** exipresIn:'1h' * or ** exipresIn:'60' */)
            res.json({ message: "Done", token })
        } else {
            res.json({ message: "in-valid data", user })
        }

    }
    else {
        res.json({ message: "in-valid data", user })
    }
}