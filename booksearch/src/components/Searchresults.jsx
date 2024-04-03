import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Bookcard from './Bookcard'

export default function Searchresults() {
  
    const { search } = useParams()

    const [toDisplay, setToDisplay] = useState([])
    
    const buildFrontpageData = async () => {

        let frontpageData = []

        try {

            const response = await fetch(`https://openlibrary.org/subjects/bond,_james_(fictitious_character),_fiction.json?limit=500`)
            const toParse = await response.json()
            
            let allBooks = []
            let thisTitle = ""
            let thisSubject = ""
            let thisAuthor = ""

            toParse.works.map((book) => {

                thisTitle = book.title
                thisTitle = thisTitle.split("[")
                thisTitle = thisTitle[0]
                thisTitle = thisTitle.split("(")
                thisTitle = thisTitle[0]
                thisTitle = thisTitle.trim()

                thisAuthor = book.authors[0].name

                book.subject.map((subject) => {

                    thisSubject = subject.toLowerCase()
                    if (thisSubject.includes("james") && thisSubject.includes("bond") && thisAuthor === "Ian Fleming" && book.first_publish_year !== null && book.cover_id !== null) {
                        allBooks.push({
                            "title": thisTitle,
                            "author" : thisAuthor,
                            "publication": book.first_publish_year,
                            "key": book.key,
                            "ISBN": ("availability" in book) ? book.availability.isbn : "",
                            "averageRating": null,
                            "cover": ("cover_id" in book) ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : "https://placehold.co/400x400",
                            "id_amazon": null
                        })
                    }

                })

            })

            allBooks.sort(
                (a, b) => a.publication - b.publication
            );

            let placeholder = []

            allBooks.map((book) => {

                if (book.publication <= 1966) { 
                    const items = placeholder.filter(item => item.title.toLowerCase().indexOf(book.title.toLowerCase()) !== -1)

                    if (items.length === 0) {
                        placeholder.push(book)
                    }

                }

            })

            frontpageData = placeholder

            localStorage.setItem("frontpageData", JSON.stringify(frontpageData))
            
            setToDisplay(JSON.parse(localStorage.getItem("frontpageData")))
            
        } catch {
            console.log("An error occurred conducting a search.")
        }
    }

    const getData = async () => {

        if (search === undefined) {

            if (localStorage.getItem("frontpageData") !== null) {
                setToDisplay(JSON.parse(localStorage.getItem("frontpageData")))
            } else {
                await buildFrontpageData()            
            }

        } else {

            try {

                const response = await fetch(`https://openlibrary.org/search.json?q=${search}`)
                const data = await response.json()

                let books = []

                data.docs.map((book) => {

                    books.push({
                        "title": book.title,
                        "author" : ("author_name" in book) ? book.author_name[0] : "",
                        "publication": book.first_publish_year,
                        "key": book.key,
                        "ISBN": ("isbn" in book) ? book.isbn[0] : "",
                        "averageRating": book.ratings_average,
                        "cover": ("cover_i" in book) ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "https://placehold.co/400x400",
                        "id_amazon": ("id_amazon" in book) ? book.id_amazon[0] : null
                    })
                })

                setToDisplay(books)

            } catch {
                console.log("An error occurred conducting a search.")
            }
                
        }
    }

    useEffect(() => {
        getData();
      }, [])

    return (
        <main>
            {(toDisplay.length > 0)
            ?
            toDisplay.map((data, index) => <Bookcard key={`book-${index}`} data={data} />)
            :
            <h3>Loading ...</h3>}
        </main>
    )
}