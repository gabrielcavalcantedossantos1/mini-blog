// css
import styles from "./CreatePost.module.css"

// react
import { useState } from "react"

// react-router-dom
import { useNavigate } from "react-router-dom"

// context
import { useAuthValue } from "../../context/AuthContext"

// hooks
import { useInsertDocument } from "../../hooks/useInsertDocument"

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("") // agora é string
  const [formError, setFormError] = useState("")

  const { user } = useAuthValue()
  const navigate = useNavigate()

  const { insertDocument, response } = useInsertDocument("posts")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("")

    // validar URL da imagem
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL válida.")
      return
    }

    // criar array de tags
    const tagsArray = tags.split(',').map(tag => (
      tag.trim()
      .toLocaleLowerCase()
    ))

    //checar todos os valores
    if(!title || !image || !tagsArray || !body) {
      setFormError("Por favor, preencha todos os campos!")
    }

    if(formError) return

    await insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    })

    // redirecionar após criar post
    navigate("/")
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem que represente o seu post"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Use vírgula para separar as tags"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>

        {!response.loading && (
          <button className="btn">Cadastrar</button>
        )}

        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}

        {response.error && (
          <p className="error">{response.error}</p>
        )}

        {formError && (
          <p className="error">{formError}</p>
        )}
      </form>
    </div>
  )
}

export default CreatePost
