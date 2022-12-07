interface VideoProps {
  src: string;
}


function Video({ src }: VideoProps) {
  return (
    <>
      <video src={src} controls controlsList="nodownload"><p>このブラウザでは再生できません。videoタグに対応したブラウザが必要です。</p></video>
    </>
  )
}


export default Video