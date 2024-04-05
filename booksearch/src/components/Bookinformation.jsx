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

        try {

            const response = await fetch(`https://openlibrary.org/works/${id}.json`)
            const data = await response.json()
            
            let description = ""
            
            if ("description" in data && typeof data.description !== "string" && "value" in data.description) {
                description = data.description.value
            } else if ("description" in data) {
                description = data.description
            }

            let covers = []
            if ("covers" in data) {
                data.covers = covers
            }
            let subjects = []
            if ("subjects" in data) {
                subjects = data.subjects
            }

            let subject_people = []
            if ("subject_people" in data) {
                subject_people = data.subject_people
            }
            
            setThisBook({
                "title": data.title,
                "description": description,
                "covers": covers,
                "subjects": subjects,
                "subjectsPeople": subject_people,
            })

        } catch {
            console.log("An error occurred conducting a search.")
        }

    }

    useEffect(() => {
        getData();
    }, [])
    
    return (
        <main>
            <article className="information">
                {(searchTerm !== undefined)
                ?
                <Link to={`/search/${searchTerm}`}><p>Back</p></Link>
                :
                null}
                <h2>{thisBook?.title}</h2>
                <p className="box">{thisBook?.description}</p>
                {(thisBook.covers.length > 0) ? <h3>Covers:</h3> : null}
                <span className="covers">{thisBook?.covers.map((cover, index) => <img key={`cover+${index}`} src={`https://covers.openlibrary.org/b/id/${cover}-L.jpg`}/>)}</span>
                {(thisBook.subjects.length > 0) ? <h3>Subjects:</h3> : null}
                <ul className="box">{thisBook?.subjects.map((subject, index) => <li key={`subject+${index}`}><p>{subject}</p></li>)}</ul>
                {(thisBook.subjectsPeople.length > 0) ? <h3>Subjects (People):</h3> : null}
                <ul className="box">{thisBook?.subjectsPeople.map((subjectPeople, index) => <li key={`subjectPeople+${index}`}><p>{subjectPeople}</p></li>)}</ul>
            </article>
        </main>
    )
} 