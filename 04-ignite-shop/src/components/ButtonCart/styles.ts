import { styled } from "@/src/styles";

export const ButtonCartContainer = styled('button', {
  padding: 12,
  backgroundColor: '$gray800',
  cursor: 'pointer',
  borderRadius: 6,
  border: 'none',
  transition: 'all 0.2s ease-in-out',
  lineHeight: 0,
  position: 'relative',

  '&:hover': {
    filter: 'brightness(1.35)',
  },

  span: {
    position: 'absolute',
    top: -7,
    right: -7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: 24,
    height: 24,
    backgroundColor: '$green500',
    fontSize: 14,
    color: '$white',
    fontWeight: 700,
    textAlign: 'center',

    outline: '3px solid $gray900',
    borderRadius: 20,
  }

})