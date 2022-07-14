import { useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [openmodal, setopenmodal] = useState(false)
  const [update, setupdate] = useState({visible:false,id:null})
  return <>
    <Navbar openmodal={openmodal} setopenmodal={setopenmodal} update={update} setupdate={setupdate}/>
    <Component openmodal={openmodal} setopenmodal={setopenmodal} update={update} setupdate={setupdate} {...pageProps} />
  </>
}

export default MyApp
