import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [responseData, setResponseData] = useState("")

  
  const getData = async(url)=>{
    fetch(url)
    .then(response => response.json())
    .then(data => setResponseData(data))
    .catch(error => console.error(error))
  }

  useEffect(()=>{
    getData(`https://openlibrary.org/subjects/bond,_james_(fictitious_character),_fiction.json?limit=1000`)
  },[])
 
  if (responseData !== "") {
    let books = []
    let title = ""

    responseData.works.map((x) => {
      let author = x.authors[0].name

      title = x.title
      console.log(title)
      title = title.split("[")
      title = title[0]
      title = title.split("(")
      title = title[0]
      title = title.trim()

      x.subject.map((s) => {
        let subject = s.toLowerCase()
        if (subject.includes("james") && subject.includes("bond") && author === "Ian Fleming" && x.first_publish_year !== null && x.cover_id != null) {
          books.push({
            "title": title,
            "publication": x.first_publish_year
          })
        }

      })
    
    })

    books.sort((a, b) => a.publication - b.publication);

    let b = []

    books.map((x) => {
      if (x.publication <= 1966) { 
        const items = b.filter(item => item.title.toLowerCase().indexOf(x.title.toLowerCase()) !== -1);
        if (items.length === 0) {
          b.push(x)
        }
      }
    })

    books = b

    console.log(books)

  }


  return (<></>)
}

export default App