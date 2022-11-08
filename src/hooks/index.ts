import { useMutatePosts } from '~/hooks/posts/use-mutate-posts';
import { postSchema, usePost } from '~/hooks/posts/use-post';
import { postArraySchema, usePosts } from '~/hooks/posts/use-posts';
import { useUser, userSchema } from '~/hooks/users/use-user';
import { useUserAndPosts } from '~/hooks/users/use-user-and-posts';
import { useUsers, userArraySchema } from '~/hooks/users/use-users';

// hooks
export { usePost, usePosts, useUsers, useUser, useUserAndPosts, useMutatePosts };

//schemas
export { userSchema, userArraySchema, postSchema, postArraySchema };

// types
export type { Post } from '~/hooks/posts/use-post';
export type { User } from '~/hooks/users/use-user';
