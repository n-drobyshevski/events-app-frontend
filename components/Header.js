import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

import Search from "./Search";
import styles from "@/styles/Header.module.css";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  // const { user, logout } = useContext(AuthContext);

  const logoutHandler = async (e) => {
    e.preventDefault();
    const data = await signOut({
      redirect: false,
      callbackUrl: "/",
    });
    router.push(data.url);
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          {session ? (
            // if loggged in
            <>
              <li>
                <Link href="/events/add">
                  <a>Add event</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <button
                    onClick={(e) => logoutHandler(e)}
                    className="btn-secondary btn-icon"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </Link>
              </li>
            </>
          ) : (
            // if logged out
            <>
              <li>
                <Link href="/account/login">
                  <a className="btn-secondary btn-icon">
                    <FaSignInAlt />
                    Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
