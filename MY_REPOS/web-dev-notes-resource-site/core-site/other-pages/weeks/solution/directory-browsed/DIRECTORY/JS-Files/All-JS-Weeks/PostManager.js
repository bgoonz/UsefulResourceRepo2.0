import PostsList from './PostsList';
import PostInput from './PostInput';

const PostManager = ({ postAdd, posts, postsFetch }) => {
  return (
    <>
      <PostsList posts={posts} postsFetch={postsFetch} />
      <PostInput postAdd={postAdd} />
    </>
  );
};
export default PostManager;
