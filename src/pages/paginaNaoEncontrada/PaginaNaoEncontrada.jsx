//css
import styles from "./PaginaNaoEncontrada.module.css"

// importaçoes
import { Link } from "react-router-dom"


const PaginaNaoEncontrada = () => {
  return (
    <div className={styles.containerError}>
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <p>Ops! A página que você está procurando não existe.</p>
      <Link to="/" >Voltar para Home</Link>
    </div>

  )
}

export default PaginaNaoEncontrada