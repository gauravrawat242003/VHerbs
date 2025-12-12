import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';

// icons
import { FiUploadCloud } from 'react-icons/fi';

// components
import ModelViewer from '../../../../common/ModelViewer';


const ModelUploader = ({name, label, setValue, register, errors, editData}) => {
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(editData ? editData : null);

    // function display uploaded file
    const displayPreviewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreviewSource(reader.result);
        }
    }

    // function to add file (using drag & drop)
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if(file) {
            displayPreviewFile(file);
            setSelectedFile(file);
        }
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
            accept: {"model/gltf-binary": [".glb"]}, 
            // {"model/gltf+json": [".gltf"]}, 
                    onDrop,
    });

    // register input field on first render
    useEffect(() => {
    register(name);
    }, []);

    // set updated value to form state when there is a change
    useEffect(() => {
    setValue(name, selectedFile);
    }, [selectedFile, setValue]);

  return (

    <div className='flex flex-col space-y-2'>
    
            <label className='text-sm' htmlFor={name}>
                {label}<sup className='text-red-500'>*</sup>
            </label>
            
            <div
                className={`${isDragActive ? 'bg-richblue-600' : 'bg-gradient-to-r from-rose-100 to-teal-100'}
                    flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
            >
                {
                    // if an file is added then display preview of that file
                    previewSource ? (
                        <div className='flex h-[400px] w-full flex-col p-6'>
                            {
                                // render 3d model here
                                <ModelViewer model={previewSource}/>
                            }
                             
                             {/* cancel upload button */}
                            <button
                                type='button'
                                onClick={() => {
                                    setPreviewSource("");
                                    setSelectedFile(null);
                                    setValue(name, null);
                                }}
                                className='mt-3 text-richblack-400 underline'
                            >
                                Cancel
                            </button>
                        </div>
                    )
                    : (
                        // if no file added then display this
                        <div
                            className='flex w-full flex-col items-center p-6'
                            {...getRootProps()}
                        >
                            {/* file upload input */}
                            <input {...getInputProps()} id={name}/>
    
                            <div className='grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800'>
                                <FiUploadCloud className='text-2xl text-yellow-50'/>
                            </div>
    
                            <p className='mt-2 max-w-[200px] text-center text-sm text-richblack-200'>
                                Drag and drop an model or click to {" "}
                                <span className='font-semibold text-yellow-50'>browse</span>
                            </p>
    
                            
                        </div>        
                    )
                }
            </div>
            {
                errors[name] && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                        {label} is required
                    </span>
                )
            }
        </div>
  )
}

export default ModelUploader