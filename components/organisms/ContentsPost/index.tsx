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
  more: boolean;
  postPath?: "blog" | "page";
  border?: string;
}


function ContentsPost({ title, date, category, contents, moreID, more = false, postPath = "blog", border = "def" } : ContentsPostProps) {
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
      <PostMoreLink
        moreID={moreID}
        more={more}
        postPath={postPath}
      />
    </section>
  )
}


export default ContentsPost