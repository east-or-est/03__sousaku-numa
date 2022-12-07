import styles from './style.module.scss'

import BoxBanner from '../../molecules/BoxBanner'


function ContentsTopics() {
  return (
    <div className={styles.list}>
      <div className={styles.item}>
        <BoxBanner
          title="はじめての方へ"
          url="about/"
          imgPath="/asset/img/topics_test01.png"
        />
      </div>
      <div className={styles.item}>
        <BoxBanner
          title="ギャラリー"
          url="gallery/"
          imgPath="/asset/img/topics_test02.png"
        />
      </div>
      <div className={styles.item}>
        <BoxBanner
          title="ブログ"
          url="blog/"
          imgPath="/asset/img/topics_test01.png"
        />
      </div>
      <div className={styles.item}>
        <BoxBanner
          title="新着情報"
          url="news/"
          imgPath="/asset/img/topics_test02.png"
        />
      </div>
    </div>
  )
}


export default ContentsTopics