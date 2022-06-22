import { Header } from "./components/Header"
import { Post } from "./Post"
import "./global.css"

export function App() {
  return (
    <div>
      <Header />

      <h1>Posts</h1>
      <Post
        author="Gabriel Gomes"
        conteudo="Aqui vai um conteudo do gabriel"
      />
      <Post
        author="Katutinha"
        conteudo="Aqui vai um conteudo da Katutinha"
      />
      <Post
        author="Carlos"
        conteudo="Aqui vai um conteudo do Carlos"
      />
    </div>
  )
}