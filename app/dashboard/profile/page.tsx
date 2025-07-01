"use client";

import axios from "axios"

const page = () => {

  const logout = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,{
        withCredentials: true,
      });
      console.log('Logout successful:', response.data);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <div className=' flex flex-col text-4xl w-full h-full gap-6 items-center justify-center'>
      <p>
        i am profile page
      </p>
      <div className='text-lg cursor-pointer text-white bg-red-500 px-3 py-2 border rounded shadow-sm'
        onClick={logout}>
        Logout
      </div>
    </div>
  )
}

export default page
