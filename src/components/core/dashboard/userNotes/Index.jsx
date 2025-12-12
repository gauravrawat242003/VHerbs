import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// prime react components
import { Paginator } from 'primereact/paginator';

// components
import NoteSkeleton from './NoteSkeleton';
import NoteCard from './NoteCard';
import NoDataAvailable from '../../../common/NoDataAvailable';

// data
import { noteColors } from '../../../../data/userNotesData';

// APIs
import { deleteNote, getUserNotes } from '../../../../services/operations/NoteAPIs';


const UserNotes = () => {
    
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    // for paginator
    const [first, setFirst] = useState(0);
    const itemsPerPage = 6;

  const {token} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function to fetch all user notes
  const fetchUserNotes = async () => {
    setLoading(true);
    const result = await getUserNotes(token);
    if(result) {
      setNotes(result);
    }
    setLoading(false);
  }

  // get user notes in first render
  useEffect(() => {
    fetchUserNotes();
  }, []);

  // display next page notes
  const handlePageChange = (e) => {
    setFirst(e.first);
  }

  // function to delete note
  const handleNoteDelete = async (noteId) => {
    // call API 
    const result = await deleteNote({noteId}, token, dispatch);
    // set notes
    setNotes(result);
  }

  
  return (
    <div className='py-20'>
        
        {/* heading */}
        <div className='text-3xl font-bold'>
          <h4>My Notes</h4>
        </div>

        {
          // if notes are being fetched by API display skeleton loader
          loading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
              {
                [...Array(6)].map((_, index) => (
                  <NoteSkeleton key={index}/>
                ))
              }
            </div>
          ) : 
          // if no notes are available
          notes?.length === 0 ? (
              <NoDataAvailable 
                btnText="Explore herbs"
                btnClickHandler={() => navigate('/herbs')}
              />
          )
          // display all notes
          : (
            <>
              {/* user notes */}
              <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
                  {
                      notes.slice(first, first+itemsPerPage).map((note, index) => (
                          <NoteCard 
                            key={note._id} 
                            note={note} 
                            handleNoteDelete={handleNoteDelete}
                            noteColors={noteColors[index%noteColors.length]}
                          />
                      ))
                  }
              </section>
              
              {/* Paginator */}
              <Paginator 
                  first={first} 
                  totalRecords={notes.length} 
                  rows={itemsPerPage} 
                  onPageChange={handlePageChange}
                  template='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink'
                  className='mt-12'
              />
            </>
          )
        }


    </div>
  )
}

export default UserNotes