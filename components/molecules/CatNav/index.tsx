import styles from './style.module.scss'

import Link from 'next/link'


interface CatNavProps {
  nav: [];
  selID?: string;
  postType?: "blog" | "news";
}

interface CatNavMapProps {
  id: string;
  name: string;
}


function CatNav({ nav, selID, postType = "blog" } : CatNavProps) {
  return (
    <div className={styles.list}>
      <ul>
        <li
          data-cat='ALL'
          data-sel={'ALL' === selID ? true : false}
        >
          <Link
            href={{
              pathname: `/${postType}`
            }}
            passHref
          >
            ALL
          </Link>
        </li>
        {nav.map((item: CatNavMapProps, index: number) =>
          <li
            key={index}
            data-cat={item.id}
            data-sel={item.id === selID ? true : false}
          >
            <Link
              href={{
                pathname: `/${postType}/category/${item.id}`
              }}
              passHref
            >
              {item.name}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}


export default CatNav