import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from "next/link";

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {console.log(events)}
      {events.length === 0 && <h1>No events to show</h1>}
      {events.map((ev) => (
        <EventItem key={ev.id} evt={ev.attributes} />
      ))}
      {events.length > 0 && (
        <Link href={`/events/`}>
          <a className="btn-secondary">View all</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?populate=image&_sort=date:ASC&_limit=3`
  );
  const events = await res.json();
  return {
    props: { events: events.data },
    revalidate: 1,
  };
}
