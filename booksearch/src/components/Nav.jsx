import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    
    // Linje 7: Hent verdien til slug-en search.
    const { search } = useParams()
    
    // Linje 11: Avgjør om vi er på resultatsiden eller ikke.
    const onSearchPage = ((window.location.pathname.includes("search")) ? true : false)

    const [input, setInput] = useState("")
    const navigate = useNavigate()

    // Line 17: State som brukes for å unngå at localStorage blir kalt flere ganger enn en.
    const [refreshed, setRefreshed] = useState(true)

    // Linje 20 til 38: searchTerm er hva brukeren skrev sist. Vi gjør en del inviklet men nødvendig if-else testing her for å avgjøre a) vi har en verdi å jobbe med, og b) om vi må gjøre om searchTerm fordi den ikke stemmer med slug-en search. Altså at brukeren har landet på denne siden fra utsiden; Å følge en lenke.
    if (localStorage.getItem("searchTerm") === null && refreshed) {
        localStorage.setItem("searchTerm", "")
        setRefreshed(false)
    } else {
        let searchTerm = localStorage.getItem("searchTerm")

        if (search !== undefined && search !== searchTerm) {
            searchTerm = search
            localStorage.setItem("searchTerm", searchTerm.replaceAll(" ", "+"))
        } else if (search === undefined && onSearchPage) {
            searchTerm = ""
            localStorage.setItem("searchTerm", searchTerm)
        }

        if (input === "" && searchTerm !== "" && refreshed) {
            setInput(searchTerm.replaceAll("+", " "))
            setRefreshed(false) 
        }
    }

    // Linje 41 til 43: Oppdater staten input med verdien til input-feltet vi bruker for søk.
    const handleChange = (event) => {
        setInput(event.target.value)
    }

    // Linje 46 til 53: Når vi trykker enter, se om søke-feltet har minst tre bokstaver. Så ønsker vi å lagre søket i localStorage, og å navigere til siden for det søket og deretter laste siden på nytt.
    const handleEnter = (event) => {
        if (input.length >= 3 && event.code === "Enter") {
            const searchTerm = input.replaceAll(" ", "+")
            localStorage.setItem("searchTerm", searchTerm)
            navigate(`/search/${searchTerm}`)
            navigate(0)
        }
    }
    
    // Linje 56 til 68: HTML og slikt for nav.
    return (
        <header>
            <Link to={"/search"}><h1>Booksearch</h1></Link>
            <nav>
                <input
                    id="search" value={input} type="text"
                    onInput = {event => {handleChange(event)}}
                    onKeyDown = {event => {handleEnter(event)}}
                    placeholder="Search ..."
                />
            </nav>
        </header>
    )
}