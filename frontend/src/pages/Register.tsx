import { useForm } from 'react-hook-form';

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { register, watch } = useForm<RegisterFormData>();

  return (
    <form className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Register</h2>

      {/* First Name */}
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register('firstName', { required: 'This field is required' })}
          />
        </label>

        {/* Last Name */}
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register('lastName', { required: 'This field is required' })}
          />
        </label>
      </div>

      {/* Email */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('email', { required: 'This field is required' })}
        />
      </label>

      {/* Password */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
      </label>

      {/* Confirm Password */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('confirmPassword', {
            validate: (value) => {
              if (!value) {
                return 'This field is required';
              } else if (value !== watch('password')) {
                return 'Passwords do not match';
              }
            },
          })}
        />
      </label>

      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 font-bold rounded-sm text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
