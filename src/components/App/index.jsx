import style from './App.module.scss';
import './global.scss';
import DonateForm from '../DonateForm';
import '../../i18n';
import '../../styles/global.scss'

const App = () => {
  return (
    <div className={style.container}>
      <DonateForm />
    </div>
  );
};

App.propTypes = {};

export default App;
