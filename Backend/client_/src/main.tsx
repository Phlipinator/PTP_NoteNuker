import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./Layout.jsx";
import Quiz from "./Quiz.tsx";
import PastQuizzes from "./PastQuizzes.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render( //creates whole react stuff at root div in index.html
  <React.StrictMode>
    {/*<App />*/}
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={<App/>}/>
                  <Route path="quiz" element={<Quiz/>}/>
                  <Route path="past-quizzes" element={<PastQuizzes/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
