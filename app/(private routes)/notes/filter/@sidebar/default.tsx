import Link from "next/link";
import css from "./SidebarNotes.module.css";

const TAGS = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

const SidebarNotes = () => {
  return (
    
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/action/create" className={css.menuLink}> Create note +</Link>
      </li>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>
      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
      </ul>
      
  );
};

export default SidebarNotes;


