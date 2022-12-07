import Link from 'next/link'

import styles from './style.module.scss'

import Img from '../../atoms/Img'


interface BoxBannerProps {
  title: string;
  url?: string | undefined;
  imgPath?: string;
}

function BoxBanner({ title, url = "", imgPath }: BoxBannerProps) {
  return (
    <Link
      href={{
        pathname: "/" + url
      }}
      passHref
      className={styles.link}
    >
      {title}
      { imgPath ?
        <Img
          src={imgPath}
        />
        : false
      }
    </Link>
)
}


export default BoxBanner