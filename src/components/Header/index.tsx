import styles from './header.module.scss';

export default function Header() {
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <img
            className={styles.logoSpaceTraveling}
            src="/images/spacetraveling.svg"
            alt="logo"
          />
        </div>
      </div>
    </header>
  );
}
