import PostDate from '../../atoms/PostDate/'
import Img from '../../atoms/Img'
import styles from './style.module.scss'
import PostCatList from '../../molecules/PostCatList'
import PostTagList from '../../molecules/PostTagList'


interface PostHeaderProps {
  title: string;
  time: string;
  category: [];
  author: string[];
  postimage: string[];
  tag: [];
}


function PostHeader({ title, time, category, author, postimage, tag } : PostHeaderProps) {
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
      <div className={styles.bottom}>
        <PostCatList
          category={category}
          postType="blog"
        />
        <PostTagList
          tag={tag}
          postType="blog"
        />
      </div>
      <div className={styles.other}>
        <p className={styles.serif}>{ author.length === 1 ? author[0] : 'ひがしもエストも' }、{postimage[0]}</p>
        <ul className={styles.author}>
        { author.length === 1 ?
          <li>
            {( () => {
              switch (author[0]) {
                case 'エスト':
                  return <Img src='/asset/img/author_02.png' />
                default:
                  return <Img src='/asset/img/author_01.png' />
              }
            }) ()}
          </li>
          : 
          <>
            <li><Img src='/asset/img/author_01.png' /></li>
            <li><Img src='/asset/img/author_02.png' /></li>
          </>
          }
        </ul>
      </div>
    </header>
  )
}


export default PostHeader