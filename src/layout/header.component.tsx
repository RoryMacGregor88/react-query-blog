import { FC, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '~/i18n/language-switcher.component';
import { ThemeSwitcher } from '~/theme/theme-switcher.component';
import { User } from '~/type-constants';

type Props = {
  currentUser: User | undefined;
};

const Header: FC<Props> = ({ currentUser }): ReactElement => {
  const { t } = useTranslation();

  return (
    <header className="header flex justify-between p-10">
      <h1 className="font-bold">
        {!currentUser ? `${t('greeting')} Visitor` : `${t('welcomeBack')}, ${currentUser?.username}`}
      </h1>

      {/* // TODO: add `View your posts` if logged in */}

      <span className="flex items-center justify-between">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </span>
    </header>
  );
};

export default Header;
