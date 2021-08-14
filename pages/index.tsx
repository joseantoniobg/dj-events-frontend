import Link from "next/link";
import Layout from "@components/Layout";
import EventItem from "@components/EventItem";
import { API_URL } from "@config/index";
import Pagination from "@components/Pagination";
const PER_PAGE = 5;

export default function Home({events, total, page}) {
  return (
    <Layout>
      <h1>Upcoming events</h1>
      {events.length === 0 && <h3>No events to show!</h3>}
      {events.length > 0 && (
        <Link href="/events"><a className="btn-secondary">View all Events</a></Link>
      )}
      {events.map((event) => (
        <EventItem evt={event} />
      ))}
      <Pagination page={page} total={total} perPage={PER_PAGE} />
    </Layout>
  );
}

export const getServerSideProps = async ({query: {page = 1}}) => {
  const start = +page === 1 ? 0 : (+page-1) * PER_PAGE;
  const resCount = await fetch(`${API_URL}events/count`);
  const total = await resCount.json();

  const res = await fetch(`${API_URL}events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  const events = await res.json();

  return {
    props: { events, page: +page, total },
  }
}