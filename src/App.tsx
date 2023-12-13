import './App.scss';
import { Contacts } from './components/Contacts';
import { Header } from './components/Header';
import { Projects } from './components/Projects';

function App() {
  return (
    <>
      <Header />
      <Contacts />
      <Projects />
    </>
  );
}

export default App;
