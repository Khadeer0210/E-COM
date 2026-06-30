'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/lib/validation';
import { register as registerUser } from '@/lib/api';
import { useUserStore } from '@/store/userStore';
import { ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const loginUser = useUserStore((s) => s.login);
  const [loading, setLoading] = useState(false);

  const { register: reg, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const res = await registerUser(data);
      loginUser(res.user, res.token);
      router.push('/');
    } catch { /* */ }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-4xl p-8 sm:p-10 shadow-elevated">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold">Create Account</h1>
          <p className="text-off-black/50 mt-2 text-sm">Join the LUXE community</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Full Name</label>
            <input {...reg('name')} placeholder="Your name"
              className="w-full bg-white/70 border border-off-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-off-black/30 transition" />
            {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input {...reg('email')} type="email" placeholder="you@example.com"
              className="w-full bg-white/70 border border-off-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-off-black/30 transition" />
            {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <input {...reg('password')} type="password" placeholder="Min 6 characters"
              className="w-full bg-white/70 border border-off-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-off-black/30 transition" />
            {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-off-black text-white py-3.5 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-off-black/90 transition disabled:opacity-50">
            {loading ? 'Creating...' : <>Create Account <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>
        <p className="text-center text-sm text-off-black/50 mt-6">
          Already have an account?{' '}
          <Link href="/account/login" className="text-off-black font-medium underline underline-offset-4">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
