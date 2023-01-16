import { NextPage } from 'next'

import { client_blog, client_nav } from '../../lib/client'
import { PER_PAGE_BLOG } from '../../const/Blog/'

import Layout from '../../components/templates/Layout'
import ContentsPost from '../../components/organisms/ContentsPost'
import Pagination from '../../components/templates/Pagination'
import PageTitle from '../../components/molecules/PageTitle'
import CatNav from '../../components/molecules/CatNav'


interface PageBlogProps {
  gNav: [];
  fNav: [];
  blog: [];
  blogCat: [];
  totalCount: number;
  conPrivate: {
    topContents: {
      news: boolean;
      topics: boolean;
    }
  };
  selCount: number;
}

interface PageBlogMapProps {
  id: string;
  title: string;
  date: string;
  categories: [];
  contents: [];
  contents_more: [];
  author: string[];
  postimage: string[];
  tags: [];
}


const PageBlog: NextPage<PageBlogProps> = ({  gNav, fNav, blog, blogCat, totalCount, selCount }) => {

  const pageMeta = {
    title: "ブログ",
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
          <CatNav
            nav={blogCat}
            selID='ALL'
          />
          {blog.map((json: PageBlogMapProps) =>
            <ContentsPost
              key={json.id}
              title={json.title}
              date={json.date}
              category={json.categories}
              moreID={json.id}
              contents={json.contents}
              contents_more={json.contents_more}
              author={json.author}
              postimage={json.postimage}
              postPath="blog"
              tag={json.tags}
            />
          )}
        </div>
        <Pagination
          totalCount={totalCount}
          selCount={selCount}
        />
      </div>
    </Layout>
  )
}

export default PageBlog


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
  const data_blog = await client_blog
  .get({
    endpoint: 'posts',
    queries: {
      offset: 0,
      limit: PER_PAGE_BLOG,
      orders: '-date',
    }
  })
  const data_blogCat = await client_blog
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
      blog: data_blog.contents,
      blogCat: data_blogCat.contents,
      totalCount: data_blog.totalCount,
      selCount: 1,
    },
  }
}
