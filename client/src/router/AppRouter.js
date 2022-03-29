import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { checkJWT } from '../actions/auth';
import { PrivateRoute, PublicRoute } from './routeTypes';

export const AppRouter = () => {

  const { user } = useSelector( state => state.auth )

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( checkJWT() )
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route
          exact
          path='/login'
          element={ 
            <PublicRoute isAuthenticated={!!user} >
              <LoginScreen/> 
            </PublicRoute>
          } 
        />
        <Route
          exact
          path='/*' 
          element={ 
            <PrivateRoute isAuthenticated={!!user} >
              <CalendarScreen />
            </PrivateRoute> 
          }  
        />
      </Routes>
    </Router>
  )
}
