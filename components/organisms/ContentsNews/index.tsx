import Link from 'next/link'

import styles from './style.module.scss'

import Headline from '../../atoms/Headline'
import NewsList from '../../molecules/NewsList'


interface ContentsNewsProps {
  contents: [];
}


interface ContentsNewsMapProps {
  id: string;
  title: string;
  description: [];
  date: string;
  categories: [];
  contents: [];
}


function ContentsNews({ contents } : ContentsNewsProps) {
  return (
    <article className={styles.wrap}>
      <header className={styles.header}>
        <Headline
          text="NEWS"
          en={true}
        />
        <div className={styles.btn}>
          <Link
            href={{
              pathname: '/news'
            }}
            passHref
          >
            一覧ページ
          </Link>
        </div>
      </header>
      <div className={styles.main}>
        {contents.map(( group: ContentsNewsMapProps, index: number ) =>
          <NewsList
            key={index}
            id={group.id}
            title={group.title}
            desc={group.description}
            time={group.date}
            category={group.categories}
            contents={group.contents}
          />
        )}
      </div>
    </article>
  )
}


export default ContentsNews