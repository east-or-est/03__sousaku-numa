import styles from './style.module.scss'

import Figure from "../../molecules/Figure"


interface FilesProps {
  files: [];
  postPath: "blog" | "page" |  "news";
}

interface FilesMapProps {
  type: string[];
  name: string;
  caption: string | undefined;
}


function Files({ files, postPath } : FilesProps) {
  return (
    <div className={styles.group}>
      {files.map(( group: FilesMapProps, index: number ) =>
        <Figure
          key={index}
          fileType={group.type[0]}
          src={group.name}
          caption={group.caption}
          postPath={postPath}
        />
      )}
    </div>
  )
}


export default Files