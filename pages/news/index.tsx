import { NextPage } from 'next'

import { client_news, client_nav } from '../../lib/client'
import { PER_PAGE_NEWS } from '../../const/Blog/'

import Layout from '../../components/templates/Layout'
import Pagination from '../../components/templates/Pagination'
import PageTitle from '../../components/molecules/PageTitle'
import NewsList from '../../components/molecules/NewsList'
import CatNav from '../../components/molecules/CatNav'


interface PageNewsProps {
  gNav: [];
  fNav: [];
  news: [];
  newsCat: [];
  totalCount: number;
  conPrivate: {
    topContents: {
      news: boolean;
      topics: boolean;
    }
  };
  selCount: number;
}

interface PageNewsMapProps {
  id: string;
  title: string;
  description: []
  date: string;
  categories: [];
  contents: [];
}


const PageNews: NextPage<PageNewsProps> = ({ gNav, fNav, news, newsCat, totalCount, selCount }) => {

  const pageMeta = {
    title: "新着情報",
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
          <CatNav
            nav={newsCat}
            postType="news"
            selID='ALL'
          />
          {news.map(( json: PageNewsMapProps, index: number ) =>
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

export default PageNews


export async function getStaticProps() {
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
      offset: 0,
      limit: PER_PAGE_NEWS,
      orders: '-date',
    }
  })
  const data_newsCat = await client_news
  .get({
    endpoint: 'category',
    queries: {
      limit: 10,
    }
  })
  return {
    props: {
      gNav: data_navGlobal.contents,
      fNav: data_navFooter.contents,
      news: data_news.contents,
      newsCat: data_newsCat.contents,
      totalCount: data_news.totalCount,
      selCount: 1,
    },
  }
}
