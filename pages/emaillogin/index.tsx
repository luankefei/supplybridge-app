import { useEffect } from "react";
import { emailPattern } from "utils/validator";
import { useAuth } from "requests/useAuth";
import { useSearchParams } from 'next/navigation';

let timer: any = null;

function cleanupBusy() {
   if (timer) {
      clearTimeout(timer);
      timer = 0;
   }
   timer = setTimeout(() => {
      timer = 0;
      window.localStorage.removeItem('emailloginbusy');
   }, 2000);
}

export default function Login() {
  const { emailLogin } = useAuth();
  const params = useSearchParams();
  const email = params.get('email');
  const password = params.get('token');
  if (!email || !password || !emailPattern.test(email)) {
     return <div>Invalid</div>;
  }
  const busy = window.localStorage.getItem('emailloginbusy');
  if (busy) {
     cleanupBusy();
     return <div>Invalid</div>;
  }
  window.localStorage.setItem('emailloginbusy', 'true');

  (async () => {
     try {
        await emailLogin({ email, token: password });
     } catch(err) {
     } finally {
        cleanupBusy();
     }
  })();

  return (
     <div>Authenticating && Redirecting ...</div>
  );
}

