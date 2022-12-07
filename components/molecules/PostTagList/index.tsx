import Link from 'next/link'

import styles from './style.module.scss'


interface PostTagListProps {
  tag: [];
  postType?: "blog" | "news";
}

interface PostTagListMapProps {
  id: string;
  name: string;
}


function PostTagList({ tag, postType = "news" } : PostTagListProps) {
  return (
    <ul className={styles.list}>
      {tag.map((item: PostTagListMapProps, index: number) =>
        <li
          key={index}
          data-cat={item.id}
        >
          <Link
            href={{
              pathname: `/${postType}/tag/${item.id}`
            }}
            passHref
          >
            {item.name}
          </Link>
        </li>
      )}
    </ul>
  )
}


export default PostTagList