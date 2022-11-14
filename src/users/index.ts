import { useUser, userSchema } from '~/users/hooks/use-user';
import { useUserAndPosts } from '~/users/hooks/use-user-and-posts';
import { useUsers, userArraySchema } from '~/users/hooks/use-users';

// hooks
export { useUsers, useUser, useUserAndPosts };

//schemas
export { userSchema, userArraySchema };

// types
export type { User } from '~/users/hooks/use-user';