import './App.scss';
import { Contacts } from './components/Contacts';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Projects } from './components/Projects';

function App() {
  return (
    <>
      <Header />
      <Contacts />
      <Projects />
      <Footer />
    </>
  );
}

export default App;
