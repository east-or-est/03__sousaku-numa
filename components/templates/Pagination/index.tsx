import Link from 'next/link'

import styles from './style.module.scss'

import { PER_PAGE_BLOG } from '../../../const/Blog/'


interface PaginationProps {
  totalCount: number;
  selCount?: number;
  type?: string;
  selCategory?: string | undefined;
  parPage?: number;
  postPath?: "blog" | "news";
}


function Pagination({ totalCount, selCount = 1, type = 'archive', selCategory, parPage = PER_PAGE_BLOG, postPath = "blog" }: PaginationProps) {

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <div className={styles.pager}>
      <div className="media-margin">
        <ul>
          {range(1, Math.ceil(totalCount / parPage)).map((number, index) => (
            <li key={index}>
              { number === Number(selCount) ?
              <span>
                {number}
              </span>
              :
                <>
                  {( () => {
                    switch (type) {
                      case 'category':
                        return(
                          <>
                            { number === 1 ?
                            <Link
                              href={ `/${postPath}/category/${selCategory}`}
                              passHref
                            >
                              {number}
                            </Link>
                            :
                            <Link
                              href={ `/${postPath}/category/${selCategory}/page/${number}`}
                              passHref
                            >
                              {number}
                            </Link>
                            }
                          </>
                        )
                      case 'tag':
                        return(
                          <>
                            { number === 1 ?
                            <Link
                              href={ `/${postPath}/tag/${selCategory}`}
                              passHref
                            >
                              {number}
                            </Link>
                            :
                            <Link
                              href={ `/${postPath}/tag/${selCategory}/page/${number}`}
                              passHref
                            >
                              {number}
                            </Link>
                            }
                          </>
                          )
                      default:
                        return(
                          <>
                          { number === 1 ?
                          <Link
                            href={ `/${postPath}`}
                            passHref
                          >
                            {number}
                          </Link>
                          :
                          <Link
                            href={ `/${postPath}/page/${number}`}
                            passHref
                          >
                            {number}
                          </Link>
                          }
                        </>
                      )
                    }
                  }) ()}
                </>
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


export default Pagination