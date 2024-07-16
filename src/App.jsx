import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MoviesList } from './pages/MoviesList'
import { NotFound } from './pages/NotFound'
import './App'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MoviesList/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
