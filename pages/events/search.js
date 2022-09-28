import { API_URL } from "@/config/index";

import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

import { useRouter } from "next/router";
import Link from "next/link";

import qs from "qs";

export default function SearchPage({ events, term }) {
  const router = useRouter();

  return (
    <Layout title="Search results">
      <Link href="events/">Go back</Link>
      <h1>Search results for &#34;{router.query.term}&#34;</h1>
      {events ? (
        events.map((ev) => <EventItem key={ev.id} evt={ev.attributes} />)
      ) : (
        <p>No events found</p>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $contains: term,
            },
          },
          {
            description: {
              $contains: term,
            },
          },
          {
            performers: {
              $contains: term,
            },
          },
          {
            venue: {
              $contains: term,
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const res = await fetch(`${API_URL}/api/events?${query}&populate=image`);
  const events = await res.json();
  return {
    props: { events: events.data, term: term },
  };
}
