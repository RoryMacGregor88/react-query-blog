import { FC, ReactElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PostsView } from '~/components';
import { Footer, Header } from '~/layout';

const App: FC = (): ReactElement => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="grow">
          <PostsView />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default App;
