import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Bookcard from './Bookcard'

// Linje 6 til 149: Funksjon for å enten lage dataen til forsiden hvis det ikke finnes noen søk, eller å hente den dataen som har blitt søkt på 
export default function Searchresults() {
  
    // Linje 9: Hent slug-en fra URL-en kalt search.
    const { search } = useParams()

    // Linje 12: Sett opp en state som skal holde på arrayen hvilket har alle bøkene vi ønsker å vise.
    const [toDisplay, setToDisplay] = useState([])
    
    // Linje 15 til 104: Denne funksjonen var tiltenkt å være i en egen fil. Men dette viste seg vansklig. Så det å isolere den her som en egen funksjon virket akseptabelt som kompromi. Denne funksjonen henter og parser alle Bond bøkene. De 14 originale skrevet av Fleming.
    const buildFrontpageData = async () => {

        // Linje 18: Array hvilket skal holde bøkene.
        let frontpageData = []

        try {

            // Linje 23: For å være sikker på at alle Bond bøkene blir faktisk funnet benyttes denne lenken istedetfor et vanlig søk. Dette er også hvorfor det blir litt vrient med å måte bruke andre felt for å hente data.
            const response = await fetch(`https://openlibrary.org/subjects/bond,_james_(fictitious_character),_fiction.json?limit=500`)
            // Linje 25: Lagre json dataen vi får i svar fra siden.
            const toParse = await response.json()
            
            // Linje 28 til 31: Forskjellige variabler for å enklere holde på data fra feltene.
            let allBooks = []
            let thisTitle = ""
            let thisSubject = ""
            let thisAuthor = ""

            // Linke 34 til 67: Kjør en .map av all dataen vi får fra API-et.
            toParse.works.map((book) => {

                // Linje 37 til 42: Vi må brytte opp tittelen i tilfelle den inneholder [ eller (; Altså at den har en sub-title. Og til slutt bruker vi trim for å bli kvit "luft".
                thisTitle = book.title
                thisTitle = thisTitle.split("[")
                thisTitle = thisTitle[0]
                thisTitle = thisTitle.split("(")
                thisTitle = thisTitle[0]
                thisTitle = thisTitle.trim()

                thisAuthor = book.authors[0].name
    
                // Linje 47 til 65: For å være helt sikker på at dette faktisk er en bok om Bond kan vi undersøke arrayen subject. Så vi kjører en .map mot den.
                book.subject.map((subject) => {

                    // Linje 50 til 51: Hvis vi finner både strengen "james" og "bond" i samme subjekt, og boken har et tall for når den kom ut, og den er skrevet av Ian Fleming, samt at den har et cover bilde; Så vet vi at det er en av de 14 originale bøkene.
                    thisSubject = subject.toLowerCase()
                    if (thisSubject.includes("james") && thisSubject.includes("bond") && thisAuthor === "Ian Fleming" && book.first_publish_year !== null && book.cover_id !== null) {
                        // Linje 53 til 62: Legg til en ny bok i arrayen. Putt inn de feltene vi ønsker.
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

            // Linje 70 til 72: Dette er første steg i å avgjøre om listen vår har duplikater. Først må vi sortere den på år (publication).
            allBooks.sort(
                (a, b) => a.publication - b.publication
            )

            // Linje 75: Array for å mellomlagre resultater.
            let placeholder = []

            // Linje 78 til 92: Tanken her er at hvis vi går utifra år, så vet vi at bare den første boken med en tittel er riktig. Som er hvorfor vi må renske tittelen tidligere. Slik at hvis eksempelvis vi legger in Casino Royal, og finner en til kalt Casino Royal, vet vi at nummer to er en duplikat. 
            allBooks.map((book) => {

                // Linje 81 til 90: Siste Bond boken til Fleming ble skrevet i '66, så alt etter det blir feil.
                if (book.publication <= 1966) { 
                    // Linje 83: Som nevnt ovenfor. Vi undersøker for hver tittle om den samme tittlen finnes fra før i arrayen.
                    const items = placeholder.filter(item => item.title.toLowerCase().indexOf(book.title.toLowerCase()) !== -1)

                    // Linje 86 til 88: Hvis items sin lengde er 0 betyr det at denne tittlen ikke er i listen vår og vi skal legge den til.
                    if (items.length === 0) {
                        placeholder.push(book)
                    }

                }

            })

            // Line 95 til 99: Overskriv frontpageData arrayen med riktig data. Deretter lagrer vi denne daten i localStorage. Dette er så vi ikke trenger å hente den hver gang forsiden lastes. Til slutt oppdaterer vi staten slik at Bond bøkene kan presenteres for brukeren.
            frontpageData = placeholder

            localStorage.setItem("frontpageData", JSON.stringify(frontpageData))
            
            setToDisplay(JSON.parse(localStorage.getItem("frontpageData")))
            
        } catch {
            console.log("An error occurred conducting a search.")
        }
    }

    // Linje 107 til 162: Dette er funksjonen som håndterer generelle søk.
    const getData = async () => {

        // Linje 110 til 119: Hvis search er undefined, altså tomt eller vi er på forsiden.
        if (search === undefined) {

            // Linje 113 til 117: Hvis Bond bøken er i localstorage hent dem. Hvis ikke kjør buildFrontpageData funksjonen for å lage/hente dem.
            if (localStorage.getItem("frontpageData") !== null) {
                setToDisplay(JSON.parse(localStorage.getItem("frontpageData")))
            } else {
                await buildFrontpageData()            
            }

        } else {
            
            try {

                // Linje 124: Her forsøker vi å hente en gitt søke resultat utifra search slug-en.
                const response = await fetch(`https://openlibrary.org/search.json?q=${search}`)
                const data = await response.json()

                let books = []

                // Linje 130 til 152: Gå gjennom books arrayen hvilket har daten vi forsøkte å hente.
                data.docs.map((book) => {

                    // Linje 133 til 139: Noen bøker har flere forfattere. For å gjøre det enkelt blir bare den første forfatterens navn tatt med. Men finnes det flere forfattere legges "et al." til etter det første navnet.
                    let author = ""
                    if ("author_name" in book) {
                        author = book.author_name[0]
                        if (book.author_name.length > 1) {
                            author += ", et al."
                        }
                    }

                    // Linje 142 til 151: Legg til denne boken i arrayen med ønsket felt. 
                    books.push({
                        "title": book.title,
                        "author" : author,
                        "publication": book.first_publish_year,
                        "key": book.key,
                        "ISBN": ("isbn" in book) ? book.isbn[0] : "",
                        "averageRating": book.ratings_average,
                        "cover": ("cover_i" in book) ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "https://placehold.co/400x400",
                        "id_amazon": ("id_amazon" in book) ? book.id_amazon[0] : null
                    })
                })

                // Linje 155: Oppdater staten slik at vi får tilgang til arrayen.
                setToDisplay(books)

            } catch {
                console.log("An error occurred conducting a search.")
            }
                
        }
    }

    // Line 165 til 167: useEffect brukes her for å kalle getData riktig siden det er en asynkron funksjon.
    useEffect(() => {
        getData();
    }, [])
    
    // Linje 170 til 178: Sett opp selve grid-en med alle bøkene som enten er Bond eller søke resultalter. Hver bok blir håndtert av Bookcard, hvilket returnere sin JSX/HTML hitt. Loading kommer opp mens dataen blir hentet.
    return (
        <main className="grid">
            {(toDisplay.length > 0)
            ?
            toDisplay.map((data, index) => <Bookcard key={`book-${index}`} data={data} index={index} />)
            :
            <h2 className="loading">Loading ...</h2>}
        </main>
    )
}