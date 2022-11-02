import { FC, ReactElement } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

const user = { id: 2 };

const postSchema = zod.object({
  title: zod.string(),
  body: zod.string(),
});

type PostSchemaType = zod.infer<typeof postSchema>;

const PostForm: FC = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (values): void => {
    const { title, body } = values;

    const post = {
      author: user.id,
      title,
      body,
      date: format(new Date(), 'MMMM do, uuuu'),
    };

    console.log('POST: ', post);
  };

  console.log('errors: ', errors);

  const inputStyles = { padding: '0.5rem', borderRadius: '5px', color: '#000' };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '2rem',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 style={{ fontSize: '2rem' }}>Create a new post:</h2>
      <input placeholder="Title" style={inputStyles} {...register('title')} />
      <input placeholder="body" style={inputStyles} type="textarea" {...register('body')} />
      <button
        style={{ backgroundColor: '#FF9900', padding: '0.5rem 1rem', borderRadius: '5px', color: '#000' }}
        type="submit"
      >
        Create Post
      </button>
    </form>
  );
};

export default PostForm;
