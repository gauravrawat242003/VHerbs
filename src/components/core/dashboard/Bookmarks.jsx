import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

// prime react icons
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';

// icons
import { MdDelete } from 'react-icons/md';

// components
import { ConfirmationModal } from '../../common/ConfirmationModal';

// APIs
import { getBookmarkedHerbs, removeBookmarkHerb } from '../../../services/operations/herbsAPIs';
import NoDataAvailable from '../../common/NoDataAvailable';


const Bookmarks = () => {
  
  const [bookmarks, setBookmarks] = useState(null);
  const [loading, setLoading] = useState(false);

  // for searching bookmarks
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [confirmationModalData, setConfirmationModalData] = useState(null);

  const {token} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // calls get bookmarks API
  const getBookmarks = async () => {
    setLoading(true);
    const result = await getBookmarkedHerbs(token);
    if(result) {
      setBookmarks(result);
    }
    setLoading(false);
  }

  // get all user bookmarks in first render
  useEffect(()  => {
    getBookmarks();
  }, []);

  // calls remove bookmark API
  const handleRemoveBookmark = async (herb) => {
      // remove modal
      setConfirmationModalData(null);

      // call API
      const result = await removeBookmarkHerb(herb._id, token, dispatch);
      if(result) {
        // remove deleted herb from bookmarks
        const updatedBookmarks = [...bookmarks].filter((item) => item._id !== herb._id);
        setBookmarks(updatedBookmarks);
      }
  }

  // template for botanical and common name 
  const nameTemplate = (rowData, name) => {
    return (
      <div className='text-black'>
        {rowData[name]}
      </div>
    )
  }

  // template to render image in bookmarks table
  const ImageBodyTemplate = (rowData) => {
    return (
        <div className='py-4'>
          <img src={rowData.image} className='w-[100px] h-[100px] object-cover rounded-md'/>
        </div>
    )
  }
  
  // template to render delete icon in bookmarks table
  const DeleteBodyTemplate = (rowData) => {
    return (
        <div 
            className='p-4 group text-richblack-400 bg-richblack-5 w-fit rounded-full hover:bg-richblack-50 transition-colors duration-300'
            onClick={(e) => {
              e.stopPropagation();
              setConfirmationModalData({
                header: 'Are you sure ?',
                message: 'This herb will be removed from your bookmarks',
                acceptText: 'Remove',
                rejectText: 'Cancel',
                accept: () => handleRemoveBookmark(rowData),
                reject: () => setConfirmationModalData(null),
              });
            }}
        >
            <MdDelete 
                size={20} 
                className='group-hover:animate-wiggle'
            />
        </div>
    )
  }
  

  return (
    <div className='py-20'>
        
        {/* heading */}
        <section className='text-3xl font-bold flex'>
          <h2>My Bookmarks</h2>
        </section>

        {/* bookmarks */}
        <section>
          {
            // display loader when bookmarks are being fetched by API
            loading ? (
              <div className='-mt-32 flex items-center justify-center h-screen overflow-y-hidden'>
                <div className='loader'></div>
              </div>
            ) 
            // if no bookmark is preset
            : bookmarks?.length === 0 ? (
                <NoDataAvailable 
                  btnText="Explore herbs"
                  btnClickHandler={() => navigate('/herbs')}
                />
            ) 
            // display all bookmarks table
            : (
              <div className='mt-12'>
                  {/* search bookmarks input */}
                  <InputText
                    onInput={(e) => setFilters({
                      ...filters,
                      global: {value: e.target.value, matchMode: FilterMatchMode.CONTAINS},
                    })}
                    placeholder="Search Bookmarks using herb name"
                    className='w-full p-2 rounded-[5px] border-[1px] border-richblack-50 focus:bg-[#F3F4FC] active:border-transparent hover:border-richblack-50'
                  />

                  {/* bookmarks table */}
                  <DataTable
                      value={bookmarks}
                      emptyMessage="No Bookmarks found"
                      className='shadow-md w-full p-paginator-text-white'
                      tableStyle={{ minWidth: '30rem', cursor: 'pointer', marginTop: '1rem'}}
                      filters={filters}
                      stripedRows
                      paginator 
                      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                      rows={10}
                      rowsPerPageOptions={[3,5,10]}
                      removableSort 
                      onRowClick={(rowData) => navigate(`/herbs/${rowData.data._id}`)}
                      rowHover
                  >   
                      {/* botanical Name */}
                      <Column 
                        sortable 
                        header="Botanical Name" 
                        field="botanicalName" 
                        body={(rowData) => nameTemplate(rowData, 'botanicalName')} 
                        style={{paddingLeft: '2rem'}}
                      />
                      
                      {/* common Name */}
                      <Column 
                        sortable 
                        header="Common Name" 
                        field="commonName" 
                        body={(rowData) => nameTemplate(rowData, 'commonName')}
                      />
                      
                      {/* image */}
                      <Column 
                        header="Image" 
                        body={ImageBodyTemplate}
                      />

                      {/* remove bookmark icon */}
                      <Column 
                        header="Action" 
                        body={DeleteBodyTemplate}
                      />
                  </DataTable>
              </div>
            )
          }

        </section>

        {/* confirmation modal for removing bookmark */}
        {
            confirmationModalData && (<ConfirmationModal confirmationModalData={confirmationModalData}/>)
        }
    </div>
  )
}

export default Bookmarks