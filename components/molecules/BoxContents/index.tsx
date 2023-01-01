import styles from './style.module.scss'

import Markdown from '../../../function/Markdown'

import Files from '../../molecules/Files'
import BoxSecret from '../../molecules/BoxSecret'


interface BoxContentsProps {
  contents: [];
  postPath?: "blog" | "page" | "news";
  secret?: boolean;
}


interface BoxContentsMapProps {
  desc: string;
  files: [];
  secret?: boolean;
}


function BoxContents({ contents, postPath = "blog" } : BoxContentsProps) {
  return (
    <>
      {contents.map(( group: BoxContentsMapProps, index: number ) =>
        <BoxSecret secret={group.secret ? true : false} key={index}>
          <>
            { group.files ?
                group.files.length ?
                <Files
                  files={group.files}
                  postPath={postPath}
                />
                : false
              : false
            }
            {
              group.desc ?
                group.desc.length ?
                <div className={styles.desc}>
                  <Markdown
                    text={group.desc}
                  />
                </div>
                : false
              : false
            }
          </>
        </BoxSecret>
      )}
    </>
  )
}


export default BoxContents