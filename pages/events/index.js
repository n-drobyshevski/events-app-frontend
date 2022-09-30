import Layout from "@/components/Layout";
// import styles from "@/styles/Home.module.css";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h1>No events to show</h1>}
      {events.map((ev) => (
        <EventItem key={ev.id} evt={ev.attributes} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?populate=image&_sort=date:ASC`
  );
  const events = await res.json();
  return {
    props: { events: events.data },
  };
}
