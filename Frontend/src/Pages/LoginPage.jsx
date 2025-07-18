import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'
import { login } from '../lib/api';
import { ShipWheelIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const { theme } = useThemeStore();

  const queryClient = useQueryClient();

  const { mutate: loginMutuation, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutuation(loginData);
  }

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme={theme}>
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/* Login form - Left Side */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* Logo */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className="size-9 text-primary" />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
              Blogify
            </span>
          </div>
          <div className='w-full'>
            <form onSubmit={handleLogin}>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-xl font-semibold'>
                    Login to your Account
                  </h2>
                  <p>
                    Welcome back! Please enter your credentials to continue.
                  </p>
                </div>

                <div className='space-y-3'>
                  {/* Email */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input type="email"
                      placeholder='abc@email.com'
                      className='input input-bordered w-full'
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  {/* Password */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input type="password"
                      placeholder='*********'
                      className='input input-bordered w-full'
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button className='btn btn-primary w-full' type='submit' disabled={isPending}>{isPending ? (
                  <>
                    <span className='loading loading-spinner loading-xs'></span>
                  </>
                ) : (
                  "Login"
                )}</button>
              </div>

              <div className='text-center mt-4'>
                <p className='text-sm'>
                  Don't have a account?<Link to="/signup" className='text-primary font-semibold'> Signup</Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Signup form- Right Side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Blogging_bro.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with blogs partners worldwide</h2>
              <p className="opacity-70">
                Colloborate, make friends, and improve your blog skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage