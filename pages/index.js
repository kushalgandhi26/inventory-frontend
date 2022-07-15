import Modal from "../components/Modal";
import Productview from "../components/Productview";
import Head from 'next/head';
import { useRouter } from "next/router";

export default function Home({ products, openmodal, setopenmodal, update, setupdate, loggedIn }) {
  const router = useRouter()
  // if(loggedIn !== undefined && router.)
  
  return (
    <>
      <div className="flex flex-wrap p-4">
      <Head>
        <title>Products</title>
        <link rel="icon" href="https://www.starkode.com/assets/Starkode.Business.Inventory.png" />
      </Head>
        {openmodal && <Modal setopenmodal={setopenmodal} update={update} setupdate={setupdate} loggedIn={loggedIn} />}
        {products.map((p) => {
          return (
            <Productview key={p.id} product={p} setupdate={setupdate} loggedIn={loggedIn} />
          )
        })}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  let a = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/products`);
  let products = await a.json()
  return {
    props: { products: products },
  }
}