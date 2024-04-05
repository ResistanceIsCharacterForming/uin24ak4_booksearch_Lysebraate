import { Link } from 'react-router-dom'

export default function Bookcard({ data, index }) {
    const amazonSearchPhrase = (data.id_amazon ? data.id_amazon : `${data.title} ${data.publication} ${data.author}`)

    return (
        <article className={`item ${(index === 99) ? "no-grow" : ""}`}>
            <div className="container">
                <h2>{data.title}</h2>
                <h3>By {data.author}</h3>
                <img src={data.cover}/>
                <p>Publication: {data.publication}</p>
                {(data.averageRating !== null) ? <p>Average Rating: {data.averageRating}</p> : null}
                {amazonSearchPhrase ? <Link to={`https://www.amazon.com/s?k=${amazonSearchPhrase}`} target="_blank"><p>Buy here (Amazon)</p></Link> : null}
                <Link to={`/information${data.key}`}><p>More information about this book</p></Link>
            </div>
        </article>
    )
}