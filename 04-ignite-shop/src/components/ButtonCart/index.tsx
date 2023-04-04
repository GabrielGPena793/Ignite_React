import { Handbag } from '@phosphor-icons/react'
import { ButtonCartContainer } from './styles';

export function ButtonCart() {
  return (
    <ButtonCartContainer type='button'>
      <Handbag width={32} height={32} weight='bold' color='#8D8D99' />
      <span>1</span>
    </ButtonCartContainer>
  );
}