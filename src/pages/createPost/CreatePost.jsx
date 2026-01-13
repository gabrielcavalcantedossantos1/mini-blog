// css
import styles from "./CreatePost.module.css";

// react
import { useState } from "react";

// hooks
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

// react-router-dom
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase());

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento!</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            placeholder="Pense em um bom título"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            placeholder="URL da imagem"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea
            placeholder="Insira o conteúdo do post"
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input
            type="text"
            placeholder="react, javascript, firebase"
            required
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>

        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
