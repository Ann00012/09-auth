import css from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
    return (
<footer className={css.footer}>
  <div className={css.content}>
    <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
    <div className={css.wrap}>
      <p>Developer: Ann Malchevska</p>
      <p>
        Contact us:
        <Link href="mailto:student@notehub.app">student@notehub.app</Link>
      </p>
    </div>
  </div>
</footer>

    );
};

export default Footer;