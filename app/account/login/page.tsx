'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/validation';
import { login } from '@/lib/api';
import { useUserStore } from '@/store/userStore';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const loginUser = useUserStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError('');
    try {
      const res = await login(data.email, data.password);
      loginUser(res.user, res.token);
      router.push('/');
    } catch {
      setError('Invalid email or password. Try demo@luxe.com / password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-4xl p-8 sm:p-10 shadow-elevated">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold">Welcome Back</h1>
          <p className="text-off-black/50 mt-2 text-sm">Sign in to your LUXE account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input {...register('email')} type="email" placeholder="demo@luxe.com"
              className="w-full bg-white/70 border border-off-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-off-black/30 transition" />
            {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <div className="relative">
              <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="password"
                className="w-full bg-white/70 border border-off-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-off-black/30 transition pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-off-black/40">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {error && <p className="text-rose-500 text-sm bg-rose-50 p-3 rounded-xl">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-off-black text-white py-3.5 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-off-black/90 transition disabled:opacity-50">
            {loading ? 'Signing in...' : <>Sign In <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>

        <p className="text-center text-sm text-off-black/50 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/account/register" className="text-off-black font-medium underline underline-offset-4">Create one</Link>
        </p>

        <div className="mt-6 p-3 bg-off-black/5 rounded-xl text-center">
          <p className="text-xs text-off-black/40">Demo: demo@luxe.com / password</p>
        </div>
      </motion.div>
    </div>
  );
}
