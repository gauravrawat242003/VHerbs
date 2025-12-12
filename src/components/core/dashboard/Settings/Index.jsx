import React from 'react'

// compnents
import ProfileDetails from './ProfileDetails';
import ChangePassword from './ChangePassword';
import ProfilePicture from './ProfilePicture';
import DeleteAccount from './DeleteAccount';

const Settings = () => {    

  return (
    <div className='py-20 flex flex-col items-start gap-10'>

      {/* heading */}
      <section className='text-3xl font-bold'>
          <h2>Edit Profile</h2>
      </section>

      {/* change profile picture */}
      <section className='w-full space-y-6'>
        <ProfilePicture/>          
      </section>
      
      <section className='w-full space-y-6'>
        <ProfileDetails/>
      </section>
      
      {/* update password */}
      <section className='w-full space-y-6'>
        <ChangePassword/>
      </section>

      {/* Delete account */}
      <section className='w-full space-y-6'>
        <DeleteAccount/>
      </section>
    </div>
  )
}

export default Settings