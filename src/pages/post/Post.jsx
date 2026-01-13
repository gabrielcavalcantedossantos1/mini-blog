//css
import styles from './Post.module.css'

//heact-router-dom
import { useParams } from 'react-router-dom'

//hooks
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { loadBundle } from 'firebase/firestore'

const Post = () => {
    const {id} = useParams()
    const {document:post, loading} = useFetchDocument('posts', id)
  return (
    <div className={styles.post_container}>
        {loading && <p>Carregando dados...</p>}

        {post && (
            <>
                <h1>{post.title}</h1>
                <img src={post.image} alt={post.title} />
                <p className={styles.body}>{post.body}</p>
                <h3>Este post trata sobre:</h3>
                <div className={styles.tags}>
                    {post.tagsArray.map(tag => (
                    <p key={tag}>
                        <span>#</span>
                        {tag}
                    </p>
                    ))}
                </div>
            </>
        )}
    </div>
  )
}

export default Post