import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { signIn } from "next-auth/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaUser } from "react-icons/fa";

import Layout from "@/components/Layout";
import styles from "@/styles/AuthFrom.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (!data.ok) {
      toast.error(data.error || "error");
    } else {
      router.back();
    }
  };

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log in
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input type="submit" className="btn" value="Login" />
        </form>
        <p>
          Dont have an account ? <Link href="/account/register">Register</Link>
        </p>
      </div>
    </Layout>
  );
}
