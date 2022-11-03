import { FC, ReactElement, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { Post, User } from '~/type-constants';
import { handleServerError } from '~/utils';

const postSchema = zod.object({
  title: zod.string(),
  body: zod.string(),
});

type PostSchemaType = zod.infer<typeof postSchema>;

type Props = {
  currentUser: User | undefined;
};

const PostForm: FC<Props> = ({ currentUser }): ReactElement | null => {
  const queryClient = useQueryClient();

  const [redirect, setRedirect] = useState(null);

  const { isLoading, isError, isSuccess, mutateAsync } = useMutation({
    mutationFn: async (post: Post): Promise<Post[] | void> => {
      try {
        const res = await fetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const updatedPosts: Post[] = await res.json();
        return updatedPosts;
      } catch (e) {
        return await handleServerError(e as Error);
      }
    },
    onSuccess: result => {
      console.log('result: ', result);
      queryClient.invalidateQueries(['posts']);
      setRedirect('/posts');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(postSchema),
  });

  if (!currentUser) {
    return null;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const onSubmit: SubmitHandler<FieldValues> = (values): void => {
    const { title, body } = values;

    const id = Math.floor(Math.random() * 100).toString(),
      date = format(new Date(), 'MMMM do, uuuu');

    const newPost: Post = {
      id,
      authorId: currentUser?.id,
      title,
      body,
      date,
    };

    console.log('POST: ', newPost);

    mutateAsync(newPost);
  };

  if (isLoading) console.log('isLoading');
  if (isSuccess) console.log('isSuccess');
  if (isError) console.log('isError');

  const inputStyles = { padding: '0.5rem', borderRadius: '5px', color: '#000', width: '100%' };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '2rem',
          width: '25%',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 style={{ fontSize: '2rem' }}>Create a new post:</h2>
        <input placeholder="Title" style={inputStyles} {...register('title')} />
        <textarea placeholder="body" rows={5} style={inputStyles} {...register('body')} />
        <button
          style={{ backgroundColor: '#FF9900', padding: '0.5rem 1rem', borderRadius: '5px', color: '#000' }}
          type="submit"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
