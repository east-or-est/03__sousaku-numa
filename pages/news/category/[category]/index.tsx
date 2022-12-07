import { NextPage } from 'next'

import { client_news, client_nav } from '../../../../lib/client'
import { PER_PAGE_NEWS } from '../../../../const/Blog/'

import Layout from '../../../../components/templates/Layout'
import Pagination from '../../../../components/templates/Pagination'
import PageTitle from '../../../../components/molecules/PageTitle'
import NewsList from '../../../../components/molecules/NewsList'
import CatNav from '../../../../components/molecules/CatNav'


interface PageNewsCatProps {
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
  cat: [];
  catID: string;
}

interface PageNewsCatMapProps {
  id: string;
  title: string;
  description: [];
  date: string;
  categories: [];
  contents: [];
}


const PageNewsCat: NextPage<PageNewsCatProps> = ({ gNav, fNav, news, newsCat, totalCount, selCount, cat, catID }) => {

  const catLabel: any = cat.filter((item : any) => item.id === catID);

  const pageMeta = {
    title: `新着情報 | ${catLabel[0].name.toString()}`,
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
            selID={catID}
            postType="news"
          />
          {news.map(( json: PageNewsCatMapProps, index: number ) =>
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
          selCategory={catID}
          type="category"
          parPage={PER_PAGE_NEWS}
          postPath="news"
        />
      </div>
    </Layout>
  )
}

export default PageNewsCat


export async function getStaticPaths() {
  const data = await client_news
    .get({
      endpoint: 'category',
      queries: {
        limit: 40,
      }
    });

    const paths = data.contents.map( (content: any) => ({
      params: {
        category: content.id.toString()
      }
    }));

    return {
      paths,
      fallback: false
    }
}


export async function getStaticProps(context : any) {
  const id = context.params.category;
  const data_cat = await client_news
  .get({
    endpoint: 'category',
    queries: {
      offset: 0,
      limit: 40,
    }
  })
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
      filters: `categories[contains]${id}`,
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
      cat: data_cat.contents,
      catID: id,
    },
  }
}
