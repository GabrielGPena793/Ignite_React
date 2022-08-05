import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

// adicionando tipagem personalizada para o style-components dos nossos temas
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
