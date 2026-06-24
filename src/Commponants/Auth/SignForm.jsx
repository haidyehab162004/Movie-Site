import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon, UserIcon, EyeIcon, EyeSlashIcon, SparklesIcon } from '@heroicons/react/24/solid';

export default function SignForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('cv_token')) {
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const nameParts = formData.fullName.trim().split(' ');
    const firstName = nameParts[0] || 'New';
    const lastName = nameParts.slice(1).join(' ') || 'User';

    try {
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      // Simulate successful registration & login
      const customUserData = {
        firstName,
        lastName,
        username: data.username,
        email: data.email,
        password: formData.password,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
      };
      localStorage.setItem('cv_custom_user', JSON.stringify(customUserData));
      localStorage.setItem('cv_username', data.username);
      localStorage.setItem('cv_password', formData.password);
      localStorage.setItem('cv_token', 'mock_token_' + data.username);
      localStorage.setItem('cv_avatar', customUserData.avatar);
      localStorage.setItem('cv_profile', JSON.stringify({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        bio: `CineVerse Enthusiast (aka @${data.username}) 🎬`,
        location: 'Cairo, Egypt',
        website: '',
      }));
      window.dispatchEvent(new Event('authChanged'));

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-[#0a1128] to-slate-950 flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-md'>
        {/* Card */}
        <div className='bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 relative overflow-hidden'>
          <div className='absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50' />

          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-extrabold text-white mb-2 tracking-tight'>
              Cine<span className='text-amber-400'>Verse</span>
            </h1>
            <p className='text-slate-400 text-sm'>Create your account to join the universe</p>
          </div>

          {/* Tabs */}
          <div className='flex gap-8 justify-center mb-8 border-b border-slate-800 pb-4'>
            <button
              onClick={() => navigate('/auth/login')}
              className='pb-2 font-bold text-base text-slate-500 hover:text-white transition cursor-pointer'
            >
              Login
            </button>
            <button className='pb-2 font-bold text-base text-amber-400 border-b-2 border-amber-400 cursor-default'>
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className='bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-3.5 mb-6 leading-relaxed'>
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className='bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl p-3.5 mb-6 text-center font-bold animate-pulse'>
              🎉 Registration Successful! Auto-logging you in...
            </div>
          )}

          {/* SIGNUP FORM */}
          <form onSubmit={handleSignUp} className='space-y-5'>
            {/* Full Name Input */}
            <div className='space-y-1.5'>
              <label className='block text-slate-400 text-xs font-bold uppercase tracking-wider'>Full Name</label>
              <div className='relative'>
                <UserIcon className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500' />
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder='Emily Johnson'
                  required
                  disabled={loading || success}
                  className='w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 disabled:opacity-50 transition'
                />
              </div>
            </div>

            {/* Username Input */}
            <div className='space-y-1.5'>
              <label className='block text-slate-400 text-xs font-bold uppercase tracking-wider'>Username</label>
              <div className='relative'>
                <UserIcon className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500' />
                <input
                  type='text'
                  name='username'
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder='emilys'
                  required
                  disabled={loading || success}
                  className='w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 disabled:opacity-50 transition'
                />
              </div>
            </div>

            {/* Email Input */}
            <div className='space-y-1.5'>
              <label className='block text-slate-400 text-xs font-bold uppercase tracking-wider'>Email Address</label>
              <div className='relative'>
                <EnvelopeIcon className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500' />
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='emily@example.com'
                  required
                  disabled={loading || success}
                  className='w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 disabled:opacity-50 transition'
                />
              </div>
            </div>

            {/* Password Input */}
            <div className='space-y-1.5'>
              <label className='block text-slate-400 text-xs font-bold uppercase tracking-wider'>Password</label>
              <div className='relative'>
                <LockClosedIcon className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='••••••••'
                  required
                  disabled={loading || success}
                  className='w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 disabled:opacity-50 transition'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading || success}
                  className='absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white transition disabled:opacity-50 cursor-pointer'
                >
                  {showPassword ? (
                    <EyeSlashIcon className='w-4 h-4' />
                  ) : (
                    <EyeIcon className='w-4 h-4' />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading || success}
              className='w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 transition font-bold text-white text-sm py-3 rounded-xl mt-6 cursor-pointer disabled:opacity-50 active:scale-95 duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-600/20'
            >
              {loading ? (
                <div className='w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin' />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer Text */}
          <p className='text-center text-slate-500 text-[11px] mt-8 leading-relaxed'>
            By continuing, you agree to CineVerse's{' '}
            <a href='#' className='text-amber-400 hover:text-amber-300 transition'>Terms of Service</a>
            {' '}and{' '}
            <a href='#' className='text-amber-400 hover:text-amber-300 transition'>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
