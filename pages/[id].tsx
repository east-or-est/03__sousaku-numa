import { NextPage } from 'next'

import { client_blog, client_page, client_nav } from '../lib/client'

import Layout from '../components/templates/Layout'
import PageTitle from '../components/molecules/PageTitle'
import BoxContents from '../components/molecules/BoxContents'


interface PageIDProps {
  gNav: [];
  fNav: [];
  page: {
    colorType?: string | undefined;
    title: string;
    id: string;
    metas: PageIDPropsPageMetas | '';
    contents: [];
  };
}

interface PageIDPropsPageMetas {
  title: string;
  desc: string;
}


const PageID: NextPage<PageIDProps> = ({ gNav, fNav, page }) => {
  return (
    <Layout gNav={gNav} fNav={fNav} pageID={page.id} pageMeta={page.metas ? page.metas : ''} colorType={page.colorType ? page.colorType : 'ピンク'}>
      <PageTitle
        title={page.title}
        enTitle={page.id}
      />
      <div className="page-content" data-headline-style="page">
        <div className="media-margin">
          { page.contents ?
            <BoxContents
              contents={page.contents}
              postPath="page"
            />
            :
            false
          }
        </div>
      </div>
    </Layout>
  )
}

export default PageID;


export async function getStaticPaths() {
  const data = await client_page
    .get({
      endpoint: 'pages',
      queries: {
        limit: 30,
        filters: 'id[not_equals]top'
      }
    });
    const paths = data.contents.map( (content : any) => `/${content.id}`);
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
      limit: 10,
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
  const data_page = await client_page
  .get({
    endpoint: 'pages',
    contentId: id
  })
  const data_blogCat = await client_blog
  .get({
    endpoint: 'category',
    queries: {
      offset: 0,
      limit: 40,
    }
  })
  return {
    props: {
      gNav: data_navGlobal.contents,
      fNav: data_navFooter.contents,
      page: data_page,
      category: data_blogCat.contents,
    },
  }
}