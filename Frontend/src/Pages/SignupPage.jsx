import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { signup } from '../lib/api';
import { ShipWheelIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const queryClient = useQueryClient();

  const { mutate: signupMutation, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    signupMutation(signupData);

    setSignupData({
      fullName: "",
      email: "",
      password: "",
    })
  }

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/* Signup form - Left Side */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* Logo */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className="size-9 text-primary" />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
              Blogify
            </span>
          </div>
          {/* Error Message */}
          {error && (
            toast.success(error.repsonse.data.message)
          )}
          <div className='w-full'>
            <form onSubmit={handleSignup}>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-xl font-semibold'>
                    Create a account
                  </h2>
                  <p>
                    Join Streamify and start your language learning adventure!
                  </p>
                </div>

                <div className='space-y-3'>
                  {/* FullName */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>FullName</span>
                    </label>
                    <input type="text"
                      placeholder='Your Full Name'
                      className='input input-bordered w-full'
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  {/* Email */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input type="email"
                      placeholder='abc@email.com'
                      className='input input-bordered w-full'
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
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
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                    <p className='text-xs opacity-70 mt-1'>
                      Password must be at least 6 characters long
                    </p>
                  </div>
                </div>

                <button className='btn btn-primary w-full' type='submit' disabled={isPending}>{isPending ? (
                  <>
                    <span className='loading loading-spinner loading-xs'></span>
                  </>
                ) : (
                  "Create Account"
                )}</button>

                <div className='text-center mt-4'>
                  <p className='text-sm'>
                    Already have an account? <Link to="/login" className='text-primary font-semibold'>Login</Link>
                  </p>
                </div>
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
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage