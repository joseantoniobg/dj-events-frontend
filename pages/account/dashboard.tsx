import Layout from '@components/Layout'
import { deleteEvent, parseCookies } from '@helpers/helpers'
import { api } from '@config/index';
import styles from '@styles/Dashboard.module.scss'
import DashboardEvent from '@components/DashboardEvent';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function DashboardPage({ events, token }) {
  const r = useRouter();

 const deleteEvt = async (id, token) => {
    try {
     await deleteEvent(id, token);
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        <ToastContainer />
        {events.map(event => (<DashboardEvent key={event.id} evt={event} handleDelete={deleteEvt} token={token} />))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({req}) {
  const {token} = parseCookies(req);

  const res = await api.get('events/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

  return {
    props: {
      events: res.data,
      token
    }
  }
}