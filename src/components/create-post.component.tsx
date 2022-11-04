import { Dispatch, FC, ReactElement, SetStateAction } from 'react';

import { PostForm } from '~/components';
import { User } from '~/hooks';

type Props = {
  currentUser: User | null;
  setWellData: Dispatch<SetStateAction<{ error?: boolean; message: string } | null>>;
};

const CreatePost: FC<Props> = ({ currentUser, setWellData }): ReactElement => (
  <PostForm currentUser={currentUser} setWellData={setWellData} />
);
export default CreatePost;
