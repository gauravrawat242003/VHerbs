import React, { useEffect } from 'react'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export const ConfirmationModal = ({confirmationModalData}) => {

    const {header, message, acceptText, rejectText, accept, reject} = confirmationModalData;

    const showModal = () => {
        confirmDialog({
            header: header,
            message: message,
            accept: () => accept(),
            reject: () => reject(),
            onHide: () => reject(),
        });
    };

    useEffect(() => {
        showModal();
    }, []);

  return (
    <div>
        <ConfirmDialog 
            draggable={false} 
            acceptLabel={acceptText} 
            rejectLabel={rejectText}
            className='w-[80%] sm:max-w-fit'
        />
    </div>
  )
}