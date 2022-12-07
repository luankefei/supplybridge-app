import { useState } from 'react';
import cookie from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import StorageService from 'services/storage';
import { request } from 'config/axios';

export const useAuth = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async (postData: any) => {
    try {
      setLoading(true);
      const { data } = await request.post("login", postData);
      setLoading(false);
      if (data.id) {
        StorageService.setAuthData(data.token, data.refreshToken);
        cookie.set("token", data.token, { expires: 1 / 24})
        toast.success('Success', {
          position: toast.POSITION.TOP_RIGHT,
        });
        push('/dashboard')
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return { login, loading };
};
