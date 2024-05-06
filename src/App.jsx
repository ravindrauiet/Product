
import { Footer, Navbar } from './pages/layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { Products } from './pages/Products'

function App() {

  return (
     <>
       <BrowserRouter >
       <Navbar/>
       <Routes>
         <Route path="/home" element={<Home />} />
         <Route path="/" element={<Products />} />
       </Routes>
       <Footer/>
       </BrowserRouter>
     
   

    </>
  )
}

export default App
