import { NextPage } from 'next'

import { client_blog, client_nav } from '../../../../lib/client'
import { PER_PAGE_BLOG } from '../../../../const/Blog/'

import Layout from '../../../../components/templates/Layout'
import ContentsPost from '../../../../components/organisms/ContentsPost'
import Pagination from '../../../../components/templates/Pagination'
import PageTitle from '../../../../components/molecules/PageTitle'
import CatNav from '../../../../components/molecules/CatNav'


interface PageBlogTagProps {
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
  tag: [];
  tagID: string;
}

interface PageBlogTagMapProps {
  id: string;
  title: string;
  date: string;
  categories: [];
  contents: [];
  contents_more: [];
}


const PageBlogTag: NextPage<PageBlogTagProps> = ({ gNav, fNav, blog, blogCat, totalCount, selCount, tag, tagID }) => {

  const tagLabel: any = tag.filter((item : any) => item.id === tagID);

  const pageMeta = {
    title: `ブログ | ${tagLabel[0].name.toString()}タグ`,
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
          />
          {blog.map((json: PageBlogTagMapProps, index: number) =>
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
          selCategory={tagID}
          type="tag"
        />
      </div>
    </Layout>
  )
}

export default PageBlogTag


export async function getStaticPaths() {
  const data = await client_blog
    .get({
      endpoint: 'tag',
      queries: {
        limit: 40,
      }
    });

    const paths = data.contents.map( (content: any) => ({
      params: {
        tag: content.id.toString()
      }
    }));

    return {
      paths,
      fallback: false
    }
}


export async function getStaticProps(context : any) {
  const id = context.params.tag;
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
      limit: PER_PAGE_BLOG,
      orders: '-date',
      filters: `tags[contains]${id}`,
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
      tag: data_tag.contents,
      tagID: id,
    },
  }
}
