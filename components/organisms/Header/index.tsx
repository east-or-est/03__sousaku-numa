import { SITE_DESC } from '../../../const/Meta/'

import LogoLink from '../../molecules/LogoLink/'
import MenuNav from '../../molecules/MenuNav/'
import styles from './style.module.scss'


interface HeaderProps {
  gNav: [];
}


function Header({ gNav } : HeaderProps) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_inner}>
          <div className={styles.top}>
            <div className={styles.logo}>
              <LogoLink />
            </div>
            <div className={styles.desc}>
              <div className={styles.desc_inner}>
                <p>
                  {SITE_DESC}<br />
                  管理人：ひがし＆エスト
                </p>
              </div>
            </div>
          </div>
          <MenuNav
            nav={gNav}
            menuType="top"
          />
        </div>
      </header>
    </>
  );
}


export default Header