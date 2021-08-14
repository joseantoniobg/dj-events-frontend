import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Layout from '@components/Layout';
import { API_URL, api } from '@config/index';
import styles from "@styles/Event.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import { getDateAsStringDDMMYYYY, parseCookies } from '../../helpers/helpers';
import AuthContext from "@context/AuthContext";
import { useContext } from 'react';
import { deleteEvent } from "../../helpers/helpers";

export default function EventPage({event, token}) {
  const r = useRouter()
  const { user } = useContext(AuthContext);

  const deleteEvt = async (id, token) => {
    try {
     await deleteEvent(id, token);
    } catch (e) {
      toast.error(e.message);
    }
    r.push('/events');
  }

  return (
    <Layout title={event.name}>
     <div className={styles.event}>
       {event.user.username === (user ? user.username : '') && <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={() => deleteEvt(event.id, token)}>
            <FaTimes /> Delete Event
          </a>
        </div>}
        <span className={styles.span}>
          {getDateAsStringDDMMYYYY(event.date)} at {event.time}
        </span>
        <h1>{event.name}</h1>
        <ToastContainer />
        {console.log(event.image)}
        {event.image && (<div className={styles.image}><Image src={event.image.formats.small.url} width={960}
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

export const getServerSideProps = async ({ params: { slug }, req }) => {
  const data = await fetch(`${API_URL}events?slug=${slug}`)
  const event = await data.json()
  const {token} = parseCookies(req);
  return { props: { event: event[0], token } }
}

// export const getServerSideProps = async ({ query: { slug } }) => {
//   const data = await fetch(`${API_URL}api/events/${slug}`)
//   const event = await data.json()
//   return { props: { event } }
// }