import { FC, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '~/i18n/language-switcher.component';
import { ThemeSwitcher } from '~/theme/theme-switcher.component';

const Header: FC = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <header className="header flex justify-between p-10">
      <h1 className="font-bold">{t('greeting')} User</h1>

      <span className="flex items-center justify-between">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </span>
    </header>
  );
};

export default Header;
