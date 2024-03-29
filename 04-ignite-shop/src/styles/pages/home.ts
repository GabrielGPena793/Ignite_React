import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,
})

export const Product = styled('div', {
  borderRadius: 8,
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,
  
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$lg',
      color: '$gray100'
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
      display: 'block',
    }
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }

})

export const ButtonAddCart = styled('button', {
  padding: 12,
  backgroundColor: '$green500',
  cursor: 'pointer',
  borderRadius: 6,
  border: 'none',
  transition: 'all 0.2s ease-in-out',
  lineHeight: 0,

  '&:hover': {
    backgroundColor: '$green300',
  }
 
})