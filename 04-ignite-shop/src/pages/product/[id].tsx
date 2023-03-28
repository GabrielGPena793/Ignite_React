import { stripe } from '@/src/lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '@/src/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  }
}

export default function Product({ product }: ProductProps) {

  const { isFallback } = useRouter()

  if(isFallback) {
    return <p>Loading...</p>
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt='' />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button>
          Comprar Agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

/* 
  É necessário usar o método getStaticPaths quando queremos criar versões státicas de paginas
  que são variáveis ex: [id].tsx, que vão criar varias paginas uma para cada produto.
  No método podemos passar alguns paths já na execução, tendo assim algumas paginas logo de 
  cara prontas no cache, e deixar o restante para que o método crie quando for preciso
  ex:  paths: [{id : 'idDaPage}]
  Também podemos deixar o array vazio e deixar que ele crie tudo sob demanda.

  Usamos também o fallback para termos acesso ao estado da page e saber se já foram concluídos
  a request dos dados, para que a pagina não tenha um carregamento antes desses dados sejam concluídos
  O fallback tem 3 valores
  false -> ele não espera e já trás a pagina antes da requisição podendo ocorrer um erro, caso a pagina não tenha sido carregada antes
  true -> ele me da acesso ao estado do pagina, que através do useRouter(), conseguimos pegar o isFallback, tendo assim o controle
          da pagina para colocarmos um load e previnir erros
  blocking -> Ele por si só já faz o bloqueio e só vai mostrar a pagina quando tiver tudo ok, porém pode demorar um pouco
*/

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params?.id as string;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const priceModel = product.default_price as Stripe.Price
  const price = priceModel.unit_amount ? priceModel.unit_amount / 100 : 0

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price),
        description: product.description,
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour 
  }
}