// Linje 2 til 4: Global og lokal importering.
import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { siteData } from './StructureCTX';

// Linje 7 til 49: En funksjon som håndterer logikken for å vise innholdet til en kategori.
export default function Searchresults() {
    // Linje 9: Hent parameteret fra URL-en (:category -- se BuildRoutes) og lagre det i variablen category.
    let { search } = useParams()

    let toDisplay = []

    // Linje 15 til 18: Hvis kategorien brukeren enten har trykket på eller skrevet selv ikke stemmer med de kategoriene vi vet finnes -- eller kategorien ikke er oppgitt -- set en standardverdi.
    if (search === undefined) {
        // Linje 17: Bruk den første kategorien i validPages som standardverdi for category.
        localStorage.setItem("searchTerm", "")
    } else {
        localStorage.setItem("searchTerm", search)
        // To-do, search
    }

    // Linje 30 til 45: Sett opp et artikkel-kort med innholdet for denne kategorien.
    return (
        <main>
            
        </main>
    )
}