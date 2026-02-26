import { useState , useEffect} from 'react'
import axios from "axios"


function App() {

  const [notes, setNotes] = useState([])

  function fetchNotes(){
    axios.get("http://localhost:4000/notes").then((res )=>{
      setNotes(res.data.notes)
      console.log("render") 
    })
  }
  useEffect(()=>{
    fetchNotes()
  },[])

  function handleSubmit(e){
    e.preventDefault()
    console.log(e)
    const {title,description}=e.target.elements
    console.log(title.value,description.value)

    axios.post("http://localhost:4000/notes",{
      title:title.value,
      description:description.value
    }).then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  function handleDeleteNote(id){
      axios.delete("http://localhost:4000/notes/"+id)
      .then((res)=>{
        console.log(res.data)
        fetchNotes()
      })
  }

  function updateNote(id){
      const description= "modified Description1"
      axios.patch("http://localhost:4000/notes/"+id,{description})
      .then((res)=>{
        console.log(res.data)
        fetchNotes()
      })
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder='Enter title'/>
        <input name="description" type="text" placeholder='Enter Description'/>
        <button>create</button>
      </form>

      <div className="notes">
        {
          notes.map(note => {
            return <div className="note">
              <h1>{note.title}</h1>
              <h2>{note.description}</h2>
              <button onClick={()=>{handleDeleteNote(note._id)}}>Delete</button>
              <button className='update' onClick={()=>{updateNote(note._id)}}>Update</button>
            </div>
          })
        }

      </div>
    </>
  )
}

export default App
