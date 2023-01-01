import { NextPage } from 'next'

import { client_blog, client_nav } from '../../../../../lib/client'
import { PER_PAGE_BLOG, CAT_NONE_SLUG, CAT_NONE_NAME } from '../../../../../const/Blog/'

import Layout from '../../../../../components/templates/Layout'
import ContentsPost from '../../../../../components/organisms/ContentsPost'
import Pagination from '../../../../../components/templates/Pagination'
import PageTitle from '../../../../../components/molecules/PageTitle'


interface PageBlogCatNonePageIdProps {
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
  cat: [];
  catID: string;
}

interface PageBlogCatNonePageIdMapProps {
  id: string;
  title: string;
  date: string;
  categories: [];
  contents: [];
  contents_more: [];
}


const PageBlogCatNonePageId: NextPage<PageBlogCatNonePageIdProps> = ({ gNav, fNav, blog, totalCount, selCount }) => {

  const pageMeta = {
    title: `ブログ | ${CAT_NONE_NAME}カテゴリー - ${selCount}ページ`,
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
          {blog.map((json: PageBlogCatNonePageIdMapProps, index: number) =>
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

export default PageBlogCatNonePageId


export async function getStaticPaths() {

  const data = await client_blog
    .get({
      endpoint: 'category',
      queries: {
        limit: 40,
      }
    });

    const paths = [];

    for(let l = 0; l < data.totalCount; l++) {
      let data_post = await client_blog
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
        for (let t = 1; t <= Math.floor(data_post.totalCount / PER_PAGE_BLOG) + 1; t++) {
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
  const data_blog = await client_blog
  .get({
    endpoint: 'posts',
    queries: {
      offset: (id - 1) * PER_PAGE_BLOG,
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
      selCount: id,
    },
  }
}
