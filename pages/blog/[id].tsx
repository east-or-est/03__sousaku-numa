import { NextPage } from 'next'
import Link from 'next/link'

import { client_blog, client_nav } from '../../lib/client'

import Layout from '../../components/templates/Layout'
import PostConetnt from '../../components/molecules/PostConetnt/'
import PageTitle from '../../components/molecules/PageTitle'
import NextPrev from '../../components/templates/NextPrev'
import PostMeta from '../../components/molecules/PostMeta'

import styles from './style.module.scss'

interface PageBlogIDProps {
  gNav: [];
  fNav: [];
  blog: {
    id: string;
    title: string;
    date: string;
    categories: [];
    tags: [];
    contents: [];
    contents_more: [];
  }
  blogPager: {
    contents: [];
  }
}


const PageBlogID: NextPage<PageBlogIDProps> = ({ gNav, fNav, blog, blogPager }) => {

  const pageMeta = {
    title: `ブログ - ${blog.title}`,
    desc: ""
  }

  return (
    <Layout gNav={gNav} fNav={fNav} pageID="blog" pageMeta={pageMeta} colorType='ピンク'>
      <>
      <PageTitle
        title={blog.title}
        date={blog.date}
      />
      <div className="page-content">
        <div className="media-margin">
          <PostConetnt
            contents={blog.contents}
            postPath="blog"
            border="none"
          />
          <PostConetnt
            contents={blog.contents_more}
            postPath="blog"
            border="none"
          />
        </div>
        <div className="media-margin">
          <PostMeta
            category={blog.categories}
            tag={blog.tags}
            postType="blog"
          />
          <footer className={styles.footer}>
            <NextPrev
              contents={blogPager.contents}
              slug={blog.id}
            />
            <div className="parts-btn_01">
              <Link href={{
                pathname:"/blog"
              }}>
                ブログ一覧へ戻る
              </Link>
            </div>
          </footer>
        </div>
      </div>
      </>
    </Layout>
  )
}

export default PageBlogID


export async function getStaticPaths() {
  const data = await client_blog
    .get({
      endpoint: 'posts',
      queries: {
        limit: 100,
      }
    });
    const paths = data.contents.map( (content : any) => `/blog/${content.id}`);
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
    contentId: id
  })
  const data_blogPager = await client_blog
  .get({
    endpoint: 'posts',
    queries: {
      limit: 100,
      orders: '-date',
      fields: 'id,title'
    }
  })
  return {
    props: {
      gNav: data_navGlobal.contents,
      fNav: data_navFooter.contents,
      blog: data_blog,
      blogPager: data_blogPager,
    },
  }
}
