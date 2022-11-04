import { useUpdatePost } from '~/hooks/posts/update-post';
import { postSchema, usePost } from '~/hooks/posts/use-post';
import { postArraySchema, usePosts } from '~/hooks/posts/use-posts';
import { useUser, userSchema } from '~/hooks/users/use-user';
import { useUsers, userArraySchema } from '~/hooks/users/use-users';

import { useUserAndPosts } from './users/use-user-and-posts';

// hooks
export { usePosts, usePost, useUsers, useUser, useUserAndPosts, useUpdatePost };

//schemas
export { userSchema, userArraySchema, postSchema, postArraySchema };

// types
export type { Post } from '~/hooks/posts/use-post';
export type { User } from '~/hooks/users/use-user';
