import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "config/axios";
import useBoundStore from "hooks/useBoundStore";
import console from "utils/console";

export const useQuickBridgeVihicle = () => {
    const [loading, setLoading] = useState(false);
    const vehicleStore = useBoundStore((state) => state.vehicles);
    const { setData } = vehicleStore;

    const getVehicles = async (didCancel?: boolean) => {
        try {
            if (loading) return;
            console.log("getVehicles - called");
            setLoading(true);

            const { data } = await request.get(`vehicle_types`);

            console.log(data);
            if (!didCancel && "vehicleTypes" in data) {
                setData(data["vehicleTypes"]);
                setLoading(false);
                return;
            }
            setLoading(false);
        } catch (err: any) {
            if (!didCancel) {
                setLoading(false);
            }
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    return { getVehicles, loading };
}