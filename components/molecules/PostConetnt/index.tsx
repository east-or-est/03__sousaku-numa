import styles from './style.module.scss'
import BoxContents from '../../molecules/BoxContents'


interface PostConetntProps {
  contents: [];
  border?: string;
  postPath: "blog" | "page" | "news";
}


function PostConetnt({ contents, border, postPath }: PostConetntProps) {
  return (
    <div className={styles.content} data-border={ border === 'none' ? 'none' : 'def'} data-headline-style="blog">
      <BoxContents
        contents={contents}
        postPath={postPath}
      />
    </div>
  )
}


export default PostConetnt