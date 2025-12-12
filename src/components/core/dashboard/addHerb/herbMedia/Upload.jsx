import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';

// icons
import { FiUploadCloud } from "react-icons/fi"

const Upload = ({name, label, isRequired=false, setValue, register, errors, video=false, editData=null}) => {

    const [selectedFile, setSelectedFile] = useState("");
    const [previewSource, setPreviewSource] = useState(editData ? editData : "");

    // function to display preview of file
    const displayPreviewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreviewSource(reader.result);
        }
    }

    // function to add file to input (when using drag & drop)
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if(file) {
            displayPreviewFile(file);
            setSelectedFile(file);
        }
    }

      const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: video 
            ? {"video/*": [".mp4"]}
            : {"image/*": [".jpeg", ".jpg", ".png"]},
        onDrop,
      });

      // register input field on first render
      useEffect(() => {
        register(name, {required: isRequired});
      }, []);

      // set updated value to form state when there is a change
      useEffect(() => {
        setValue(name, selectedFile);
      }, [selectedFile, setValue]);

  return (
    <div className='flex flex-col space-y-2'>

        <label className='text-sm' htmlFor={name}>
            {label}
            {isRequired && <sup className='text-red-500'>*</sup>}
        </label>
        
        {/* input box */}
        <div
            className={`${isDragActive ? 'bg-richblack-600' : 'bg-gradient-to-r from-slate-50 to-cyan-50'}
                flex min-h-[250px]  cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
        >
            {
                // if an file is added then display preview of that file
                previewSource ? (
                    <div className='flex w-full flex-col p-6'>
                        {
                            // if file is a video
                            video ? (
                                <ReactPlayer 
                                    height="100%" 
                                    width="100%" 
                                    controls={true} 
                                    playsinline={true}
                                    url={previewSource}
                                />
                            ) : (
                                <img
                                    src={previewSource}
                                    alt="preview image"
                                    className='max-h-[400px] rounded-md object-contain'
                                />
                            )
                        }

                        {/* cancel button */}
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
                            Drag and drop an {video ? "video" : "image"}, or click to {" "}
                            <span className='font-semibold text-yellow-50'>browse</span>
                        </p>

                        
                    </div>        
                )
            }
        </div>

        {/* file is required error */}
        {
            !editData && errors[name] && (
                <span className='ml-2 text-xs tracking-wide text-pink-200'>
                    {label} is required
                </span>
            )
        }
    </div>
  )
}

export default Upload