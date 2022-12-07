import { NextPage } from 'next'
import Link from 'next/link'

import { client_nav } from '../lib/client'

import styles from './error.module.scss'

import Layout from '../components/templates/Layout/'
import Headline from '../components/atoms/Headline'


interface Err404Props {
  gNav: [];
  fNav: [];
}


const Err404: NextPage<Err404Props> = ({ gNav, fNav }) => {

  const pageMeta = {
    title: "ページが見つかりません",
    desc: ""
  }

  return (
    <Layout gNav={gNav} fNav={fNav} pageID="error" pageMeta={pageMeta} colorType='ピンク'>
      <div className={styles.main}>
        <div className="page-content" data-headline-style="error">
          <div className="media-margin">
            <Headline
              Component="h1"
              text="404エラー！！！"
            />
            <div>
              <p className="tc">
                見つからない。。
              </p>
              <div className="parts-btn_01">
                <Link href={{
                  pathname:"/"
                }}>
                  TOPページへ戻る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}


export default Err404


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
  return {
    props: {
      gNav: data_navGlobal.contents,
      fNav: data_navFooter.contents,
    },
  }
}