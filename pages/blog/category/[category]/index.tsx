import { NextPage } from 'next'

import { client_blog, client_nav } from '../../../../lib/client'
import { PER_PAGE_BLOG } from '../../../../const/Blog/'

import Layout from '../../../../components/templates/Layout'
import ContentsPost from '../../../../components/organisms/ContentsPost'
import Pagination from '../../../../components/templates/Pagination'
import PageTitle from '../../../../components/molecules/PageTitle'
import CatNav from '../../../../components/molecules/CatNav'


interface PageBlogCatProps {
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
  cat: [];
  catID: string;
}

interface PageBlogCatMapProps {
  id: string;
  title: string;
  date: string;
  categories: [];
  contents: [];
  contents_more: [];
}


const PageBlogCat: NextPage<PageBlogCatProps> = ({ gNav, fNav, blog, blogCat, totalCount, selCount, cat, catID }) => {

  const catLabel: any = cat.filter((item : any) => item.id === catID);

  const pageMeta = {
    title: `ブログ | ${catLabel[0].name.toString()}カテゴリー`,
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
            selID={catID}
          />
          {blog.map((json: PageBlogCatMapProps, index: number) =>
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
          selCategory={catID}
          type="category"
        />
      </div>
    </Layout>
  )
}

export default PageBlogCat


export async function getStaticPaths() {
  const data = await client_blog
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
  const data_cat = await client_blog
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
  const data_blog = await client_blog
  .get({
    endpoint: 'posts',
    queries: {
      limit: PER_PAGE_BLOG * 10,
      orders: '-date',
      filters: `categories[contains]${id}`,
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
      cat: data_cat.contents,
      catID: id,
    },
  }
}
