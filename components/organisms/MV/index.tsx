import styles from './style.module.scss'

import Img from '../../atoms/Img'


function MV() {
  return (
    <div className={styles.mv}>
      <Img
        src="/asset/img/mv_test.png"
        alt="MV"
      />
    </div>
  )
}


export default MV