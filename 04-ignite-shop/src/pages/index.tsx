import Image from 'next/image'

import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, Product } from '../styles/pages/home'

import camiseta1 from '../assets/1.png'
import camiseta2 from '../assets/2.png'
import camiseta3 from '../assets/3.png'

import { stripe } from '../lib/stripe'
import { GetServerSideProps } from 'next'

import 'keen-slider/keen-slider.min.css';
import Stripe from 'stripe'

interface HomeProps {
  products:
  {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
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
    <HomeContainer ref={sliderRef} className='keen-slider'>
      {products.map(product => (
        <Product key={product.id} className='keen-slider__slide'>
          <Image src={product.imageUrl} width={520} height={480} alt='' />

          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
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
      price,
    }
  })

  return {
    props: {
      products
    }
  }
}