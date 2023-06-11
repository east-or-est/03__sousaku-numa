import Link from 'next/link'

import styles from './style.module.scss'


interface FrameListProps {
  box: any;
  link?: string;
}


interface FrameListMapProps {
  id: number;
  date: string;
  comment: string;
}


function FrameList({ box = [], link = '' } : FrameListProps) {
  return (
    <>
      { Object.keys(box) ?
        <>
          { box.map((item: FrameListMapProps, index: number) =>
          <dl key={index} className={styles.list} data-post={item.id}>
            <dt>
              {item.date}
            </dt>
            <dd className={styles.comment}>
              <p>
                {item.comment}
              </p>
            </dd>
          </dl>
          )}
        </>
        : false
      }
      { link ?
        <p>
          <Link
            href={{
              pathname: link,
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            全記事を見る
          </Link>
        </p>
        : false
      }
      
    </>
  )
}


export default FrameList