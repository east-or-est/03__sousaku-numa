import PostHeader from '../../molecules/PostHeader/'
import PostConetnt from '../../molecules/PostConetnt/'
import PostMoreLink from '../../molecules/PostMoreLink/'
import styles from './style.module.scss'


interface ContentsPostProps {
  title: string;
  date: string;
  category: [];
  contents: [];
  moreID: string;
  postPath?: "blog" | "page";
  border?: string;
  contents_more: [];
}


function ContentsPost({ title, date, category, contents, moreID, postPath = "blog", border = "def", contents_more } : ContentsPostProps) {
  return (
    <section className={styles.section}>
      <PostHeader
        title={title}
        time={date}
        category={category}
      />
      <PostConetnt
        contents={contents}
        postPath={postPath}
        border={border}
      />
      { contents_more ?
          contents_more.length ?
          <PostMoreLink
            moreID={moreID}
            postPath={postPath}
          />
          : false
        : false
      }
    </section>
  )
}


export default ContentsPost