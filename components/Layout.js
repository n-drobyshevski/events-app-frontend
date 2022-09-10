import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

import styles from '../styles/Layout.module.css';

export default function Layout({ title, keywords, description, children }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
            </Head>
            <Header />
            <div className={styles.container}>
                {children}
            </div>
            <Footer></Footer>
        </div>

    )
}

Layout.defaultProps = {
    title: 'Events app',
    description: 'test app built with next js',
    keywords: 'keyword',
};