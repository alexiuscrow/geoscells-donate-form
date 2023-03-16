import style from './Loader.module.scss';
import {useTranslation} from 'react-i18next';

const Loader = () => {
  const {t} = useTranslation();
  const wordsJsx = [...t('creditCardDonation.loadingTitle')].map((word, i) => <span key={`${word}-${i}`}>{word}</span>);
  return (
    <div className={style.container}>
      <h1>{wordsJsx}</h1>
    </div>
  );
};

Loader.propTypes = {};

export default Loader;
