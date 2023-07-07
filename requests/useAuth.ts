import { useState } from "react";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import StorageService from "services/storage";
import { request } from "config/axios";

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
        StorageService.setSurveyCount(data.surveyPopupCount ?? 0);
        cookie.set("token", data.token, { expires: 1 / 24 });
        toast.success("Success", {
          position: toast.POSITION.TOP_RIGHT,
        });
        push("/dashboard");
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const emailLogin = async (postData: any) => {
    try {
      setLoading(true);
      const { data } = await request.post(`emailLoginVerify?email=${
         encodeURIComponent(postData.email)
      }&token=${
         encodeURIComponent(postData.token)
      }`, { a: 1, b: 2, c: 3, o: 4 });
      setLoading(false);
      if (data.id) {
        StorageService.setAuthData(data.token, data.refreshToken);
        StorageService.setSurveyCount(data.surveyPopupCount ?? 0);
        cookie.set("token", data.token, { expires: 1 / 24 });
        toast.success("Success", {
          position: toast.POSITION.TOP_RIGHT,
        });
        push("/dashboard");
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const sendVerificationEmail = async () => {
     try {
        const ts = new Date().getTime();
        const lastTs = new Date(parseInt(window.localStorage.getItem('emailloginint') || '0')).getTime();
        if (ts - lastTs < 1000 * 60) return;
        window.localStorage.setItem('emailloginint', `${new Date().getTime()}`);
        setLoading(true);
        const email0 = window.localStorage.getItem('emaillogin');
        window.localStorage.removeItem('emaillogin');
        if (!email0) return;
        await request.post(`emailLogin?email=${encodeURIComponent(email0)}`, { a: 1, b: 2, c: 3, o: 5 });
        setLoading(false);
        toast.info("Verfication email sent, please check your email inbox and use the mentioned link to login.", {
           position: toast.POSITION.TOP_RIGHT,
        });
     } catch (err: any) {
        setLoading(false);
        toast.error(err.response.data.message, {
           position: toast.POSITION.TOP_RIGHT,
        });
     }
  };

  const updateAccount = async (postData: any) => {
    try {
      setLoading(true);
      const { data } = await request.put(`account`, postData);
      setLoading(false);
      if (data.id) {
        StorageService.setAuthData(data.token, data.refreshToken);
        StorageService.setSurveyCount(data.surveyPopupCount ?? 0);
        cookie.set("token", data.token, { expires: 1 / 24 });
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return { login, updateAccount, loading, emailLogin, sendVerificationEmail };
};
