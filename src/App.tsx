import Header from '@components/Header'
import Home from '@components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <Routes>
        <Route path='/react-interview-exercise' element={ <Home /> } />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
