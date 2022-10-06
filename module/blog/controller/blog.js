import { blogModel } from "../../../DB/model/blog.js"
export const addBlog = async (req, res) => {
    try {
        const { title, desc,price } = req.body
        const newBlog = new blogModel({ title, desc,price,userId:req.user._id })
        const savedBlog = await newBlog.save()
        savedBlog ? res.json({ message: "Done", savedBlog }) : res.json({ message: "error", savedBlog })
    } catch (error) {
        res.json({ message: "catch error", error })
    }

}

export  const updateBlog = async (req,res)=>{
    const {title,desc} = req.body
    const {blogId} = req.params
    const updateBlog = await blogModel.findOneAndUpdate({_id:blogId,userId:req.user._id},{title,desc},{new:true})
    updateBlog?res.json({message:"Done",updateBlog}):res.json({message:"invalid blog id or error in auth"})
}

export  const deleteBlog = async (req,res)=>{ 
    const {blogId} = req.params
    const deleteBlog = await blogModel.deleteOne({_id:blogId,userId:req.user._id} )
    deleteBlog.deletedCount?res.json({message:"Done",deleteBlog}):res.json({message:"invalid blog id or error in auth",deleteBlog})
}
export const getBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate([
            {
                path: 'userId',
                select: "email firstname lastname"
            }
        ])
        blogs.length ? res.json({ message: "Done", blogs }) : res.json({ message: "no blogs found", blogs })
    } catch (error) {
        res.json({ message: "catch error", error })
    }

}
/** */

/*search point solution */
export const getBlogByID = async (req,res)=>{
    const {id}=req.params
    const blogById = await blogModel.findById({_id:id})
    .populate([
        {
            path: 'userId',
            select: "email firstname lastname"
        }
    ]) 
    blogById?res.json({message:"Done",blogById}):res.json({message:"invalid id",blogById})
}


 