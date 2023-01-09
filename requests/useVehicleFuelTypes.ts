import { useState } from "react";
import { toast } from "react-toastify";

import { request } from "config/axios";
import useStore from "hooks/useStore";

export const useVehicleFuelTypes = () => {
  const { setVehicleFuelTypes } = useStore();
  const [loading, setLoading] = useState(false);

  const searchFuelTypes = async () => {
    try {
      setLoading(true);

      const { data } = await request.get(`vehicle_fuel_types`);
      setLoading(false);
      setVehicleFuelTypes(data.vehicleFuelTypes);
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return { searchFuelTypes, loading };
};
