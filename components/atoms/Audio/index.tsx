interface AudioProps {
  src: string;
}


function Audio({ src }: AudioProps) {
  return (
    <>
      <audio src={src} controls controlsList="nodownload"><p>このブラウザでは再生できません。audioタグに対応したブラウザが必要です。</p></audio>
    </>
  )
}


export default Audio