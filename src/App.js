import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
  return (
      <div className="app">
          <RouterProvider router={router}>

          </RouterProvider>

     
    </div>
  );
}

export default App;
