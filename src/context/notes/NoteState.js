import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    /*This is being used by practice*/ 
    // const s1 = {
    //     "name":"Dheeraj",
    //     "role":"Jobless"
    // }

    // const [state, setState] = useState(s1);

    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name":"Yuvraj",
    //             "role":"No tension faltu"
    //         })
    //     }, 1000);
    // }
    
    // return(
    //     <NoteContext.Provider value={{state:state, update:update}}>
    //         {props.children}
    //     </NoteContext.Provider>

    // )

    // Setting the local host url that is being used in the fetching the api call
    const host = "https://task-note-api.vercel.app"
    const notesInitial = []  // All notes are going to here
    /*This is being used by practice*/ 
    // [
      //   {
      //     "_id": "64d4d82011f3e6e3c7c4e152",
      //     "user": "64d498048c18c635f95714ee",
      //     "title": "Party wala dance",
      //     "description": "Not a actual dance",
      //     "tag": "Dancing",
      //     "date": "2023-08-10T12:29:20.156Z",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "64d4d82411f3e6e3c7c4e154",
      //     "user": "64d498048c18c635f95714ee",
      //     "title": "Party wala dance",
      //     "description": "Not a actual dance",
      //     "tag": "Dancing",
      //     "date": "2023-08-10T12:29:24.784Z",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "64d4d82411f3e6e3c7c4e156",
      //     "user": "64d498048c18c635f95714ee",
      //     "title": "Party wala dance",
      //     "description": "Not a actual dance",
      //     "tag": "Dancing",
      //     "date": "2023-08-10T12:29:24.784Z",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "64d4d82411f3e6e3c7c4e1507",
      //     "user": "64d498048c18c635f95714ee",
      //     "title": "Party wala dance",
      //     "description": "Not a actual dance",
      //     "tag": "Dancing",
      //     "date": "2023-08-10T12:29:24.784Z",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "64d4d82411f3e6e3c7c4e151",
      //     "user": "64d498048c18c635f95714ee",
      //     "title": "Party wala dance",
      //     "description": "Not a actual dance",
      //     "tag": "Dancing",
      //     "date": "2023-08-10T12:29:24.784Z",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "64d4d82411f3e6e3c7c4e1599",
      //     "user": "64d498048c18c635f95714ee",
      //     "title": "Party wala dance",
      //     "description": "Not a actual dance",
      //     "tag": "Dancing",
      //     "date": "2023-08-10T12:29:24.784Z",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "64d4d82411f3e6e3c7c4e157",
      //     "user": "64d498048c18c635f95714ee",
      //     "title": "Party wala dance",
      //     "description": "Not a actual dance",
      //     "tag": "Dancing",
      //     "date": "2023-08-10T12:29:24.784Z",
      //     "__v": 0
      //   },
      // ]

      // Passing the notes state to the notesInitial
      const [notes, setNotes] = useState(notesInitial);

       // Get all notes
       const getNotes = async () =>{
        // Todo api call, fetching all notes with a user tokens
        try {
        const response = await fetch(`${host}/api/notes/fetchnotes` , {
          method: "get",
          headers: {
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          }
        });

        if (response.ok) {
          const json = await response.json();
          setNotes(json);
        } else {
          console.error("Failed to add note:", response.status);
        }
      } catch(error) {
        console.error("Error adding note:", error);
      }
    }
       
      


      // Add a note
      const addNote = async (title, description, tag) =>{
        // Todo api call, Adding post request for storing the title description and tag
        try {
        const response = await fetch(`${host}/api/notes/addnote` , {
          method: "POST",
          headers: {
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body:JSON.stringify({title, description, tag})
        });

        if (response.ok) {
          // Fetch the updated list of notes after adding a new one
          await getNotes();

          const note = await response.json()
          setNotes(notes.concat(note))

        } else {
          console.error("Failed to add note:", response.status);
        }
      } catch(error) {
        console.error("Error adding note:", error);
      }
      /*This is being used by practice*/ 
      // console.log("Adding a new note")
      // const note = {
      //   "_id": "64d4d82411f3e6e3c7c4e154",
      //   "user": "64d498048c18c635f95714ee",
      //   "title": title,
      //   "description": description,
      //   "tag": tag,
      //   "date": "2023-08-10T12:29:24.784Z",
      //   "__v": 0
      // };

      // setNotes(notes.concat(note))
      }

    // Update a note's completed status, by requesting put 
    const updateNoteCompletedStatus = async (id, completed) => {
    try {
        const response = await fetch(`${host}/api/notes/completenote/${id}`, {
        method: "PUT",
        headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ completed })
    });

    if (response.ok) {
      // Handle the successful completion of the request
    } else {
      console.error("Failed to update note completion status:", response.status);
    }
  } catch (error) {
    console.error("Error updating note completion status:", error);
  }
};

  
      
      // Edit a note
      const editNote = async (id, title, description, tag) =>{
        // api call, to edit put request in the api
        try {
        const response = await fetch(`${host}/api/notes/updatenote/${id}` , {
          method: "put",
          headers: {
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body:JSON.stringify({title, description, tag})
        });
        /*This is being used by practice*/ 
        // const json =  await response.json();
        // console.log(json)

        if (response.ok) {
          // Fetch the updated list of notes after editing
          await getNotes();
          
          let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit the note in client
        for (let index = 0; index <  newNotes.length; index++) {
          const element =  newNotes[index];   
          if (element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          } 
        }
        // console.log("updating the note" + id)
        setNotes(newNotes);

        } else {
          console.error("Failed to edit note:", response.status);
        }
      } catch (error) {
        console.error("Error editing note:", error)
      }


      }
      
      // Delete a note
      const deleteNote = async (id) =>{
         // Todo api call, to request the delete 
         try {
         const response = await fetch(`${host}/api/notes/deletenote/${id}` , {
          method: "delete",
          headers: {
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          }
        });
        /*This is being used by practice*/ 
        // const json =  response.json();
        // console.log(json)

         /*This is being used by practice*/ 
        //  console.log("Deleting the note" + id)
         const newNotes = notes.filter((note)=> {return note._id!==id})
         setNotes(newNotes);

         if (response.ok) {
          // Fetch the updated list of notes after deleting
          await getNotes();
        } else {
          console.error("Failed to delete note:", response.status);
        }
      } catch (error) {
        console.error("Error deleting note:", error);
      }
      }


      return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes, updateNoteCompletedStatus}}>
                {props.children}
            </NoteContext.Provider>  
        )
    }

export default NoteState;
