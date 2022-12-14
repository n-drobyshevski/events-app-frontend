import { useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaUser } from "react-icons/fa";

import Layout from "@/components/Layout";
import styles from "@/styles/AuthFrom.module.css";

import register from "pages/api/auth/register";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("passwords do not math!");
      return;
    }

    const registerResponse = await register({ email, password, username });
    if (!registerResponse.ok) {
      toast.error(registerResponse.error);
    } else {
      const data = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (!data.ok) {
        toast.error(data.error || "error");
      } else {
        router.push("/");
      }
    }
  };
  return (
    <Layout title="Register User">
      <div className={styles.auth}>
        <ToastContainer />
        <h1>
          <FaUser /> Register
        </h1>
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
            <label htmlFor="">User Name</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
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
          <div>
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              id="ConfirmPassword"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
            />
          </div>
          <input type="submit" className="btn" value="Register" />
        </form>
        <p>
          Already have an account ? <Link href="/account/login">Log In</Link>
        </p>
      </div>
    </Layout>
  );
}
