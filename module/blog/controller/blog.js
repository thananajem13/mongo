import { blogModel } from "../../../DB/model/blog.js"
import { userModel } from "../../../DB/model/user.js"
export const addBlog = async (req, res) => {
    try {
        const user =await userModel.findOne({$and:[{_id:req.user._id},{isDeleted:false}]})
        console.log(user);
        
        if(user){
             const { title, desc, price } = req.body
        const newBlog = new blogModel({ title, desc, price, userId: req.user._id })
        const savedBlog = await newBlog.save()
        savedBlog ? res.json({ message: "Done", savedBlog }) : res.json({ message: "error", savedBlog })
        }
       else{
        res.json({message:"you are deleted user, you can't add any blogs"})
       }
    } catch (error) {
        res.json({ message: "catch error", error })
    }

}

export const updateBlog = async (req, res) => {
    try {
        const user =await userModel.findOne({$and:[{_id:req.user._id},{isDeleted:false}]})
    if(user){
        const { title, desc } = req.body
    const { blogId } = req.params
    const updateBlog = await blogModel.findOneAndUpdate({ _id: blogId, userId: req.user._id }, { title, desc }, { new: true })
    updateBlog ? res.json({ message: "Done", updateBlog }) : res.json({ message: "invalid blog id or error in auth" })
    }
    else{
        res.json({message:"you are deleted user, you can't add any blogs"})
    }
    } catch (error) {
        res.json({message:"catch error",error})
    }
    
    
}

export const deleteBlog = async (req, res) => {
    try {
         const user =await userModel.findOne({$and:[{_id:req.user._id},{isDeleted:false}]})
    if(user){
        const { blogId } = req.params
    const deleteBlog = await blogModel.deleteOne({ _id: blogId, userId: req.user._id })
    deleteBlog.deletedCount ? res.json({ message: "Done", deleteBlog }) : res.json({ message: "invalid blog id or error in auth", deleteBlog })
    }
    else{
        res.json({message:"you are deleted user, you can't add any blogs"})
    }
    } catch (error) {
        res.json({message:"catch error",error})
    }
   
    
}
export const getBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({})
        .populate([
            {
                path: 'userId',  
                select: "email firstname lastname isDeleted", 
                match:   { isDeleted: false }  ,
                 
                   }
        ]) 
        // blogs?.length ? res.json({ message: "Done", blogs }) : res.json({ message: "no blogs found", blogs }) 
       const result = blogs.filter((blog)=>{return blog.userId !=null})
        result?.length ? res.json({ message: "Done", blogs:result }) : res.json({ message: "no blogs found", blogs:result })
    }
     catch (error) {
        res.json({ message: "catch error", error })
    }

}
/** */

/*search point solution */
export const getBlogDependOnCondition = async (req, res) => {
    try {
        const blogById = await blogModel.find({ price: { $gte: 15 },userId:req.user._id })
        .populate([
            {
                path: 'userId',   
                select: { email:1, firstname:1, lastname:1, isDeleted:1 },
                match:{isDeleted:false}       
            }
        ])
       blogById?.length? res.json({ message: "Done", blogs:blogById }):res.json({message:"no blogs found",blogs:blogById})
        // const result = blogById.filter((blog)=>{return blog.userId !=null})
         
       

        // result?.length ? res.json({ message: "Done", blogs:result }) : res.json({ message: "no blogs found", blogs:result })
    } catch (error) {
        
    }
     
    }


