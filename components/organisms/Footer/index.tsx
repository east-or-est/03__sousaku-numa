import CopyRight from '../../atoms/Copyright/'
import MenuNav from '../../molecules/MenuNav'
import styles from './style.module.scss'


interface FooterProps {
  fNav: [];
}


function Footer({ fNav } : FooterProps) {
  return (
    <footer>
      <div className={styles.nav}>
        <MenuNav
          nav={fNav}
          textAlign="center"
        />
      </div>
      <CopyRight />
    </footer>
  )
}


export default Footer