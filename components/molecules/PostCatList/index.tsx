import Link from 'next/link'

import styles from './style.module.scss'

import { CAT_NONE_SLUG, CAT_NONE_NAME } from '../../../const/Blog'


interface PostCatListProps {
  category: [];
  postType?: "blog" | "news";
}

interface PostCatListMapProps {
  id: string;
  name: string;
}


function PostCatList({ category, postType = "news" } : PostCatListProps) {
  return (
    <ul className={styles.list}>
      { category.length ?
        <>
        {category.map((item: PostCatListMapProps, index: number) =>
          <li
            key={index}
            data-cat={item.id}
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
        </>
      :
        <li>
          <Link
            href={{
              pathname: `/${postType}/category/${CAT_NONE_SLUG}`
            }}
            passHref
          >
            {CAT_NONE_NAME}
          </Link>
        </li>
      }
    </ul>
  )
}


export default PostCatList