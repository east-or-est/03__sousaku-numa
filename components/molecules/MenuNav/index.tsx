import Link from 'next/link'


interface MenuNavProps {
  nav: [];
  menuType?: string | undefined;
  textAlign?: "center" | "left";
}

interface MenuNavMapProps {
  id: string;
  name: string;
  otherUrl: string;
}


function MenuNav({ nav, menuType = "" , textAlign = "left" } : MenuNavProps) {
  return (
    <ul className="parts-list_01" data-sp-text-align={textAlign}>
      { menuType === "top" ?
        <li>
          <Link
            href={{
              pathname:"/"
            }}
            passHref
          >
            TOP
          </Link>
        </li>
        : false
      }
      {nav.map((item: MenuNavMapProps, index: number) =>
        <li
          key={index}
          data-cat={item.id}
        >
          {
            item.otherUrl ?
            <>
              {
                item.otherUrl.match(/^https?:\/\/numa\.est-s\.net/gi) !== null ?
                <Link
                  href={{
                    pathname: item.otherUrl
                  }}
                  passHref
                >
                  {item.name}
                </Link>
                :
                <Link
                  href={{
                    pathname: item.otherUrl
                  }}
                  target="_blank" rel="noopener noreferrer"
                >
                  {item.name}
                </Link>
              }
            </>
            :
            <Link
              href={{
                pathname: "/" + item.id
              }}
              passHref
            >
              {item.name}
            </Link>
          }
        </li>
      )}
    </ul>
  )
}


export default MenuNav