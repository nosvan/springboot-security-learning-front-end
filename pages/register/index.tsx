import { useRouter } from 'next/router';
import Register from '../../components/register/register';

export default function index() {
  const router = useRouter();
  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div>
      <p>register page</p>
      <Register></Register>
      <button onClick={handleBackToHome}>go to home</button>
    </div>
  );
}
