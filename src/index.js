import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyles } from './global-styles';
if (localStorage.getItem('CompleteStructure') === null) {
  localStorage.setItem('CompleteStructure', JSON.stringify(
    {
      childNodes: [
        {
          name: "My Files",
          path: [0],
          key: "ghdjm",
          insearch: 0,
          childNodes: [

          ],
          Files: []
        }
      ],
      Files: []
    },


  )
  );
}
if (localStorage.getItem('storedValues') === null) {
  localStorage.setItem('storedValues', JSON.stringify([
    { firstone: "My Files", secondone: [0], type: "Folder" },
  ]));
}

localStorage.setItem('Add_folder', false);
localStorage.setItem('Add_file', false);
localStorage.setItem('currentpath', JSON.stringify([]));
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


