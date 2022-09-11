import Layout from '@/components/Layout';
import styles from '@/styles/404.module.css';
import Link from 'next/link';

import { FaExclamationTriangle, } from 'react-icons/fa';

export default function NotFoundPage() {
    return (
        <Layout title="page not found">
            <div className={styles.error}>
                <h1>404</h1>
                <FaExclamationTriangle />
                <h4>Sorry there is nothing here</h4>
                <Link href="/"><a>Go Back Home</a></Link>
            </div>
        </Layout>
    )
}
