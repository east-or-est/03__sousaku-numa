import { NextPage } from 'next'

import { client_blog, client_nav } from '../../../../lib/client'
import { PER_PAGE_BLOG } from '../../../../const/Blog/'
import { CAT_NONE_SLUG, CAT_NONE_NAME } from '../../../../const/Blog'

import Layout from '../../../../components/templates/Layout'
import ContentsPost from '../../../../components/organisms/ContentsPost'
import Pagination from '../../../../components/templates/Pagination'
import PageTitle from '../../../../components/molecules/PageTitle'


interface PageBlogCatNoneProps {
  gNav: [];
  fNav: [];
  blog: [];
  totalCount: number;
  conPrivate: {
    topContents: {
      news: boolean;
      topics: boolean;
    }
  };
  selCount: number;
  catID: string;
}

interface PageBlogCatNoneMapProps {
  id: string;
  title: string;
  date: string;
  categories: [];
  contents: [];
  contents_more: [];
}


const PageBlogCatNone: NextPage<PageBlogCatNoneProps> = ({ gNav, fNav, blog, totalCount, selCount }) => {

  const pageMeta = {
    title: `ブログ | ${CAT_NONE_NAME}カテゴリー`,
    desc: ""
  }

  return (
    <Layout gNav={gNav} fNav={fNav} pageID="blog" pageMeta={pageMeta} colorType='ピンク'>
      <PageTitle
        title={pageMeta.title}
        enTitle="blog"
      />
      <div className="page-content">
        <div className="media-margin">
          {blog.map((json: PageBlogCatNoneMapProps, index: number) =>
            <ContentsPost
              key={index}
              title={json.title}
              date={json.date}
              category={json.categories}
              moreID={json.id}
              contents={json.contents}
              contents_more={json.contents_more}
              postPath="blog"
            />
          )}
        </div>
        <Pagination
          totalCount={totalCount}
          selCount={selCount}
          selCategory={CAT_NONE_SLUG}
          type="category"
        />
      </div>
    </Layout>
  )
}

export default PageBlogCatNone


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
  const data_blog = await client_blog
  .get({
    endpoint: 'posts',
    queries: {
      limit: PER_PAGE_BLOG * 10,
      orders: '-date',
      filters: `categories[not_exists]`,
    }
  })
  return {
    props: {
      gNav: data_navGlobal.contents,
      fNav: data_navFooter.contents,
      blog: data_blog.contents,
      totalCount: data_blog.totalCount,
      selCount: 1,
    },
  }
}
