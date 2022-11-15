import { FC, ReactElement, useState } from 'react';

import { Route, Routes, Link } from 'react-router-dom';

import { Landing, SidePanel, Well, Button } from '~/components';
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

  if (!currentUser) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header currentUser={currentUser} />
      <main className="flex grow w-full">
        <div className='flex grow w-full'>
          <SidePanel>
            <div className='flex gap-2'>
              <Link to='/'>
                <Button>Go Home</Button>
              </Link>
              <Link to='/posts'>
                <Button>All Posts</Button>
              </Link>
            </div>
          </SidePanel>
          <div className='flex flex-col grow justify-center items-center w-full'>
            {wellData ? <Well close={() => setWellData(null)} {...wellData} /> : null}
            <Routes>
              <Route element={<Landing currentUser={currentUser} />} path="/" />
              <Route element={<CreatePost currentUser={currentUser} setWellData={setWellData} />} path="/new" />
              <Route element={<Posts currentUser={currentUser} setWellData={setWellData} />} path="/posts" />
              <Route element={<FullPost currentUser={currentUser} setWellData={setWellData} />} path="/posts/:id" />
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
};

export default App;
