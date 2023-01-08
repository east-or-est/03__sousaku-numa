import styles from './style.module.scss'

import Img from '../../atoms/Img'
import Audio from '../../atoms/Audio'
import Video from '../../atoms/Video'


interface FigureProps {
  fileType?: "画像" | "音声" | "動画";
  src: string;
  alt?: string | undefined;
  caption?: string | undefined;
  postPath: "blog" | "page";
}


function Figure({ fileType = "画像", src = "", alt = "", caption = "", postPath = "blog" }) {
  return (
    <figure className={styles.figure}>
      {( () => {
        switch (fileType) {
          case '音声':
            return <Audio src={`/asset/audio/${postPath}/${src}`} />
          case '動画':
            return <Video src={`/asset/video/${postPath}/${src}`} />
          default:
            return <Img src={`/asset/img/${postPath}/${src}`} alt={alt} />
        }
      }) ()}
      { caption ?
        <figcaption>
          <p>
            {caption}
          </p>
        </figcaption>
        :
        false
      }
    </figure>
  )
}


export default Figure