import Head from 'next/head'
import { ReactNode } from 'react'

import { SITE_TITLE, SITE_DESC } from '../../../const/Meta/'

import Footer from '../../organisms/Footer/'
import Header from '../../organisms/Header/'


interface LayoutProps {
  children: ReactNode;
  gNav: [];
  fNav: [];
  pageID: string;
  pageMeta: LayoutPropsPageMeta | '';
  colorType: string;
}


interface LayoutPropsPageMeta {
  title: string;
  desc: string;
}


function Layout({ children, gNav, fNav, pageID, pageMeta, colorType }: LayoutProps) {
  return (
    <div data-page={pageID} data-color-type={colorType}>
      <Head>
        { pageMeta ?
          <>
            <title>{ pageMeta.title ? `${pageMeta.title} | ${SITE_TITLE}` : SITE_TITLE}</title>
            <meta
              name="title"
              content={ pageMeta.title ? `${pageMeta.title} | ${SITE_TITLE}` : SITE_TITLE}
            />
            <meta
              name="description"
              content={ pageMeta.desc ? `${pageMeta.desc} 〜 ${SITE_DESC}` : SITE_DESC}
            />
          </>
          :
          <>
            <title>{SITE_TITLE}</title>
            <meta
              name="title"
              content={SITE_TITLE}
            />
            <meta
              name="description"
              content={SITE_DESC}
            />
          </>
        }
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        gNav={gNav}
      />
      <main>
        {children}
      </main>
      <Footer
        fNav={fNav}
      />
    </div>
  )
}


export default Layout