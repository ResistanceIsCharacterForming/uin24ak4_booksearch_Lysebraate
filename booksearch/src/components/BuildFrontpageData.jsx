import { useState, useEffect } from 'react'

export default function BuildFrontpageData() {

    if (localStorage.getItem("frontpageData") === null) {

        let frontpageData = []

        const [responseData, setResponseData] = useState("")

        const getData = async(url)=> {
            fetch(url)
            .then(response => response.json())
            .then(data => setResponseData(data))
            .catch(error => console.error(error))
        }

        useEffect(() => {
            getData(`https://openlibrary.org/subjects/bond,_james_(fictitious_character),_fiction.json?limit=500`)
        },[])
    
        if (responseData !== "") {
            let allBooks = []
            let thisTitle = ""
            let thisAuthor = ""
            let thisSubject = ""
            let thisISBN = ""
            let averageRating = 0
            let thisKey = ""

            responseData.works.map((data) => {

                thisAuthor = data.authors[0].name

                thisTitle = data.title
                thisTitle = thisTitle.split("[")
                thisTitle = thisTitle[0]
                thisTitle = thisTitle.split("(")
                thisTitle = thisTitle[0]
                thisTitle = thisTitle.trim()

                thisKey = data.key

                data.subject.map((subject) => {

                    if ("availability" in data) {
                        thisISBN = (data.availability.isbn ? data.availability.isbn : "") 
                    } else {
                        thisISBN = ""
                    }

                    thisSubject = subject.toLowerCase()
                    if (thisSubject.includes("james") && thisSubject.includes("bond") && thisAuthor === "Ian Fleming" && data.first_publish_year !== null && data.cover_id !== null) {
                        allBooks.push({
                            "title": thisTitle,
                            "publication": data.first_publish_year,
                            "key": thisKey,
                            "ISBN": thisISBN,
                            "averageRating": averageRating,
                            "cover": `https://covers.openlibrary.org/b/isbn/${thisISBN}-L.jpg`,
                            "id_amazon": ""
                        })
                    }

                })

            })

            allBooks.sort(
                (a, b) => a.publication - b.publication
            );

            let placeholder = []

            allBooks.map((data) => {

                if (data.publication <= 1966) { 
                    const items = placeholder.filter(item => item.title.toLowerCase().indexOf(data.title.toLowerCase()) !== -1)

                    if (items.length === 0) {
                        placeholder.push(data)
                    }

                }

            })

            frontpageData = placeholder

            localStorage.setItem("frontpageData", JSON.stringify(frontpageData))
            
        }
    
    }
}