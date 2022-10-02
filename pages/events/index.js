import Layout from "@/components/Layout";
// import styles from "@/styles/Home.module.css";
import { API_URL, PER_PAGE } from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

export default function Home({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {!events ? (
        <h1>No events to show</h1>
      ) : (
        events.map((ev) => <EventItem key={ev.id} evt={ev.attributes} />)
      )}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  // fetch total/count
  const totalRes = await fetch(`${API_URL}/api/events`);
  const total = await totalRes.json();

  // fetch events
  const eventsRes = await fetch(
    `${API_URL}/api/events?populate=image&_sort=date:ASC&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`
  );
  const events = await eventsRes.json();
  return {
    props: {
      events: events.data,
      page: +page,
      total: total.meta.pagination.total,
    },
  };
}
