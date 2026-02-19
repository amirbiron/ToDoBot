import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { User, Mail, Phone, Lock, Camera } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

function useRegisterSchema() {
  const { t } = useTranslation();

  return z
    .object({
      username: z
        .string()
        .min(1, t('register.errors.usernameRequired'))
        .min(3, t('register.errors.usernameMin'))
        .max(40, t('register.errors.usernameMax')),
      email: z
        .string()
        .min(1, t('register.errors.emailRequired'))
        .email(t('register.errors.emailInvalid')),
      phone: z
        .string()
        .refine(
          (val) => val === '' || val.replace(/\D/g, '').length >= 8,
          t('register.errors.phoneMin'),
        ),
      password: z
        .string()
        .min(1, t('register.errors.passwordRequired'))
        .min(6, t('register.errors.passwordMin'))
        .max(40, t('register.errors.passwordMax')),
      confirmPassword: z
        .string()
        .min(1, t('register.errors.confirmPasswordRequired')),
      profilePicture: z.any().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('register.errors.passwordsMustMatch'),
      path: ['confirmPassword'],
    });
}

type RegisterFormData = z.infer<ReturnType<typeof useRegisterSchema>>;

export default function RegisterPage() {
  const { t } = useTranslation();
  const schema = useRegisterSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Form submitted:', data);
  };

  const inputClasses =
    'w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none transition-all duration-300 focus:border-[#00bf63] focus:shadow-[0_0_0_3px_rgba(0,191,99,0.15)]';

  return (
    <div className="min-h-screen bg-white flex flex-col items-center relative">
      <LanguageSwitcher />

      <div className="w-full max-w-md px-6 pt-16 pb-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo.jpg" alt="Daily Dose" className="w-20 h-20 object-contain" />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          {t('register.title')}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Username */}
          <div className="mb-5">
            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400">
                <User size={20} />
              </span>
              <input
                type="text"
                placeholder={t('register.username')}
                className={`${inputClasses} ps-10`}
                {...register('username')}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400">
                <Mail size={20} />
              </span>
              <input
                type="email"
                placeholder={t('register.email')}
                className={`${inputClasses} ps-10`}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-5">
            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400">
                <Phone size={20} />
              </span>
              <input
                type="tel"
                placeholder={t('register.phone')}
                className={`${inputClasses} ps-10`}
                {...register('phone')}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-5">
            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400">
                <Lock size={20} />
              </span>
              <input
                type="password"
                placeholder={t('register.password')}
                className={`${inputClasses} ps-10`}
                {...register('password')}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400">
                <Lock size={20} />
              </span>
              <input
                type="password"
                placeholder={t('register.confirmPassword')}
                className={`${inputClasses} ps-10`}
                {...register('confirmPassword')}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Profile Picture */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-500 text-sm mb-2 cursor-pointer">
              <Camera size={18} />
              {t('register.profilePicture')}
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#00bf63]/10 file:text-[#00bf63] hover:file:bg-[#00bf63]/20 file:cursor-pointer file:transition-colors"
              {...register('profilePicture')}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#00bf63] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#00d970] hover:shadow-lg cursor-pointer"
          >
            {t('register.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
