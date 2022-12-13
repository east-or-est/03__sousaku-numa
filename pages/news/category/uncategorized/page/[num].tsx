import { NextPage } from 'next'

import { client_news, client_nav } from '../../../../../lib/client'
import { PER_PAGE_NEWS, CAT_NONE_SLUG, CAT_NONE_NAME } from '../../../../../const/Blog/'

import Layout from '../../../../../components/templates/Layout'
import Pagination from '../../../../../components/templates/Pagination'
import PageTitle from '../../../../../components/molecules/PageTitle'
import NewsList from '../../../../../components/molecules/NewsList'


interface PageNewsCatNonePageIdProps {
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
  cat: [];
  catID: string;
}

interface PageNewsCatNonePageIdMapProps {
  id: string;
  title: string;
  description: [];
  date: string;
  categories: [];
  contents: [];
}


const PageNewsCatNonePageId: NextPage<PageNewsCatNonePageIdProps> = ({ gNav, fNav, news, totalCount, selCount }) => {

  const pageMeta = {
    title: `新着情報 | ${CAT_NONE_NAME} - ${selCount}ページ`,
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
          {news.map((json: PageNewsCatNonePageIdMapProps, index: number) =>
            <NewsList
              key={index}
              id={json.id}
              title={json.title}
              desc={json.categories}
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

export default PageNewsCatNonePageId


export async function getStaticPaths() {

  const data = await client_news
    .get({
      endpoint: 'category',
      queries: {
        limit: 40,
      }
    });

    const paths = [];

    for(let l = 0; l < data.totalCount; l++) {
      let data_post = await client_news
        .get({
          endpoint: 'posts',
          queries: {
            limit: 100,
            filters: `categories[not_exists]`,
          }
      });
      if (data_post.totalCount > 0) {
        let data_slug = data.contents[l].id.toString();
        paths.push({
          params: {
            category: data_slug,
            num: "1"
          }
        })
        for (let t = 1; t <= Math.floor(data_post.totalCount / PER_PAGE_NEWS) + 1; t++) {
          paths.push({
            params: {
              category: data_slug,
              num: (t + 1).toString()
            }
          })
        }
      }
    }
    return {
      paths,
      fallback: false
    }
}


export async function getStaticProps(context : any) {
  const id = context.params.num;
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
      limit: PER_PAGE_NEWS * 10,
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
      selCount: id,
    },
  }
}
