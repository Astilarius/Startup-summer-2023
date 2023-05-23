import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainScreen from './MainScreen/MainScreen'
import './index.css'
import VacancyScreen from './VacancyScreen/VacancyScreen';
import Template from './Template/Template';

export interface MainScreenProps{
  isFavourite:boolean,
}

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <Template>
      <MainScreen {...{isFavourite:false}} />
    </Template>,
  },
  {
    path: "favourite/",
    element: 
    <Template>
      <MainScreen {...{isFavourite:true}}/>
    </Template>,
  },
  {
    path: "vacancy/",
    element: 
    <Template>
      <VacancyScreen />
    </Template>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)