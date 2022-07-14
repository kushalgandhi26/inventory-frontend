import Modal from "../components/Modal";
import Productview from "../components/Productview";

export default function Home({products,openmodal,setopenmodal,update,setupdate}) {
  return (
    <>
    {openmodal && <Modal setopenmodal={setopenmodal} update={update} setupdate={setupdate}/>}
    <div className="flex flex-wrap p-4">
      {products.map((p) => {
        return(
          <Productview key={p.id} product={p} setupdate={setupdate}/>
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