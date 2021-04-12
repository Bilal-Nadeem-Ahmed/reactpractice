
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import './App.css';
import Application from './components/application';
import Buttons from './components/Button';
import Deviders from './components/Deviders';
import Icons from './components/Icons';
import Layouts from './components/layout';

function App() {
  const notes = [
    {
      id: 1,
      content: 'HTML is easy',
      date: '2019-05-30T17:30:31.098Z',
      important: true
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      date: '2019-05-30T18:39:34.091Z',
      important: false
    },
    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      date: '2019-05-30T19:20:14.298Z',
      important: true
    }
  ]
  
  return (
    <div className="App">
      {/* <Layouts/>
      <h1>antd practice</h1>
      <Buttons/>
      <Icons/>
      <Deviders/> */}
      <Application notes={notes}/>
    </div>
  )
}

export default App;
