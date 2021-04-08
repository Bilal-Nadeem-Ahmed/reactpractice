
import './App.css';
import Buttons from './components/Button';
import Deviders from './components/Deviders';
import Icons from './components/Icons';
import Layouts from './components/layout';

function App() {
  return (
    <div className="App">
      <Layouts/>
      <h1>antd practice</h1>
      <Buttons/>
      <Icons/>
      <Deviders/>
    </div>
  )
}

export default App;
