import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loggedIn, setloggedIn] = useState(undefined)

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setloggedIn(JSON.parse(localStorage.getItem('user')))
    }
  }, [])

  const [openmodal, setopenmodal] = useState(false)
  const [update, setupdate] = useState({ visible: false, id: null })
  return <>
    <NextNProgress />
    <Navbar openmodal={openmodal} setopenmodal={setopenmodal} update={update} setupdate={setupdate} loggedIn={loggedIn} setloggedIn={setloggedIn} />
    <Component openmodal={openmodal} setopenmodal={setopenmodal} update={update} setupdate={setupdate} loggedIn={loggedIn} setloggedIn={setloggedIn} {...pageProps} />
  </>
}

export default MyApp
