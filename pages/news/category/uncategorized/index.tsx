import { NextPage } from 'next'

import { client_news, client_nav } from '../../../../lib/client'
import { PER_PAGE_NEWS } from '../../../../const/Blog/'
import { CAT_NONE_SLUG, CAT_NONE_NAME } from '../../../../const/Blog'

import Layout from '../../../../components/templates/Layout'
import Pagination from '../../../../components/templates/Pagination'
import PageTitle from '../../../../components/molecules/PageTitle'
import NewsList from '../../../../components/molecules/NewsList'


interface PageNewsCatNoneProps {
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

interface PageNewsCatNoneMapProps {
  id: string;
  title: string;
  description: [];
  date: string;
  categories: [];
  contents: [];
}


const PageNewsCatNone: NextPage<PageNewsCatNoneProps> = ({ gNav, fNav, news, totalCount, selCount }) => {

  const pageMeta = {
    title: `新着情報 | ${CAT_NONE_NAME}`,
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
          {news.map(( json: PageNewsCatNoneMapProps, index: number ) =>
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
          selCategory={CAT_NONE_SLUG}
          type="category"
          parPage={PER_PAGE_NEWS}
          postPath="news"
        />
      </div>
    </Layout>
  )
}

export default PageNewsCatNone


export async function getStaticProps(context : any) {
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
      limit: PER_PAGE_NEWS,
      orders: '-date',
      filters: `categories[not_exists]`,
    }
  })
  return {
    props: {
      gNav: data_navGlobal.contents,
      fNav: data_navFooter.contents,
      news: data_news.contents,
      totalCount: data_news.totalCount,
      selCount: 1,
    },
  }
}
