import { FC, ReactElement } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';

import { FullPost, PostForm, PostsList, UserProfile } from '~/components';
import { Footer, Header } from '~/layout';
import { User } from '~/type-constants';
import { handleServerError } from '~/utils';

const currentUserId = 1;

const App: FC = (): ReactElement => {
  const {
    isLoading,
    error,
    data: currentUser,
    isFetching,
  } = useQuery(['users', currentUserId], async () => {
    try {
      const res = await fetch(`/api/users/${currentUserId}`);
      const currentUser: User = await res.json();
      return currentUser;
    } catch (e) {
      await handleServerError(e as Error);
    }
  });

  if (isLoading || isFetching) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>ERROR!</h1>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header currentUser={currentUser} />
      <main className="grow">
        <Routes>
          <Route element={<PostForm />} path="/" />
          <Route element={<PostsList />} path="/posts" />
          <Route element={<FullPost currentUser={currentUser} />} path="/posts/:id" />
          <Route element={<UserProfile currentUser={currentUser} />} path="/users/:id" />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
