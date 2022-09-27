import Layout from "@/components/Layout";

import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";

import Link from "next/link";
import Image from "next/image";

import { FaPencilAlt, FaTimes } from "react-icons/fa";

export default function EventPage({ id, eventData }) {
  const deleteEvent = () => {};
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`events/edit/${id}`}>
            <a>
              <FaPencilAlt /> Edit
            </a>
          </Link>
          <a className={styles.delete} href="#" onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {eventData.date} at {eventData.time}
        </span>
        <h1>{eventData.name}</h1>
        {eventData.image && (
          <div className={styles.image}>
            <Image
              src={eventData.image.data.attributes.formats.medium.url}
              width="960"
              height="600"
            />
          </div>
        )}
        <h3>Performers: </h3>
        <p>{eventData.performers}</p>
        <h3>Description: </h3>
        <p>{eventData.description}</p>
        <h3>Venue:{eventData.venue} </h3>
        <p>{eventData.address}</p>

        <Link href={"events/"}>
          <a className={styles.back}>Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/events?filters[slug]=${slug}&populate=image`
  );
  const events = await res.json();
  return {
    props: {
      id: events.data[0].id,
      eventData: events.data[0].attributes,
    },
    revalidate: 1,
  };
}
//
// export async function getServerSideProps({ query: { slug } }) {
//     const res = await fetch(`${API_URL}/api/events/${slug}`)
//     const events = await res.json()
//     return {
//         props: {
//             evt: events[0],
//         }
//     }
// }
