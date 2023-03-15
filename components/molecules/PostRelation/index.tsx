import styles from './style.module.scss'
import Li from '../../atoms/Li'
import Headline from '../../atoms/Headline'
import Link from 'next/link'


interface PostRelationProps {
  headline?: string;
  relation: [];
  color?: "ピンク" | "ブルー";
}

interface PostRelationMapProps {
  id: string;
  title: string;
}


function PostRelation({ headline = "サイト内の関連記事", relation, color = "ブルー" } : PostRelationProps) {
  return (
    <div className={styles.wrap} data-color-type={color}>
      <Headline
        text={headline}
      />
      { relation.length ?
        <ul>
          {relation.map(( rel:PostRelationMapProps, index: number ) =>
          <li key={index}>
            <Link
                href={{
                  pathname: `/blog/${rel.id}`
                }}
                passHref
            >
              {rel.title}
            </Link>
          </li>
          )}
        </ul>
      : <p>関連記事はありません</p>
      }
    </div>
  )
}


export default PostRelation