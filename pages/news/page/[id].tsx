import { NextPage } from 'next'

import { client_news, client_nav } from '../../../lib/client'
import { PER_PAGE_NEWS } from '../../../const/Blog/'

import Layout from '../../../components/templates/Layout'
import NewsList from '../../../components/molecules/NewsList'
import Pagination from '../../../components/templates/Pagination'
import PageTitle from '../../../components/molecules/PageTitle'


interface PageNewsPageIdProps {
  gNav: [];
  fNav: [];
  news: [];
  totalCount: number;
  conPrivate: {
    topContents: {
      news: boolean;
      topics: boolean;
    }
  };
  selCount: number;
}

interface PageNewsPageIdMapProps {
  id: string;
  title: string;
  description: [];
  date: string;
  categories: [];
  contents: [];
}


const PageNewsPageId: NextPage<PageNewsPageIdProps> = ({ gNav, fNav, news, totalCount, selCount }) => {

  const pageMeta = {
    title: `新着情報 - ${selCount}ページ`,
    desc: ""
  }

  return (
    <Layout gNav={gNav} fNav={fNav} pageID="news" pageMeta={pageMeta} colorType='ブルー'>
      <PageTitle
        title={pageMeta.title}
        enTitle="news"
      />
      <div className="page-content">
        <div className="media-margin">
          {news.map((json: PageNewsPageIdMapProps, index: number) =>
            <NewsList
              key={index}
              id={json.id}
              title={json.title}
              desc={json.description}
              time={json.date}
              category={json.categories}
              contents={json.contents}
            />
          )}
        </div>
        <Pagination
          totalCount={totalCount}
          selCount={selCount}
          parPage={PER_PAGE_NEWS}
          postPath="news"
        />
      </div>
    </Layout>
  )
}

export default PageNewsPageId;


export async function getStaticPaths() {

  const data = await client_news
    .get({
      endpoint: 'posts',
      queries: {
        limit: 100,
      }
    });

    const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

    const paths = range(1, Math.ceil(data.totalCount / PER_PAGE_NEWS)).map((repo) => `/news/page/${repo}`);
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
    queries: {
      offset: (id - 1) * PER_PAGE_NEWS,
      limit: PER_PAGE_NEWS,
      orders: '-date',
    }
  })
  return {
    props: {
      gNav: data_navGlobal.contents,
      fNav: data_navFooter.contents,
      news: data_news.contents,
      totalCount: data_news.totalCount,
      selCount: id,
    },
  }
}
