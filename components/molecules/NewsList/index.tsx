import Link from 'next/link'

import styles from './style.module.scss'

import Date from '../../atoms/Date'
import PostCatList from '../../molecules/PostCatList'


interface NewsListProps {
  id: string;
  title: string;
  desc?: [];
  time: string;
  category: [];
  contents?: [];
}


interface NewsListMapProps {
  desc: string;
}


function NewsList({ id, title, desc = [], time, category, contents = [] } : NewsListProps) {
  return (
    <dl className={styles.list}>
      <dt>
        <Date
          time={time}
        />
        <PostCatList
          category={category}
          postType="news"
        />
      </dt>
      <dd>
        { contents.length ?
          <Link
            href={{
              pathname: `/news/${id}`
            }}
            passHref
          >
              <strong>{title}</strong>
          </Link>
          :
          <strong>{title}</strong>
        }
        { desc ?
          <div className={styles.desc}>
            { desc.map((text: NewsListMapProps, index: number) => <p key={index}>{text.desc}</p> ) }
          </div>
        : false
        }
      </dd>
    </dl>
  )
}


export default NewsList