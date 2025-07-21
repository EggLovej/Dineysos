import styles from '@/styles/layout/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <img
                        src="/images/logo/color.png"
                        alt="Dineysos Logo"
                        className={styles.logo}
                    />
                    <p>© 2025 Dineysos Wine & Dine Events</p>
                </div>

                <div className={styles.right}>
                    <a
                        href="https://www.instagram.com/dineysos/"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-platform="Instagram"
                    >
                        <img
                            src="/images/svg/instagram.svg"
                            alt="Instagram"
                            className={styles.icon}
                        />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/dineysos/posts/?feedView=all"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-platform="LinkedIn"
                    >
                        <img
                            src="/images/svg/linkedin.svg"
                            alt="LinkedIn"
                            className={styles.icon}
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}