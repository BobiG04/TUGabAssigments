import 'tailwindcss'
import './Home.css'
import { useState } from 'react'
import Navbar from './Navbar.jsx'

function For_Me() {

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/for_me" element={<For_Me />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
      <Navbar/>
      <h1>Hello World!</h1>
    </>
  );

}

export default For_Me
