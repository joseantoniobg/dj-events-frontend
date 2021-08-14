import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { parseCookies } from '@helpers/helpers';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Layout from '@components/Layout';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { api } from '@config/index';
import styles from '@styles/Form.module.scss';
import Link from 'next/link';

export default function AddEventPage({token}) {
  const [ values, setValues ] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some((v) => v === '');

    if (hasEmptyFields) {
      toast.error('Please fill all the fields');
      return;
    }

    const config: AxiosRequestConfig = {
      url: '/events',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: {
        ...values
      }
    }

    console.log(config);

    const resp = await api.request(config).catch((e) => {toast.error('Something went wrong with request')
    console.log(e);
  });

    if (typeof resp === 'object') {
      router.push(`/events/${resp.data.slug}`);
    }
  }

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  const router = useRouter();

  return (
    <Layout title='Add new Event'>
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
            <input type="date" name='date' id='date' value={values.date} onChange={inputChangeHandler} />
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
        <input type="submit" value="Add Event" className='btn' />
      </form>
    </Layout>
  )
}

export async function getServerSideProps ({req}) {
  const {token} = parseCookies(req);
  return {
    props: {
      token: token
    }
  }
}