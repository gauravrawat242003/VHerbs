import React, { useState } from 'react'
import TextAreaAutosize from 'react-textarea-autosize';
import { useNavigate } from 'react-router-dom';

// icons
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";

// components
import { ConfirmationModal } from '../../../common/ConfirmationModal';

// utility functions
import { formattedDate } from '../../../../utils/dateFormatter';


const NoteCard = ({note, handleNoteDelete, noteColors}) => {

    const navigate = useNavigate();

    const [confirmationModalData, setconfirmationModalData] = useState(null);

    // function to delete note
    const handleDelete = async () => {
        setconfirmationModalData(null);
        handleNoteDelete(note._id);
    }

    
  return (
    <div className={`p-8 rounded-xl ${noteColors.backgroundColor} ${noteColors.textColor}`}>

        {/* herb details */}
        <div className={`pb-4 border-b-[1px] ${noteColors.borderColor} flex flex-col gap-2`}>
            <div className='flex items-center justify-between'>
                {/* herb name */}
                <div>
                    <p className='text-xl font-[600]'>{note.herb?.botanicalName || "Herb deleted"}</p>
                    <p className='text-lg opacity-85'>{note.herb?.commonName || "Not available"}</p>
                </div>
                
                {/* herb image */}
                <div>
                <img 
                        src={note.herb?.image}
                        loading="lazy"
                        alt={note.herb?.commonName || "Herb Image"}
                        className='h-[60px] w-[60px] rounded-md object-cover'
                    />
                </div>
            </div>

            {/* action buttons */}
            <div className='flex gap-4'>
                {/* edit button */}
                <div 
                    className='p-1 bg-black/70 rounded-lg cursor-pointer group w-fit'
                    onClick={() => navigate(`/herbs/${note.herb._id}`)}    
                    data-tooltip-id='edit-note-tooltip'
                >
                    <MdOutlineModeEditOutline 
                        size={20} 
                        className='fill-white group-hover:fill-yellow-100 transition-colors duration-200'
                    />
                </div>

                {/* delete button */}
                <div 
                    className='p-1 bg-black/70 rounded-lg cursor-pointer group w-fit'
                    onClick={() => {
                        setconfirmationModalData({
                            header: "Are you sure ?",
                            message: "This note will be deleted permanenely",
                            acceptText: "Delete",
                            deleteText: "Cancel",
                            accept: () => handleDelete(),
                            reject: () => setconfirmationModalData(null),
                        })
                    }}    
                    data-tooltip-id='delete-note-tooltip'
                >
                    <MdDelete 
                        size={20} 
                        className='fill-white group-hover:fill-red-500 group-hover:animate-wiggle transition-colors duration-200'
                    />
                </div>
            </div>

        </div>

        {/* note */}
        <div className='mt-4'>
            <TextAreaAutosize
                minRows={6}
                maxRows={6}
                contentEditable={false}
                value={note.textContent}
                className={`w-full overflow-y-auto resize-none outline-none font-sans
                [&::-webkit-scrollbar]:w-2 
                [&::-webkit-scrollbar-thumb]:rounded-full 
                [&::-webkit-scrollbar-track]:rounded-full
                ${noteColors.scrollBarTrack} 
                ${noteColors.scrollBarThumb}`}
            />
        </div>

        {/* time stamps */}
        <div className='mt-4 text-sm'>
            <p>Created At: {formattedDate(note?.createdAt)}</p>
            <p>Update At: {formattedDate(note?.updatedAt)}</p>
        </div>

        {/* confriamtion modal for deleting note */}
        {
            confirmationModalData && (
                <ConfirmationModal confirmationModalData={confirmationModalData}/>
            )
        }
    </div>
  )
}

export default NoteCard