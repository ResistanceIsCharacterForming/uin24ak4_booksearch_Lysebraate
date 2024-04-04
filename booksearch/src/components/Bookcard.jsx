import { Link } from 'react-router-dom'

export default function Bookcard({ data }) {
    const amazonSearchPhrase = (data.id_amazon ? data.id_amazon : `${data.title} ${data.publication} ${data.author}`)

    return (
        <article>
            <h2>{data.title}</h2>
            <h3>By {data.author}</h3>
            <img src={data.cover}/>
            <p>Publication: {data.publication}</p>
            {(data.averageRating !== null) ? <p>Average Rating: {data.averageRating}</p> : null}
            {amazonSearchPhrase ? <Link to={`https://www.amazon.com/s?k=${amazonSearchPhrase}`} target="_blank"><p>Buy here</p></Link> : null}
            <Link to={`/information${data.key}`}><p>More information</p></Link>
        </article>
    )
}