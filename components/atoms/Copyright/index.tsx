import styles from './style.module.scss'
import { SITE_TITLE } from '../../../const/Meta/'


function Copyright() {
  return (
    <div className={styles.copyright}>
      <p>
        &copy; {SITE_TITLE}.
      </p>
    </div>
  );
}


export default Copyright