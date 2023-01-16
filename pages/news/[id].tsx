import { NextPage } from 'next'
import Link from 'next/link'

import { client_news, client_nav } from '../../lib/client'

import Layout from '../../components/templates/Layout'
import PostConetnt from '../../components/molecules/PostConetnt/'
import PageTitle from '../../components/molecules/PageTitle'
import NextPrev from '../../components/templates/NextPrev'

import styles from './style.module.scss'

interface PageNewsIDProps {
  gNav: [];
  fNav: [];
  news: {
    id: string;
    title: string;
    date: string;
    categories: [];
    contents: [];
    description: [];
  }
  newsPager: {
    contents: [];
  }
}


const PageNewsID: NextPage<PageNewsIDProps> = ({ gNav, fNav, news, newsPager }) => {

  const pageMeta = {
    title: `新着情報 - ${news.title}`,
    desc: ""
  }

  return (
    <Layout gNav={gNav} fNav={fNav} pageID="news" pageMeta={pageMeta} colorType='ブルー'>
      <>
      <PageTitle
        title={news.title}
        date={news.date}
      />
      <div className="page-content">
        <div className="media-margin">
          { news.description.length ?
            <PostConetnt
              contents={news.description}
              postPath="news"
              border="none"
            />
          : false
          }
          <PostConetnt
            contents={news.contents}
            postPath="news"
            border="none"
          />
          <footer className={styles.footer}>
            <NextPrev
              postPath="news"
              contents={newsPager.contents}
              slug={news.id}
            />
            <div className="parts-btn_01">
              <Link href={{
                pathname:"/news"
              }}>
                新着一覧へ戻る
              </Link>
            </div>
          </footer>
        </div>
      </div>
      </>
    </Layout>
  )
}

export default PageNewsID;


export async function getStaticPaths() {
  const data = await client_news
    .get({
      endpoint: 'posts',
      queries: {
        limit: 100,
      }
    });
    const paths = data.contents.map( (content : any) => `/news/${content.id}`);
    return {
      paths,
      fallback: false
    }
}


export async function getStaticProps(context : any) {
  const id = context.params.id;
  const data_navGlobal = await client_nav
  .get({
    endpoint: 'global',
    queries: {
      offset: 0,
      limit: 15,
    }
  })
  const data_navFooter = await client_nav
  .get({
    endpoint: 'footer',
    queries: {
      offset: 0,
      limit: 15,
    }
  })
  const data_news = await client_news
  .get({
    endpoint: 'posts',
    contentId: id
  })
  const data_newsPager = await client_news
  .get({
    endpoint: 'posts',
    queries: {
      limit: 100,
      orders: '-date',
      fields: 'id,title'
    }
  })
  return {
    props: {
      gNav: data_navGlobal.contents,
      fNav: data_navFooter.contents,
      news: data_news,
      newsPager: data_newsPager,
    },
  }
}
