import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { LoginScreen } from '../components/auth/LoginScreen';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={ <LoginScreen/> } />
        <Route exact path="/" element={ <CalendarScreen/> } />
        <Route path='*' element={ <Navigate replace to='/' />}/>
      </Routes>
    </Router>
  )
}
