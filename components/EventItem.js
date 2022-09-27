import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/EventItem.module.css";

export default function EventItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.image
              ? evt.image.data.attributes.formats.thumbnail.url
              : "/images/event-default.png"
          }
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <h3>{evt.name}</h3>
        <h5>
          {evt.date} at {evt.time}
        </h5>
      </div>
      <div className={styles.link}>
        {console.log(evt.slug)}
        <Link href={`events/${evt.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}