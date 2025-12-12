import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setEditHerb, setHerb, setStep } from '../../../../slices/herbSlice';
import { setLoading } from '../../../../slices/authSlice';

// constants
import { HERB_STATUS } from '../../../../utils/constants';

// prime react css theme
import "primereact/resources/themes/soho-light/theme.css";

// prime react components
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// templates for data table
import { nameTemplate, ImageBodyTemplate, StatusTemplate } from './TableTemplates';

// icons
import { FiPlus } from 'react-icons/fi';
import { MdDelete, MdEdit } from 'react-icons/md';

// compnents
import { IconBtn } from '../../../common/IconBtn';
import { ConfirmationModal } from '../../../common/ConfirmationModal';

// utility functions
import { navigateToRoute } from '../../../../utils/routeNavigator';

// APIs
import { deleteHerb, getAllHerbs } from '../../../../services/operations/herbsAPIs';


const ManageHerbs = () => {

    const [herbs, setHerbs] = useState([]);
    const [publishedHerbsCount, setPublishedHerbsCount] = useState([]);
    const [draftedHerbsCount, setDraftedHerbsCount] = useState([]);

    const [confirmationModalData, setConfirmationModalData] = useState(null);

    const navigate = useNavigate();
    const {token, loading} = useSelector((state) => state.auth);
    const {herb} = useSelector((state) => state.herb);

    const dispatch = useDispatch();

    // function to fetch all herbs details
    const fetchHerbs = async () => {
        dispatch(setLoading(true));

        // call API
        const result = await getAllHerbs(token);
        if(result) {
            setHerbs(result);
            
            // get total published herbs count
            let total_published_herbs_count = 0;
            result.forEach((herb) => {
                if(herb.status === HERB_STATUS.PUBLISHED) {
                    total_published_herbs_count++;
                }
            });

            setPublishedHerbsCount(total_published_herbs_count);
            setDraftedHerbsCount(result.length - total_published_herbs_count);
        }

        dispatch(setLoading(false));
    }

    // fetch all herbs on first render
    useEffect(() => {
        fetchHerbs();
    }, []);

    // function to delete a herb
    const deleteHerbHandler = async (deletingHerb) => {
        // check if currently created herb (i.e. not completely created) in being deleted
        if(deletingHerb._id === herb?._id) {
            // remove creating herb from slice 
            dispatch(setHerb(null));
            // reset steps
            dispatch(setStep(1));
            // make edit mode false
            dispatch(setEditHerb(false));
        }

        // call delete herb API
        const result = await deleteHerb(token, deletingHerb._id);

        // remove deleted herb from state variable to remove deleted herb from page
        if(result) {
            setHerbs((prev) => prev.filter(e => e._id !== deletingHerb._id));
        }

        // update published and drafted herb count
        if(deletingHerb.status === HERB_STATUS.PUBLISHED) {
            setPublishedHerbsCount(prev => prev - 1);
        } else {
            setDraftedHerbsCount(prev => prev - 1);
        }

        // remove modal
        setConfirmationModalData(null);
    }

    // template to render edit & delete icons in table
    const ActionBodyTemplate = (rowData) => {
        return (
            <div className='flex gap-2 items-center text-richblack-400'>
                
                {/* edit button */}
                <button
                    onClick={() => navigateToRoute(navigate, `/dashboard/manage-herbs/edit/${rowData._id}`)}
                    className='p-4 bg-richblack-5 w-fit rounded-full hover:bg-richblack-50 transition-colors duration-300'
                >
                    <MdEdit size={20}/>
                </button>
                
                {/* delete button */}
                <div 
                    className='p-4 group bg-richblack-5 w-fit rounded-full hover:bg-richblack-50 transition-colors duration-300 cursor-pointer'
                    onClick={() => {
                        setConfirmationModalData({
                        header: 'Are you sure ?',
                        message: 'This herb will be deleted permanently',
                        acceptText: 'Delete',
                        rejectText: 'Cancel',
                        accept: () => deleteHerbHandler(rowData),
                        reject: () => setConfirmationModalData(null),
                        });
                    }}
                >
                    <MdDelete 
                        size={20} 
                        className='group-hover:animate-wiggle'
                    />
                </div>
            </div>
        )
    }

    // if herbs are not fetched then display loader
    if(loading) {
        return (
            <div className='flex items-center justify-center h-screen overflow-y-hidden'>
                <div className='loader'></div>
                </div>
        )
    }

  return (
    <div className='py-20 mx-auto'>
        
        {/* total herbs count */}
        <div className='flex flex-col sm:flex-row gap-4 justify-between items-center'>
            <div>
                <p className='font-bold text-2xl'>
                    Total Herbs ({herbs.length})
                </p>
            </div>

            {/* add herbs button */}
            <div>
                <IconBtn onClick={() => navigateToRoute(navigate,'/dashboard/add-herb')}>
                    <p className='flex gap-1 items-center cursor-pointer'>
                        <span className='py-1 text-lg tracking-wider'>Add herb</span>
                        <FiPlus size={18}/>
                    </p>
                </IconBtn>
            </div>
        </div>
        
        {/* published & draft herbs count */}
        <div>
            {/* published */}
            <div className='flex gap-1 items-center'>
                <p className='text-richblack-300 font-[500]'>
                    Published Herbs ({publishedHerbsCount})
                </p>
            </div>

            {/* drafted */}
            <div className='flex gap-1 items-center'>
                <p className='text-richblack-300 font-[500]'>
                    Drafted Herbs ({draftedHerbsCount})
                </p>
            </div>
        </div>

        {/* all herbs table */}
        <section className='w-full mt-10'>
            <DataTable
                value={herbs}
                emptyMessage="No Herb found"
                stripedRows
                className=' w-fullshadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'
                tableStyle={{ minWidth: '30rem', marginTop: '1rem'}}
                paginator
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                rows={10}
                rowsPerPageOptions={[5,10,20]}
                removableSort
                rowHover
            >

                {/* botanical Name */}
                <Column 
                    sortable 
                    filter 
                    filterPlaceholder="Search" 
                    showAddButton={false} 
                    header="Botanical Name" 
                    field="botanicalName"
                    body={(rowData) => nameTemplate(rowData, 'botanicalName')}
                />

                {/* common Name */}
                <Column 
                    sortable 
                    filter 
                    filterPlaceholder="Search" 
                    showAddButton={false} 
                    header="Common Name"
                    field="commonName"
                    body={(rowData) => nameTemplate(rowData, 'commonName')}
                />

                {/* image */}
                <Column 
                    header="Image" 
                    body={ImageBodyTemplate}
                />

                {/* status icon */}
                <Column body={StatusTemplate} className='max-w-[10px]'/>
                {/* status text */}
                <Column 
                    header="Status" 
                    field="status"
                    sortable
                    body={(rowData) => nameTemplate(rowData, 'status')}
                />

                {/* action buttons */}
                <Column 
                    header="Action" 
                    body={ActionBodyTemplate}
                    
                />

            </DataTable>
        </section>

        {/* confirmation modal for removing bookmark */}
        {
            confirmationModalData && (<ConfirmationModal confirmationModalData={confirmationModalData}/>)
        }
    </div>
  )
}

export default ManageHerbs