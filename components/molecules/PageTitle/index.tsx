import styles from './style.module.scss'

import Headline from '../../atoms/Headline'
import Date from '../../atoms/Date'


interface PageTitleProps {
  title: string;
  enTitle?: string;
  date?: string;
}


function PageTitle({ title, enTitle = '', date = '' }: PageTitleProps) {
  return (
    <div className={styles.title}>
      <div className={styles.title_text}>
        { enTitle ?
          <span className="en">
            {enTitle}
          </span>
          : false
        }
        { date ?
          <span className={styles.date}>
            <Date
              time={date}
            />
          </span>
          : false
        }
        <Headline
          text={title}
          Component="h1"
        />
      </div>
    </div>
  );
}


export default PageTitle