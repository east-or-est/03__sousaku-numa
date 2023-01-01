import Link from 'next/link'


interface PostMoreLinkProps {
  moreID: string;
  postPath: "blog" | "page";
}


function PostMoreLink({ moreID, postPath }: PostMoreLinkProps) {
  return (
    <>
      <div className="parts-btn_01">
        <Link
          href={{
            pathname: `/${postPath}/${moreID}`
          }}
          passHref
        >
          続きを読む
        </Link>
      </div>
    </>
  );
}


export default PostMoreLink