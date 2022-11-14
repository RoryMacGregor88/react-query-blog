import { FC, ReactElement, useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Landing, SidePanel, Well } from '~/components';
import { CreatePost, EditPost, FullPost, Posts } from '~/posts'
import { useUser } from '~/users'
import { WellData } from '~/types';
import { Footer, Header } from '~/layout';

const currentUserId = 1;

const App: FC = (): ReactElement | null => {
  const { error, data: user } = useUser(Number(currentUserId));

  const [wellData, setWellData] = useState<WellData>(null);

  if (error) {
    setWellData({ isError: true, message: 'Error fetching user.' });
  }

  const currentUser = user ?? null;

  return (
    !currentUser ? null : (
      <div className="flex min-h-screen flex-col">
        <Header currentUser={currentUser} />
        <main className="flex grow w-100">
          <div className='flex grow w-100'>
            <SidePanel>
              <h1>Hello</h1>
            </SidePanel>
            <div className='flex flex-col grow justify-center items-center w-100'>
              {wellData ? <Well close={() => setWellData(null)} { ...wellData } /> : null}
              <Routes>
                <Route element={<Landing currentUser={currentUser} />} path="/" />
                <Route element={<CreatePost currentUser={currentUser} setWellData={setWellData} />} path="/new" />
                <Route element={<Posts currentUser={currentUser} setWellData={setWellData} />} path="/posts" />
                <Route element={<FullPost currentUser={currentUser} />} path="/posts/:id" />
                <Route
                  element={<EditPost currentUser={currentUser} setWellData={setWellData} />}
                  path="/posts/:id/edit"
                />
                <Route element={<Posts currentUser={currentUser} filterByCurrentUser={true} setWellData={setWellData} />} path="/users/:id" />
              </Routes>
            </div>
          </div>
        </main>
        <Footer />
    </div>
    )
  );
};

export default App;
