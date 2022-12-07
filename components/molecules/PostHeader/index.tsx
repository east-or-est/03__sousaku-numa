import PostDate from '../../atoms/PostDate/'
import styles from './style.module.scss'
import PostCatList from '../../molecules/PostCatList'


interface PostHeaderProps {
  title: string;
  time: string;
  category: [];
}


function PostHeader({ title, time, category } : PostHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.date}>
          <PostDate
            time={time}
          />
        </div>
        <div className={styles.title}>
          <h2>
            <span>
              {title}
            </span>
          </h2>
        </div>
      </div>
      <PostCatList
        category={category}
        postType="blog"
      />
    </header>
  )
}


export default PostHeader