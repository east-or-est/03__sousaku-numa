interface ImgProps {
  src: string;
  alt?: string;
}


function Img({ src, alt }: ImgProps) {
  return (
    <>
      <img src={src} alt={alt} />
    </>
  )
}


export default Img