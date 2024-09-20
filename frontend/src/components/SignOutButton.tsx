import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../services/api-client';
import { useAppContext } from '../contexts/AppContext';

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      showToast({ message: 'Sign out successful', type: 'SUCCESS' });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <button onClick={handleLogout} className="text-blue-600 px-3 py-2 font-bold bg-white hover:bg-gray-100 rounded-sm">
      Sign Out
    </button>
  );
};

export default SignOutButton;
