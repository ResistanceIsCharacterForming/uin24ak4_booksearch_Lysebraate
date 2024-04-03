import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

export default function Nav() {

    const { search } = useParams()
    
    const [input, setInput] = useState("")
    const navigate = useNavigate()

    const [refreshed, setRefreshed] = useState(true)

    if (localStorage.getItem("searchTerm") === null && refreshed) {
        localStorage.setItem("searchTerm", "")
        setRefreshed(false)
    } else {
        let searchTerm = localStorage.getItem("searchTerm")

        if (search !== undefined && search !== searchTerm) {
            searchTerm = search
            localStorage.setItem("searchTerm", searchTerm.replaceAll(" ", "+"))
        } else if (search === undefined) {
            searchTerm = ""
            localStorage.setItem("searchTerm", searchTerm)
        }

        if (input === "" && searchTerm !== "" && refreshed) {
            setInput(searchTerm.replaceAll("+", " "))
            setRefreshed(false) 
        }
    }

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const handleEnter = (event) => {
        if (input.length >= 3 && event.code === "Enter") {
            const searchTerm = input.replaceAll(" ", "+")
            localStorage.setItem("searchTerm", searchTerm)
            navigate(`/search/${searchTerm}`)
            navigate(0)
        }
    }
    
    return (
        <header>
            <nav>
                <h2>Search</h2>
                <input
                    id="search" value={input} type="text"
                    onInput = {event => {handleChange(event)}}
                    onKeyDown = {event => {handleEnter(event)}}
                />
            </nav>
        </header>
    )
}