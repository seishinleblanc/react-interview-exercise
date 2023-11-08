import Header from '@components/Header'
import Home from '@components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
   
    <div className="App">
      <Header />
        <Home /> 
    </div>
    
  )
}

export default App
