import Link from "next/link";
import Layout from "@components/Layout";
import EventItem from "@components/EventItem";
import { API_URL } from "@config/index";

export default function Home({events}) {
  return (
    <Layout>
      <h1>Upcoming events</h1>
      {events.length === 0 && <h3>No events to show!</h3>}
      {events.map((event) => (
        <EventItem evt={event} />
      ))}
      {events.length > 0 && (
        <Link href="/events"><a className="btn-secondary">View all Events</a></Link>
      )}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}events?_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  }
}