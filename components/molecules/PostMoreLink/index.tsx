import Link from 'next/link'


interface PostMoreLinkProps {
  moreID: string;
  more: boolean;
  postPath: "blog" | "page";
}


function PostMoreLink({ moreID, more, postPath }: PostMoreLinkProps) {
  return (
    <>
      { more === true ?
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
        : false
      }
    </>
  );
}


export default PostMoreLink