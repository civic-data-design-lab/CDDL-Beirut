import Head from 'next/head'
import dynamic from 'next/dynamic'
import { getAllWorkshops } from '../lib/apiUtils'

const Map = dynamic(() => import('../components/Map'), {
  loading: () => 'Loading...',
  ssr: false,
})
const Explore = ({ workshops }) => {
  return (
    <>
      <Head>
        <title>Explore | Intangible Heritage Atlas</title>
      </Head>
      <div style={{ position: 'absolute', top: 0, left: 0 }}>explore</div>
      <Map workshops={workshops} />
    </>
  )
}

/* Retrieves workshops data from mongodb database */
export async function getServerSideProps() {
  const workshops = await getAllWorkshops()
  return { props: { workshops } }
}

export default Explore
