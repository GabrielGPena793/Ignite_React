import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import Image from 'next/image';

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app';
import Link from 'next/link';
import { ButtonCart} from '../components/ButtonCart';

// fica for do componente para não ser chamado toda vez que renderizar um componente
globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href={`/`}>
          <Image src={logoImg} alt="" />
        </Link>

        <ButtonCart/>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
