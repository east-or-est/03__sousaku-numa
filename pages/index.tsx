import { NextPage } from 'next'

import { client_page, client_news, client_opt, client_nav } from '../lib/client'

import Layout from '../components/templates/Layout'
import MV from '../components/organisms/MV'
import ContentsNews from '../components/organisms/ContentsNews'
import ContentsTopics from '../components/organisms/ContentsTopics'
import BoxContents from '../components/molecules/BoxContents'


interface HomeProps {
  gNav: [];
  fNav: [];
  page: {
    colorType?: string | undefined;
    title: string;
    id: string;
    metas: HomePropsPropsPageMetas | '';
    contents: [];
  };
  news: [];
  blog: [];
  totalCount: number;
  conPrivate: {
    topContents: {
      news: boolean;
      topics: boolean;
    }
  };
}

interface HomePropsPropsPageMetas {
  title: string;
  desc: string;
}


const Home: NextPage<HomeProps> = ({ gNav, fNav, page, news, conPrivate }) => {
  return (
    <Layout gNav={gNav} fNav={fNav} pageID="top" pageMeta={page.metas ? page.metas : ''} colorType={page.colorType ? page.colorType : 'ピンク'}>
      <MV />
      <div className="page-content" data-headline-style="top">
        <div className="media-margin">
          { news && conPrivate.topContents.news !== true ?
            <ContentsNews
              contents={news}
            />
            :
            false
          }
          { news && conPrivate.topContents.topics !== true ?
            <ContentsTopics />
            :
            false
          }
          { page.contents ?
            <BoxContents
              contents={page.contents}
            />
            :
            false
          }
        </div>
      </div>
    </Layout>
  )
}


export default Home


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
  const data_pageTop = await client_page
  .get({
    endpoint: 'pages',
    queries: {
      offset: 0,
      limit: 1,
      ids: 'top'
    }
  })
  const data_news = await client_news
  .get({
    endpoint: 'posts',
    queries: {
      offset: 0,
      orders: '-date',
      limit: 3
    }
  })
  const data_optPrivate = await client_opt
  .get({
    endpoint: 'private'
  })
  return {
    props: {
      gNav: data_navGlobal.contents,
      fNav: data_navFooter.contents,
      page: data_pageTop.contents[0],
      news: data_news.contents,
      conPrivate: data_optPrivate,
    },
  }
}