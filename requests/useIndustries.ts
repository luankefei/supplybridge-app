import { useState } from "react";
import { toast } from "react-toastify";

import { request } from "config/axios";
import useStore from "hooks/useStore";

export const useIndustries = () => {
  const { setIndustries } = useStore();
  const [loading, setLoading] = useState(false);

  const searchIndustries = async () => {
    try {
      setLoading(true);

      const { data } = await request.get(`industries`);
      setLoading(false);
      setIndustries(data.industries);
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return { searchIndustries, loading };
};
