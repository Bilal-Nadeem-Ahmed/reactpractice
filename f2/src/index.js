import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'

axios.get('http://localhost:3001/notes').then(res=>{let notes = res.data ;console.log(notes)})
const promise2 = axios.get('http://localhost3001/foobar')
console.log(promise2)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


