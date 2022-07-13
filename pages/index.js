import Productview from "../components/Productview";

export default function Home({products}) {
  return (
    <div className="flex flex-wrap p-4">
      {products.map((p) => {
        return(
          <Productview title={p.title} image={p.image} creator={p.createduser}/>
        )
      })}
    </div>
  )
}

export async function getServerSideProps(context) {
  let a = await fetch(`${process.env.NEXT_BACKEND_URL}/product/products`);
  let products = await a.json()
  return {
    props: { products: products },
  }
}