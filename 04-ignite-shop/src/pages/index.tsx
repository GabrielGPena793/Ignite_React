import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import { useKeenSlider } from 'keen-slider/react'
import { Handbag } from '@phosphor-icons/react'

import { ButtonAddCart, HomeContainer, Product } from '../styles/pages/home'

import { stripe } from '../lib/stripe'
import { GetStaticProps } from 'next'

import 'keen-slider/keen-slider.min.css';
import Stripe from 'stripe'

interface HomeProps {
  products:
  {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}

export default function Home({ products }: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    }
  })

  return (
    <>
      {/*
         Conseguimos colocar um head em cada componente para configuramos melhor cada pagina,
        com isso temos uma melhora no SO do google, o head irá substituir as informações do Head padrão,
        com isso conseguimos definir melhor cada pagina
      */}
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className='keen-slider'>
        {products.map(product => (
          <Product key={product.id} className='keen-slider__slide'>
            <Image src={product.imageUrl} width={520} height={480} alt='' />

            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </div>

              <Link href={`/product/${product.id}`} prefetch={false}>
                <ButtonAddCart type='button'>
                  <Handbag width={24} height={24} weight='bold' color='#fff' />
                </ButtonAddCart>
              </Link>

            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  )
}

/* 
  Usar o getStaticProps para uma pagina que vá ser igual para todos os usuários.
  Caso a pagina dependa de uma informação do contexto de execução da pagina: cookie, usuário logado, alguma informação em tempo real
  não é o ideal ter uma pagina gerada staticamente.
  - usar o revalidate, no retorno da função, indica o tempo que a pagina irá ser 
    atualizada com novos dados.

  usar o getServerSideProps para fazer requests do lado do servidor, bom para ter 
  um bom indexização do site, trazendo o conteúdo apenas quando tiver os dados
  definidos.
*/

export const getStaticProps: GetStaticProps = async () => {
  // expand: serve para adicionar o relacionamento que o produto tem com o preço no stripe
  // isso serve para qualquer relação que tem no stripe, como é uma lista o data sempre vem antes
  // se não fosse, caso fosse apenas um produto acessaríamos diretamente a chave do relacionamento
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {

    const priceModel = product.default_price as Stripe.Price
    const price = priceModel.unit_amount ? priceModel.unit_amount / 100 : 0

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}