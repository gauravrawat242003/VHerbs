import React from 'react'

const MissionAndVision = () => {
  return (
    <>
        <div className='w-[75%] max-w-[1280px] mx-auto'>
            <div className='mt-24 flex flex-col sm:flex-row justify-between gap-8'>
                {/* mission  */}
                <div>
                    <p className='text-3xl font-bold tracking-wider font-sans'>
                        Our Mission
                    </p>
                    <p className='mt-2 tracking-wide'>
                        Our mission goes beyond sharing information—we aim to create an interactive space where users can explore, learn, and appreciate the healing power of medicinal plants. VHerb is more than a knowledge hub; it's a global community of herbal enthusiasts, students, and practitioners. Through immersive 3D models, engaging content, and interactive discussions, we foster collaboration and shared wisdom. Whether you're a beginner or an expert, VHerb connects tradition with technology, making herbal knowledge accessible to all.
                    </p>
                </div>

                {/* vision */}
                <div>
                    <p className='text-3xl font-bold tracking-wider font-sans'>
                        Our Vision
                    </p>
                    <p className='mt-2 tracking-wide'>
                        With this vision in mind, we embarked on a mission to make herbal knowledge more accessible, engaging, and impactful. Our team of experts has meticulously crafted a platform that blends advanced technology with rich, interactive content, creating an immersive learning experience. By bridging ancient healing traditions with modern innovation, we aim to empower individuals with practical health solutions while fostering sustainability and preserving herbal wisdom for generations to come.
                    </p>
                </div>

            </div>
        </div>
    </>
  )
}

export default MissionAndVision