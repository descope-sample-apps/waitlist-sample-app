import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    )
}


export default App;