import React, { useState } from 'react';
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

export default function SignForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign Up:', formData);
    // Handle signup logic here
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-md'>
        {/* Card */}
        <div className='bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-amber-400 mb-2'>CineVerse</h1>
            <p className='text-gray-400 text-lg'>Enter the cinematic universe</p>
          </div>

          {/* Tabs */}
          <div className='flex gap-8 justify-center mb-8 border-b border-gray-700 pb-4'>
            <button
              onClick={() => navigate('/auth/login')}
              className='pb-2 font-semibold text-lg text-gray-400 hover:text-white transition'
            >
              Login
            </button>
            <button className='pb-2 font-semibold text-lg text-amber-400 border-b-2 border-amber-400'>
              Sign Up
            </button>
          </div>

          {/* Google Sign In */}
          <button className='w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 transition rounded-xl px-4 py-3 mb-6 border border-gray-700'>
            <svg viewBox='0 0 24 24' width='20' height='20' xmlns='http://www.w3.org/2000/svg'>
              <text x='2' y='16' fontSize='10' fill='%234285F4'>G</text>
            </svg>
            <span className='text-white font-medium'>Sign in with Google</span>
          </button>

          {/* Divider */}
          <div className='flex items-center gap-4 mb-6'>
            <div className='flex-1 h-px bg-gray-700'></div>
            <span className='text-gray-500 text-sm font-semibold'>OR EMAIL</span>
            <div className='flex-1 h-px bg-gray-700'></div>
          </div>

          {/* SIGNUP FORM */}
          <form onSubmit={handleSignUp} className='space-y-5'>
            {/* Full Name Input */}
            <div>
              <label className='block text-gray-300 text-sm font-medium mb-2'>Full Name</label>
              <div className='relative'>
                <UserIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500' />
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder='John Doe'
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition'
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className='block text-gray-300 text-sm font-medium mb-2'>Email Address</label>
              <div className='relative'>
                <EnvelopeIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500' />
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='email@example.com'
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition'
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className='text-gray-300 text-sm font-medium mb-2 block'>Password</label>
              <div className='relative'>
                <LockClosedIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500' />
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='••••••••'
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition'
                />
              </div>
            </div>

            {/* Create Account Button */}
            <button
              type='submit'
              className='w-full bg-red-500 hover:bg-red-600 transition font-semibold text-white py-3 rounded-lg mt-6'
            >
              Create Account
            </button>
          </form>

          {/* Footer Text */}
          <p className='text-center text-gray-500 text-xs mt-6'>
            By continuing, you agree to CineVerse's{' '}
            <a href='#' className='text-amber-400 hover:text-amber-300'>Terms of Service</a>
            {' '}and{' '}
            <a href='#' className='text-amber-400 hover:text-amber-300'>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
