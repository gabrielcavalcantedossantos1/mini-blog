// css
import styles from "./NavBar.module.css"

// react
import { useState } from "react"

// authentication
import { useAuthentication } from "../hooks/useAuthentication"

// context
import { useAuthValue } from "../context/AuthContext"

// react-router
import { NavLink } from "react-router-dom"

const NavBar = () => {
  
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClique = () => {
    setMenuOpen(false)
  }

  const { user } = useAuthValue()
  const { logout } = useAuthentication()

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand} onClick={handleClique}>
    
        Mini <span>Blog</span>
      </NavLink>

      <button
        className={styles.menu_btn}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menu"
        aria-expanded={menuOpen}
        >
            {menuOpen ? "✕" : "☰"}
        </button>


      <ul className={`${styles.links_list} ${menuOpen ? styles.open : ""}`}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""} onClick={handleClique}>
            Home
          </NavLink>
        </li>

        {!user ? (
          <>
            <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : ""} onClick={handleClique}>
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink to="/registro" className={({ isActive }) => isActive ? styles.active : ""} onClick={handleClique}>
                Cadastrar
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/posts/create" className={({ isActive }) => isActive ? styles.active : ""} onClick={handleClique}>
                Novo Post
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : ""} onClick={handleClique}>
                Dashboard
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ""} onClick={handleClique}>
            Sobre
          </NavLink>
        </li>

        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
