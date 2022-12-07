import Link from 'next/link'

import Logo from '../../atoms/Logo'


function LogoLink() {
  return (
    <Link
      href={{
        pathname:"/"
      }}
      passHref
    >
      <Logo />
    </Link>
  )
}


export default LogoLink