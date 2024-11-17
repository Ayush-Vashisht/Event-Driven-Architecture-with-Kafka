import mongoose from 'mongoose';

interface Post{
    title:string;
    content:string;
}

const postSchema = new mongoose.Schema<Post>({
    title:{
        type:'string',
        require:true,
    },
    content:{
        type:'string',
        require:true,
    }
})

const PostModel = mongoose.model('Post', postSchema);
export default PostModel;