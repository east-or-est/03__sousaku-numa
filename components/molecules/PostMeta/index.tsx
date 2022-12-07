import styles from './style.module.scss'
import PostCatList from '../../molecules/PostCatList'
import PostTagList from '../../molecules/PostTagList'


interface PostMetaProps {
  category: [];
  tag: [];
  postType?: "blog" | "news";
}


function PostMeta({ category, tag , postType = "blog" } : PostMetaProps) {
  return (
    <div className={styles.wrap}>
      <PostCatList
        category={category}
        postType={postType}
      />
      { tag.length ?
        <PostTagList
          tag={tag}
          postType={postType}
        />
      : false
      }
    </div>
  )
}


export default PostMeta