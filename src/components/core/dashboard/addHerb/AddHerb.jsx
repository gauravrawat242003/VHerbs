import React from 'react'
import { RenderSteps } from './RenderSteps'

const AddHerb = () => {
  return (
    <div className='py-20 mx-auto'>
        <div className="flex flex-col">
            <h1 className="mb-14 text-3xl font-medium">
              Add Herb
            </h1>
            <div>
              <RenderSteps />
            </div>
        </div>
    </div>
  )
}

export default AddHerb