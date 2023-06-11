import React from 'react'
import {
  useState, useEffect
} from 'react'

import FrameList from '../../molecules/FrameList';

import styles from './style.module.scss'



interface FrameProps {
  urlSel: string;
}


interface FrameFetchProps {
  id: number;
  date: string;
  comment: string;
}



function Frame({ urlSel = '' } : FrameProps) {

  const [ data, setData ] = useState<FrameFetchProps>();

    useEffect(() => {
    
      async function fetchData() {
        const response = await fetch(urlSel, {
          method: 'GET',
          headers: {
            'Content-Type': 'text/html'
          },
        })
        .then( ( res ) =>  {
          if( !res.ok ) {
            console.log('サーバーエラー')
          }
          return res.text()
        })
        .then( ( data ) => {
          const parser = new DOMParser();
          const html = parser.parseFromString(data, 'text/html');
          const array : any = [];
          const log = html.getElementsByClassName('onelogbox');
          for (let i = 0; i < 10; i++) {
            let date = log[i].getElementsByClassName('postdate')[0] as HTMLElement;
            let dateTxt = date.innerText;
            let dateProp = dateTxt.substring(0,dateTxt.indexOf(' '));
            let comment = log[i].getElementsByClassName('comment')[0] as HTMLElement;
            let commentProp = comment.innerText;
            array.push({ id: i+1, date: dateProp, comment: commentProp })
          }
          setData(array)
        })
        .catch( ( error ) => {
          console.error('読み込みに失敗しました(´・ω・｀)', error)
        })
      }
      fetchData();
    },[])



    return (
      <div className={styles.box}>
        <FrameList
          box={data}
          link="https://memo.est-s.net/hoge1/"
        />
      </div>
    )
  

}


export default Frame