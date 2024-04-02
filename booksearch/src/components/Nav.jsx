// Linje 2 til 4: Global og lokal importering. 
import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { siteData } from './StructureCTX';

// Linje 7 til 30: Funksjon for å bygge menyen hvilket brukes for å bytte kategorier.
export default function Nav() {
    return(<></>)
    /* Linje 9 til 11: Diverse lokale variabler. category henter verdien fra slug-en :category for å avgjøre hvilken side vi er på. Mens categories henter arrayen til key fra siteData. Og content henter alle verdiene til siteData. */
    const { category } = useParams();
    const categories = useContext(siteData)["key"]
    const content = useContext(siteData)

    /* Linje 14 til 29: Bygg ut ul-element hvilket er menyen. */
    return (
        <header>
            <nav>
                <ul className="menu">
                    {/* Linje 17 til 27: Iterate categories, hvilket gir oss alle kategoriene. */}
                    {categories.map((cat, index) =>
                    (
                        /* Linje 20: Med className undersøker vi om cat (kategorien) er like slug-en (category). Hvis ja gjør denne knappen active. Om ikke fjern den aktive tilstanden. */
                        <li key={"category" + index} className={cat === category ? "active" : null}>
                            {/* Linje 22 til 24: Sett opp selve lenken til kategorien. */}
                            <Link to={"/category/" + cat}>
                                {content[cat].header}
                            </Link>
                        </li>
                    )
                    )}
                </ul>
            </nav>
        </header>
    )
}