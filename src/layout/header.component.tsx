import { FC, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { AddPostButton } from '~/components';
import { User } from '~/users';
import { LanguageSwitcher } from '~/i18n/language-switcher.component';
import { ThemeSwitcher } from '~/theme/theme-switcher.component';

interface Props {
  currentUser: User | null;
};

const Header: FC<Props> = ({ currentUser }): ReactElement => {
  const { t } = useTranslation();

  return (
    <header className="header flex justify-between p-10">
      <h1 className="font-bold">
        {!currentUser ? `${t('greeting')} Visitor` : `${t('welcomeBack')}, ${currentUser?.username}`}
      </h1>

      <span className="flex items-center justify-between gap-3">
        <AddPostButton />
        <ThemeSwitcher />
        <LanguageSwitcher />
      </span>
    </header>
  );
};

export default Header;
