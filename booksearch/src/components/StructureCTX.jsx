/* Linje 2 og 4: Sett opp et tomt context objekt. */
import { createContext } from 'react'
import { useContext } from 'react'

export const siteData = createContext(null)

export const SiteDataContext = createContext({
    searchTerm: "",
    frontpageData: [],
    setSearchData: () => {}
});

export const SetSearchData = (data) => {
    const { searchData, setSearchData } = useContext(SiteDataContext);
    setSearchData(data)
    return
};