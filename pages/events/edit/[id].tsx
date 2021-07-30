import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaImage} from 'react-icons/fa';
import {useState} from 'react';
import moment from 'moment';
import {useRouter} from 'next/router';
import Layout from '@components/Layout';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { api } from '@config/index';
import styles from '@styles/Form.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function EditEventPage({event}) {
  const [ values, setValues ] = useState({
    name: event.name,
    performers: event.performers,
    venue: event.venue,
    address: event.address,
    date: event.date,
    time: event.time,
    description: event.description,
  });

  const [ imagePreview, setImagePreview ] = useState(event.image ? event.image.formats.thumbnail.url : null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some((v) => v === '');

    if (hasEmptyFields) {
      toast.error('Please fill all the fields');
    }

    const config: AxiosRequestConfig = {
      url: `/events/${event.id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...values
      }
    }

    const resp = await api.request(config).catch((e) => toast.error('Something went wrong with request'));

    if (typeof resp === 'object') {
      router.push(`/events/${resp.data.slug}`);
    }
  }

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  const router = useRouter();

  console.log(imagePreview);

  return (
    <Layout title='Edit Event'>
      <Link href='/events'>Go back</Link>
      <h1>Add Event</h1>
      <form onSubmit={submitHandler} className={styles.form}>
        <ToastContainer />
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event name:</label>
            <input type="text" id="name" name="name" value={values.name} onChange={inputChangeHandler} />
          </div>
          <div>
            <label htmlFor='performers'>Performers:</label>
            <input type="text" name='performers' id='performers' value={values.performers} onChange={inputChangeHandler} />
          </div>
          <div>
            <label htmlFor='venue'>Venue:</label>
            <input type="text" name='venue' id='venue' value={values.venue} onChange={inputChangeHandler} />
          </div>
          <div>
            <label htmlFor='address'>Address:</label>
            <input type="text" name='address' id='address' value={values.address} onChange={inputChangeHandler} />
          </div>
          <div>
            <label htmlFor='date'>date:</label>
            <input type="date" name='date' id='date' value={moment(values.date).format('yyyy-MM-DD')} onChange={inputChangeHandler} />
          </div>
          <div>
            <label htmlFor='time'>Time:</label>
            <input type="text" name='time' id='time' value={values.time} onChange={inputChangeHandler} />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description:</label>
          <textarea name="description" id="description" value={values.description} onChange={inputChangeHandler}></textarea>
        </div>
        <input type="submit" value="Update Event" className='btn' />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? <Image src={imagePreview} height={100} width={180} /> : <div><p>No image uploaded</p></div>}
      <div>
        <button className="btn-secondary">
          <FaImage /> Set Image
        </button>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params: {id} }) {
  const resp = await api.get(`events/${id}`);
  return {
    props: {
      event: resp.data,
    }
  }
}
