import { useRouter } from 'next/router';
import Login from '../../components/login/login';

export default function index() {
  const router = useRouter();
  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div>
      <p>login page</p>
      <Login></Login>
      <button onClick={handleBackToHome}>go to home</button>
    </div>
  );
}
