import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TextAreaAutosize from 'react-textarea-autosize';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import {setLoading} from '../../../slices/authSlice';

// APIs
import { createNote, updateNote } from '../../../services/operations/NoteAPIs';

const AddNote = () => {

  const [noteText, setNoteText] = useState('');
  const [previousNote, setPreviousNote] = useState(null);

  const {token, loading} = useSelector((state) => state.auth);
  const {notes} = useSelector((state) => state.note);

  const {herbId} = useParams();

  const dispatch = useDispatch();

  // check if user previously created note for this herb
  const getNoteText = () => {
    // check only if user is logged in
    if(token) {
        // check if user has added notes to this herb
        const currentNote = notes?.filter(note => note.herb?._id === herbId);

        if(currentNote.length === 1) {
          setPreviousNote(currentNote[0]);
          setNoteText(currentNote[0].textContent);
        }
    }
  }

  // fetch user note on first render (if it was created)
  useEffect(() => {
      getNoteText();
  }, []);

  // function to create a note
  const handleAddNote = async () => {
      // get text content
      const textContent = noteText.trim();

      // check for empty string
      if(textContent.length === 0) {
        toast.error("Note can't be empty");
        return;
      }

      // create form data
      const formData = new FormData();
      formData.append('textContent', textContent);

      // if creating note for the first time call CREATE NOTE API
      // else call UPDATE NOTE API
      if(!previousNote) {
        // add herb id to from data
        formData.append('herbId', herbId);

        dispatch(setLoading(true));

        // call API
        const result = await createNote(formData, token, dispatch);

        // set previous note 
        if(result) {
          setPreviousNote(result);
        }

        dispatch(setLoading(false));
      } else {
        // check if any update is made to note
        if(previousNote.textContent === textContent) {
          toast.error("Not changes made to the note");
          return;
        }
        
        // add note id to form data
        formData.append('noteId', previousNote._id);
        // call API
        const result = await updateNote(formData, token, dispatch);

        // set previous note 
        if(result) {
          setPreviousNote(result);
        }
      }
  }

  return (
    <div className='flex flex-col gap-2'>
        {/* note input box */}
        <div>
          <TextAreaAutosize
              placeholder={token ? 'Add note' : 'You must be logged in to use this feature'}
              minRows={5}
              maxRows={10}
              disabled={!token ? true : false}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className='form-textarea'
          />
        </div>

        {/* save button */}
        <div>
            <button 
              className='button-2' 
              onClick={handleAddNote}
              disabled={loading}
            >
              Save Note
            </button>
        </div>
    </div>
  )
}

export default AddNote