import { NextPage } from 'next'

import { client_blog, client_nav } from '../../../lib/client'
import { PER_PAGE_BLOG } from '../../../const/Blog/'

import Layout from '../../../components/templates/Layout'
import ContentsPost from '../../../components/organisms/ContentsPost'
import Pagination from '../../../components/templates/Pagination'
import PageTitle from '../../../components/molecules/PageTitle'


interface PageBlogPageIdProps {
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

interface PageBlogPageIdMapProps {
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


const PageBlogPageId: NextPage<PageBlogPageIdProps> = ({ gNav, fNav, blog, totalCount, selCount }) => {
  return (
    <Layout gNav={gNav} fNav={fNav} pageID="blog" pageMeta='' colorType='ピンク'>
      <PageTitle
        title={`ブログ - ${selCount}ページ`}
        enTitle="blog"
      />
      <div className="page-content">
        <div className="media-margin">
          {blog.map((json: PageBlogPageIdMapProps, index: number) =>
            <ContentsPost
              key={index}
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

export default PageBlogPageId;


export async function getStaticPaths() {

  const data = await client_blog
    .get({
      endpoint: 'posts',
      queries: {
        limit: 100,
      }
    });

    const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

    const paths = range(1, Math.ceil(data.totalCount / PER_PAGE_BLOG)).map((repo) => `/blog/page/${repo}`);
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
  const data_blog = await client_blog
  .get({
    endpoint: 'posts',
    queries: {
      offset: (id - 1) * PER_PAGE_BLOG,
      limit: PER_PAGE_BLOG,
      orders: '-date',
    }
  })
  return {
    props: {
      gNav: data_navGlobal.contents,
      fNav: data_navFooter.contents,
      blog: data_blog.contents,
      totalCount: data_blog.totalCount,
      selCount: id,
    },
  }
}
