import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Bookinformation() {
    const { id } = useParams()

    const [thisBook, setThisBook] = useState(
        {"covers": [],
        "subjects": [],
        "subjectsPeople": []}
    )

    let searchTerm = undefined

    if (localStorage.getItem("searchTerm") !== null && localStorage.getItem("searchTerm") !== "") {
        searchTerm = localStorage.getItem("searchTerm")
    }

    const getData = async () => {

        const response = await fetch(`https://openlibrary.org/works/${id}.json`)
        const data = await response.json()

        let description = ""
        
        if ("description" in data && typeof data.description !== "string" && "value" in data.description) {
            description = data.description.value
        } else if ("description" in data) {
            description = data.description
        }
        
        setThisBook({
            "title": data.title,
            "description": description,
            "covers": data.covers,
            "subjects": data.subjects,
            "subjectsPeople": data.subject_people
        })
    }

    useEffect(() => {
        getData();
    }, [])
    
    return (
        <article>
            {(searchTerm !== undefined)
            ?
            <Link to={`/search/${searchTerm}`}><p>Back</p></Link>
            :
            null}
            <h2>{thisBook?.title}</h2>
            <p>{thisBook?.description}</p>
            <h3>Covers:</h3>
            {thisBook?.covers.map((cover, index) => <img key={`cover+${index}`} src={`https://covers.openlibrary.org/b/id/${cover}-L.jpg`}/>)}
            <h3>Subjects:</h3>
            <ul>{thisBook?.subjects.map((subject, index) => <li key={`subject+${index}`}><p>{subject}</p></li>)}</ul>
            <h3>Subjects (People):</h3>
            <ul>{thisBook?.subjectsPeople.map((subjectPeople, index) => <li key={`subjectPeople+${index}`}><p>{subjectPeople}</p></li>)}</ul>
        </article>
    )
} 