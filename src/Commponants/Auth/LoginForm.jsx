import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, UserIcon, EyeIcon, EyeSlashIcon, SparklesIcon } from '@heroicons/react/24/solid';

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Check for custom registered user bypass
      const customUserStr = localStorage.getItem('cv_custom_user');
      if (customUserStr) {
        try {
          const customUser = JSON.parse(customUserStr);
          if (
            customUser && 
            customUser.username.toLowerCase() === formData.username.toLowerCase()
          ) {
            const savedPassword = localStorage.getItem('cv_password') || customUser.password;
            if (formData.password === savedPassword) {
              localStorage.setItem('cv_token', 'mock_token_' + customUser.username);
              localStorage.setItem('cv_username', customUser.username);
              
              const existingAvatar = localStorage.getItem('cv_avatar') || customUser.avatar;
              localStorage.setItem('cv_avatar', existingAvatar);
              
              const existingProfile = localStorage.getItem('cv_profile');
              if (!existingProfile) {
                localStorage.setItem('cv_profile', JSON.stringify({
                  name: `${customUser.firstName} ${customUser.lastName}`,
                  email: customUser.email,
                  bio: `CineVerse Enthusiast (aka @${customUser.username}) 🎬`,
                  location: 'Cairo, Egypt',
                  website: '',
                }));
              }
              
              localStorage.setItem('cv_password', formData.password);
              window.dispatchEvent(new Event('authChanged'));

              setSuccess(true);
              setTimeout(() => {
                navigate('/');
              }, 1200);
              return;
            } else {
              throw new Error('Invalid credentials.');
            }
          }
        } catch (err) {
          throw new Error(err.message || 'Invalid credentials.');
        }
      }

      // 2. Handle DummyJSON API Login with Custom Password bypass
      let apiPassword = formData.password;
      const savedPassword = localStorage.getItem('cv_password');
      const savedUsername = localStorage.getItem('cv_username');
      
      if (
        savedUsername && 
        savedUsername.toLowerCase() === formData.username.toLowerCase() && 
        savedPassword
      ) {
        if (formData.password !== savedPassword) {
          throw new Error('Invalid credentials.');
        }
        // Swap to the original DummyJSON password for the API call
        apiPassword = `${formData.username.toLowerCase()}pass`;
      }

      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: apiPassword,
          expiresInMins: 60,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // Save token and user details to localStorage
      localStorage.setItem('cv_token', data.accessToken || data.token);
      localStorage.setItem('cv_username', data.username);
      if (!localStorage.getItem('cv_password')) {
        localStorage.setItem('cv_password', formData.password);
      }
      localStorage.setItem('cv_avatar', data.image);
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
            <p className='text-slate-400 text-sm'>Enter the cinematic universe</p>
          </div>

          {/* Tabs */}
          <div className='flex gap-8 justify-center mb-8 border-b border-slate-800 pb-4'>
            <button className='pb-2 font-bold text-base text-amber-400 border-b-2 border-amber-400 cursor-default'>
              Login
            </button>
            <button
              onClick={() => navigate('/auth/signup')}
              className='pb-2 font-bold text-base text-slate-500 hover:text-white transition cursor-pointer'
            >
              Sign Up
            </button>
          </div>

          {/* Demo Hint */}
          <div className='bg-amber-400/10 border border-amber-400/20 rounded-2xl p-4 mb-6 text-xs text-amber-300'>
            <p className='font-bold mb-1.5 flex items-center gap-1.5'>
              <SparklesIcon className='w-4 h-4' /> Demo Credentials:
            </p>
            <div className='space-y-0.5'>
              <p>Username: <span className='font-mono font-bold text-white selection:bg-amber-400 selection:text-slate-900'>emilys</span></p>
              <p>Password: <span className='font-mono font-bold text-white selection:bg-amber-400 selection:text-slate-900'>emilyspass</span></p>
            </div>
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
              🎉 Login Successful! Redirecting...
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className='space-y-5'>
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

            {/* Password Input */}
            <div className='space-y-1.5'>
              <div className='flex justify-between items-center'>
                <label className='block text-slate-400 text-xs font-bold uppercase tracking-wider'>Password</label>
              </div>
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

            {/* Sign In Button */}
            <button
              type='submit'
              disabled={loading || success}
              className='w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 transition font-bold text-white text-sm py-3 rounded-xl mt-6 cursor-pointer disabled:opacity-50 active:scale-95 duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-600/20'
            >
              {loading ? (
                <div className='w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin' />
              ) : (
                'Sign In'
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