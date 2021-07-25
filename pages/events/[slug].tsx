import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import router, { useRouter } from 'next/router';
import Layout from '@components/Layout';
import { API_URL } from '@config/index';
import styles from "@styles/Event.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import { getDateAsStringDDMMYYYY } from '../../helpers/helpers';

export default function EventPage({event}) {
  const r = useRouter()

  const deleteEvent = (e) => {
    console.log('delete');
  }

  return (
    <Layout title={event.name}>
     <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span className={styles.span}>
          {getDateAsStringDDMMYYYY(event.date)} at {event.time}
        </span>
        <h1>{event.name}</h1>
        {event.image && (<div className={styles.image}><Image src={event.image.formats.large.url} width={960}
        height={600} /></div> )}
        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
     </div>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const resp = await fetch(`${API_URL}events`);
  const events = await resp.json();

  const paths = events.map((event) => ({
    params: { slug: event.slug }
  }))

  return {
    paths,
    fallback: false, //fallback indicates if a non supplied path is send in, if we want to check and fetch data we set it to true and if not, set it fo false
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const data = await fetch(`${API_URL}events?slug=${slug}`)
  const event = await data.json()
  return { props: { event: event[0] }, revalidate: 1 }
}

// export const getServerSideProps = async ({ query: { slug } }) => {
//   const data = await fetch(`${API_URL}api/events/${slug}`)
//   const event = await data.json()
//   return { props: { event } }
// }