import { NextPage } from 'next'

import { client_blog, client_nav } from '../../../../../lib/client'
import { PER_PAGE_BLOG } from '../../../../../const/Blog/'

import Layout from '../../../../../components/templates/Layout'
import ContentsPost from '../../../../../components/organisms/ContentsPost'
import Pagination from '../../../../../components/templates/Pagination'
import PageTitle from '../../../../../components/molecules/PageTitle'


interface PageBlogTagIdPageIdProps {
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
  tag: [];
  tagID: string;
}

interface PageBlogTagIdPageIdMapProps {
  id: string;
  title: string;
  date: string;
  categories: [];
  contents: [];
  read_more: boolean;
}


const PageBlogTagIdPageId: NextPage<PageBlogTagIdPageIdProps> = ({ gNav, fNav, blog, totalCount, selCount, tag, tagID }) => {

  const tagLabel: any = tag.filter((item : any) => item.id === tagID);

  const pageMeta = {
    title: `ブログ | ${tagLabel[0].name.toString()}タグ - ${selCount}ページ`,
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
          {blog.map((json: PageBlogTagIdPageIdMapProps, index: number) =>
            <ContentsPost
              key={index}
              title={json.title}
              date={json.date}
              category={json.categories}
              moreID={json.id}
              more={json.read_more}
              contents={json.contents}
              postPath="blog"
            />
          )}
        </div>
        <Pagination
          totalCount={totalCount}
          selCount={selCount}
          selCategory={tagID}
          type="tag"
        />
      </div>
    </Layout>
  )
}

export default PageBlogTagIdPageId


export async function getStaticPaths() {

  const data = await client_blog
    .get({
      endpoint: 'tag',
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
            filters: `tags[contains]${data.contents[l].id}`,
          }
      });
      if (data_post.totalCount > 0) {
        let data_slug = data.contents[l].id.toString();
        paths.push({
          params: {
            tag: data_slug,
            num: "1"
          }
        })
        for (let t = 1; t <= Math.floor(data_post.totalCount / PER_PAGE_BLOG) + 1; t++) {
          paths.push({
            params: {
              tag: data_slug,
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
  const slug = context.params.tag;
  const data_tag = await client_blog
  .get({
    endpoint: 'tag',
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
  const data_blog = await client_blog
  .get({
    endpoint: 'posts',
    queries: {
      offset: (id - 1) * PER_PAGE_BLOG,
      limit: PER_PAGE_BLOG,
      orders: '-date',
      filters: `tags[contains]${slug}`,
    }
  })
  return {
    props: {
      gNav: data_navGlobal.contents,
      fNav: data_navFooter.contents,
      blog: data_blog.contents,
      totalCount: data_blog.totalCount,
      selCount: id,
      tag: data_tag.contents,
      tagID: slug,
    },
  }
}
