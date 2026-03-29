import 'tailwindcss'
import './Home.css'
import { useState } from 'react'
import Navbar from './Navbar.jsx'

function Home() {

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/for_me" element={<For_Me />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
      <Navbar/>
      <h1>Hello Contacts!</h1>
    </>
  )

}

export default Home
