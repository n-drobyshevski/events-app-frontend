import React from 'react'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer>
            <p>copyrights &copy;</p>
            <Link href='/about'>
                <a>
                    About
                </a>
            </Link>
        </footer>
    )
};
