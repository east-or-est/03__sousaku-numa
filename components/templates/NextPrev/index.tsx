import Link from 'next/link'

import styles from './style.module.scss'


interface NextPrevProps {
  contents: any;
  slug: string;
  postPath?: "blog" | "news";
}


function NextPrev({ contents, slug, postPath = "blog" }: NextPrevProps) {

  const index = contents.findIndex((content : any) => content.id === slug);
  const prev = contents[index + 1];
  const next = contents[index - 1];

  return (
    <div className={styles.pager}>
      <ul>
        { prev ?
          <li className={styles.prev}>
            <Link
              href={ `/${postPath}/${prev.id}`}
              passHref
            >
              {prev.title.toString()}
            </Link>
          </li>
          : false
        }

        { next ?
          <li className={styles.next}>
            <Link
              href={ `/${postPath}/${next.id}`}
              passHref
            >
              {next.title.toString()}
            </Link>
          </li>
          : false
        }
      </ul>
    </div>
  )
}


export default NextPrev