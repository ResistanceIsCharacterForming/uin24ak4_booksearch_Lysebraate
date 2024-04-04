// Linje 2 til 3: Global og lokal importering.
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

// Linje 6 til 14: Komponent / layout. Siden denne nettsiden ikke er så avansert strukturmessig er dette den eneste som er brukt. 
export default function Main() {
    // Linje 8 til 13: Returner et JSX objekt. Spesifikt et fragment med return-verdien fra to andre objekter. Nav er et egendefinert komponent. Mens Outlet er en del av routing. Med Outlet kommer React til å gjøre så komponent vi renderer blir brukt. Så i praksis vil alltid Nav være med på siden. Mens utifra hvilken side vi går til forandrer Outlet seg. 
    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}