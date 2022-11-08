import { FC, ReactElement, useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import { CreatePost, EditPostForm, FullPost, Landing, LoadingScreen, PostsList, UserProfile, Well } from '~/components';
import { useUser } from '~/hooks';
import { Footer, Header } from '~/layout';

//hardcoded as no real tokens used
const currentUserId = '1';

const App: FC = (): ReactElement | null => {
  const { error, data: user, isLoading, isFetching } = useUser(currentUserId);

  const [wellData, setWellData] = useState<{ error?: boolean; message: string } | null>(null);

  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }

  if (error) {
    setWellData({ error: true, message: 'Error fetching user.' });
  }

  const currentUser = user ?? null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header currentUser={currentUser} />
      {wellData ? <Well close={() => setWellData(null)} error={false} message="Something went wrong." /> : null}
      <main className="grow">
        <Routes>
          <Route element={<Landing currentUser={currentUser} />} path="/" />
          <Route element={<CreatePost currentUser={currentUser} setWellData={setWellData} />} path="/new" />
          <Route element={<PostsList currentUser={currentUser} />} path="/posts" />
          <Route element={<FullPost currentUser={currentUser} />} path="/posts/:id" />
          <Route
            element={<EditPostForm currentUser={currentUser} setWellData={setWellData} />}
            path="/posts/:id/edit"
          />
          <Route element={<UserProfile currentUser={currentUser} />} path="/users/:id" />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
