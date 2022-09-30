import Layout from "@/components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "@/config/index";

import styles from "@/styles/Add.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment/moment";

export default function EditEventPage({ evtData, evtId }) {
  const [values, setValues] = useState({
    name: evtData.name,
    performers: evtData.performers,
    venue: evtData.venue,
    address: evtData.address,
    date: evtData.date,
    time: evtData.time,
    description: evtData.description,
  });

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (hasEmptyFields) {
      toast.error("Please fill all fields");
    }
    const res = await fetch(`${API_URL}/api/events/${evtId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: values }),
    });

    if (!res.ok) {
      toast.error("something went wrong");
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.data.attributes.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <Layout>
      <Link href="/events">Go back</Link>
      <h1>Edit event</h1>
      <ToastContainer />
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Update event" className="btn" />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  // const res = await fetch(`http://localhost:1337/api/events`);
  const res = await fetch(`${API_URL}/api/events/${id}`);
  const evt = await res.json();

  return {
    props: {
      evtId: evt.data.id,
      evtData: evt.data.attributes,
    },
  };
}
