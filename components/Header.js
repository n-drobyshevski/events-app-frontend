import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";

import Link from "next/link";
import styles from "@/styles/Header.module.css";
import Search from "./Search";
import AuthContext from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a> Home</a>
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
          {user ? (
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
                <Link href="account/logout">
                  <button
                    onClick={(e) => {
                      logout();
                    }}
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
