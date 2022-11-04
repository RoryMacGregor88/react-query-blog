import { Dispatch, FC, ReactElement, SetStateAction } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { DATE_FORMAT } from '~/constants';
import { Post, User, useUpdatePost } from '~/hooks';

const postSchema = zod.object({
  title: zod.string(),
  body: zod.string(),
});

type PostSchemaType = zod.infer<typeof postSchema>;

type Props = {
  currentUser: User | null;
  setWellData: Dispatch<SetStateAction<{ error?: boolean; message: string } | null>>;
  postToEdit?: Post | null;
};

const PostForm: FC<Props> = ({ currentUser, setWellData, postToEdit = null }): ReactElement | null => {
  const { isLoading, isError, isSuccess, mutateAsync } = useUpdatePost('/posts');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<PostSchemaType>({
    defaultValues: {
      title: postToEdit?.title ?? '',
      body: postToEdit?.body ?? '',
    },
    mode: 'all',
    resolver: zodResolver(postSchema),
  });

  if (!currentUser) {
    return null;
  }

  const onSubmit: SubmitHandler<FieldValues> = (values): void => {
    const { title, body } = values;

    const id = postToEdit?.id ?? Math.floor(Math.random() * 100).toString(),
      date = postToEdit?.date ?? format(new Date(), DATE_FORMAT);

    const newPost: Post = {
      id,
      authorId: currentUser?.id,
      title,
      body,
      date,
    };

    mutateAsync(newPost);
  };

  if (isLoading) console.log('isLoading');

  if (isSuccess) {
    setWellData({ message: 'Successfully updated post.' });
  }

  if (isError) {
    setWellData({ error: true, message: 'There was an error updating the post.' });
  }

  const inputStyles = { padding: '0.5rem', borderRadius: '5px', color: '#000', width: '100%' };

  const isDisabled: boolean = !isDirty || !!Object.keys(errors).length;

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
        <span style={{ color: 'red' }}>{errors.title?.message ?? ''}</span>
        <textarea placeholder="body" rows={5} style={inputStyles} {...register('body')} />
        <span style={{ color: 'red' }}>{errors.body?.message ?? ''}</span>
        <button
          disabled={isDisabled}
          style={{ backgroundColor: '#FF9900', padding: '0.5rem 1rem', borderRadius: '5px', color: '#000' }}
          type="submit"
        >
          {postToEdit ? 'Edit' : 'Create'} Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
