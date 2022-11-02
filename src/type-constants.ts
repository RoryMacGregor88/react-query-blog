type Post = {
  id: string;
  authorId: string;
  title: string;
  date: string;
  body: string;
};

type User = {
  id: string;
  username: string;
  email: string;
};

export type { Post, User };
