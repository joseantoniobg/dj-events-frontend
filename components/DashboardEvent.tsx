import Link from 'next/link';
import { FaPencilAlt,  FaTimes } from 'react-icons/fa';
import styles from '@styles/DashboardEvent.module.scss';

export default function DashboardEvent({evt, handleDelete, token }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>
          <a>{evt.name}</a>
        </Link>
      </h4>
      <Link href={`events/edit/${evt.slug}`}>
        <a className={styles.edit}>
          <FaPencilAlt /><span>Edit Event</span>
        </a>
      </Link>
      <a href="#" className={styles.delete} onClick={() => handleDelete(evt.id, token)}>
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  )
}
