// Linje 2 til 4: Global og lokal importering. s
import { Route, Routes, Navigate } from 'react-router-dom'
import Searchresults from './Searchresults'
import Main from '../layouts/Main'

/* Linje 7 til 22: Funksjon for å sette opp Routes med alle tilhørende Route for navigasjon av nettsiden. */
export default function BuildRoutes() {
    return (
        <Routes>
            {/* Linje 11 til 19: Wrap de indre Routes i en Route hvilket har layouten Main som komponent (element). Ved å gjøre dette blir komponentene kalt i de nestede Route brukt av Outlet. */}
            <Route path="/" element={<Main />}>
                {/* Linje 13: Som standard gå til denne adressen når nettside har lastet. */}
                <Route index element={<Navigate to="/search" />} />
                {/* Linje 15 og 16: Hvis URL-en tilsvarer path kalt komponent. Merk med linje ... slug-en kalt category. Hvilket lar oss spesifiser en kategori i URL-en. */}
                <Route path="/search" element={<Searchresults />} />
                <Route path="/search/:search" element={<Searchresults />} />
                {/* Linje 18: Hvis ingen av rutene ovenfor blir kalt fall tilbake på denne. Altså gå tilbake til hovedsiden og bruk standardverdien for kategorien.*/ }
                <Route path="/*" exact element={<Searchresults />} />
            </Route>
        </Routes>
    )
}