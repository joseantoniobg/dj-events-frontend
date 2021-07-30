import Link from 'next/link';
import Image from 'next/image';
import styles from '@styles/EventItem.module.scss';
import { getDateAsStringDDMMYYYY } from '../helpers/helpers';

export default function EventItem({evt}) {
  return (
    <div id={evt.id} className={styles.event}>
      <div className={styles.img}>
       {evt.image && <Image src={evt.image.formats.thumbnail.url ?? '/images/event-default.png'} width={170} height={100} />}
      </div>
      <div className={styles.info}>
        <span>{getDateAsStringDDMMYYYY(evt.date)} at {evt.time}</span>
        <h3>{evt.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}><a className='btn'>Details</a></Link>
      </div>
    </div>
  )
}
