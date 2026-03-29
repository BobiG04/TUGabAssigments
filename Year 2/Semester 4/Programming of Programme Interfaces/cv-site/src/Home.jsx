import 'tailwindcss'
import './Home.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar.jsx'
import For_Me from './For_Me.jsx'
import Contacts from "./Contacts.jsx"

function Home() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/for_me" element={<For_Me />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>

      <h1>Hello Me!</h1>
    </>
  )

}

export default Home
