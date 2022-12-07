import { ReactNode } from 'react'

import styles from './style.module.scss'


interface BoxSecretProps {
  children: ReactNode;
  secret: boolean;
}


function BoxSecret({ children, secret } : BoxSecretProps) {
  return (
    <>
      {
        secret !== true ?
        <div className={styles.desc}>
          {children}
        </div>
        :
        <div className={styles.desc}>
          <details className={styles.details}>
            <summary>展開する</summary>
            {children}
          </details>
        </div>
      }
    </>
  )
}


export default BoxSecret