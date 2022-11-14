import Posts from '~/posts/components/posts.component'
import PostForm from '~/posts/components/post-form.component';
import PostPreview from '~/posts/components/post-preview.component';
import PostsList from '~/posts/components/posts-list.component';
import EditPost from '~/posts/components/edit-post.component';
import FullPost from '~/posts/components/full-post.component';
import CreatePost from '~/posts/components/create-post.component';

import { postSchema, usePost } from '~/posts/hooks/use-post';
import { postArraySchema, usePosts } from '~/posts/hooks/use-posts';

import { useCreatePost } from '~/posts/hooks/use-create-post';
import { useDeletePost } from '~/posts/hooks/use-delete-post';
import { useUpdatePost } from '~/posts/hooks/use-update-post';
import { useUserPosts } from '~/posts/hooks/use-user-posts'

// hooks
export { usePost, usePosts, useCreatePost, useUpdatePost, useDeletePost, useUserPosts };

//schemas
export { postSchema, postArraySchema };

// types
export type { Post } from '~/posts/hooks/use-post';

// components
export {
  Posts,
  PostsList,
  PostPreview, 
  FullPost,
  PostForm,
  EditPost,
  CreatePost
}