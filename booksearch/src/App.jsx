import BuildRoutes from './components/BuildRoutes'
import BuildFrontpageData from './components/BuildFrontpageData'

//import './styles/main.scss'
import './App.css'

function App() {
  
  if (localStorage.getItem("searchTerm") === null) {
    localStorage.setItem("searchTerm", "")
  }

  BuildFrontpageData()

  console.log(JSON.parse(localStorage.getItem("frontpageData")))

  // Linje 38 til 44: Returner et JSX objekt hvilket tilsvarer nettsiden.
  return (
    // Linje 40 til 43: Wrap BuildRoutes komponentet i siteData sin provider. Hvilket betyr at alle komponenter som er hierarkisk innover får tilgang til verdien satt av denne context-en. Med value settes return-verdien til retrieveData funksjonen som verdi.

      <>
        <BuildRoutes />
      </>
      
  )
}

export default App