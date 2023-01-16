import PostHeader from '../../molecules/PostHeader/'
import PostConetnt from '../../molecules/PostConetnt/'
import PostMoreLink from '../../molecules/PostMoreLink/'
import PostFooter from '../../molecules/PostFooter'
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
  author: string[];
  postimage: string[];
  tag: [];
}


function ContentsPost({ title, date, category, contents, moreID, postPath = "blog", border = "def", contents_more, author, postimage, tag } : ContentsPostProps) {
  return (
    <section className={styles.section}>
      <PostHeader
        title={title}
        time={date}
        category={category}
        author={author}
        postimage={postimage}
        tag={tag}
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