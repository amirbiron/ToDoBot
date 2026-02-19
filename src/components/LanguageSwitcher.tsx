import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'he' ? 'en' : 'he';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="absolute top-4 left-4 rtl:left-auto rtl:right-4 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
    >
      {i18n.language === 'he' ? 'English' : 'עברית'}
    </button>
  );
}
