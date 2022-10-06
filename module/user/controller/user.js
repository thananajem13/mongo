import { userModel } from "../../../DB/model/user.js"
 
export const updateUser = async (req, res) => {
    const id = req.user._id
    const { age, phone } = req.body
    const updatedUser = await userModel.findOneAndUpdate({ _id: id, isDeleted: false }, { age, phone }, { new: true })
    updatedUser ? res.json({ message: "Done", updatedUser }) : res.json({ message: "in-valid id or userDeleted ", updatedUser })
}
export const deleteUser = async (req, res) => {
    const id = req.user._id
    const deletedUser = await userModel.deleteOne({ _id: id })
    // const deletedUser = await userModel.deleteOne({ _id: id, isDeleted: false })
    deletedUser.deletedCount ? res.json({ message: "Done", deletedUser }) : res.json({ message: "invalid-id", deletedUser })
}
export const getUsers = async (req, res, next) => {
    const result = await userModel.find({ isDeleted: false })
    result.length ? res.json({ message: "Done", result }) : res.json({ message: "no users", result })

}
export const softDelete = async (req, res, next) => {      
    const { id } = req.params 
    const updateDeleteStatus =await userModel.findOneAndUpdate({ _id: id, isDeleted: false},{isDeleted:true},{new:true})
    updateDeleteStatus ? res.json({ message: "Done", updateDeleteStatus }) : res.json({ message: "invalid id", updateDeleteStatus })
}
/** */




 