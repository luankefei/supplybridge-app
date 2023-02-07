import { useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { request } from "config/axios";
import useBoundStore from "hooks/useBoundStore";
import console from "utils/console";
import { VehicleBrandModel, VehicleBrand, VehicleSegment, VehicleModel } from "hooks/quick-bridge/segmentSlice";

export const useQuickBridgeVihicle = () => {
    const [loading, setLoading] = useState(false);
    const vehicleStore = useBoundStore((state) => state.quickBridgeVehicles);
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

export const useQuickBridgeOEM = () => {
    const [loading, setLoading] = useState(false);
    const oemStore = useBoundStore((state) => state.quickBridgeOEMs);
    const { setData } = oemStore;

    const getOEMs = async (didCancel?: boolean) => {
        try {
            if (loading) return;
            console.log("getOEMs - called");
            setLoading(true);

            const { data } = await request.get(`vehicle_oems`);

            console.log(data);
            if (!didCancel && "vehicleOems" in data) {
                setData(data["vehicleOems"]);
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

    return { getOEMs, loading };
}

export const useQuickBridgeClass = () => {
    const [loading, setLoading] = useState(false);
    const classStore = useBoundStore((state) => state.quickBridgeClasses);
    const { setData } = classStore;

    const getClasses = async (didCancel?: boolean) => {
        try {
            if (loading) return;
            console.log("getClasses - called");
            setLoading(true);

            const { data } = await request.get(`vehicle_classes`);

            console.log(data);
            if (!didCancel && "vehicleClasses" in data) {
                setData(data["vehicleClasses"]);
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

    return { getClasses, loading };
}

export const useQuickBridgeSegment = () => {
    const [loadingSegments, setLoadingSegments] = useState(false);
    const [loadingBrands, setLoadingBrands] = useState(false);
    const [loading, setLoading] = useState(false);
    const segmentStore = useBoundStore((state) => state.quickBridgeSegments);
    const { setSegments, setBrands, setBrandModels } = segmentStore;

    const getBrands = async (didCancel?: boolean) => {
        try {
            if (loadingBrands) return;
            console.log("getBrands - called");
            setLoadingBrands(true);

            const { data } = await request.get(`pvehicle_brands`);

            console.log(data);
            if (!didCancel && "vehicleBrands" in data) {
                setBrands(data["vehicleBrands"]);
                setLoadingBrands(false);
                return;
            }
            setLoadingBrands(false);
        } catch (err: any) {
            if (!didCancel) {
                setLoadingBrands(false);
            }
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    const getSegments = async (didCancel?: boolean) => {
        try {
            if (loadingSegments) return;
            console.log("getSegments - called");
            setLoadingSegments(true);

            const { data } = await request.get(`vehicle_segments`);

            console.log(data);
            if (!didCancel && "vehicleSegments" in data) {
                setSegments(data["vehicleSegments"]);
                setLoadingSegments(false);
                return;
            }
            setLoadingSegments(false);
        } catch (err: any) {
            if (!didCancel) {
                setLoadingSegments(false);
            }
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    const getBrandModels = async (didCancel?: boolean) => {
        try {
            if (loading) return;
            console.log("getBrandModels - called");
            setLoading(true);

            const { data: brandRes } = await request.get(`vehicle_brands`);
            console.log(brandRes);
            const { data: segmentRes } = await request.get(`vehicle_segments`);
            console.log(segmentRes);

            if (!didCancel) {
                let segments: VehicleSegment[] = [];
                let brands: VehicleBrand[] = [];
                let brandModels: VehicleBrandModel[] = [];
                if ("vehicleSegments" in segmentRes) {
                    segments = segmentRes["vehicleSegments"] as VehicleSegment[];
                }
                if ("vehicleBrands" in brandRes) {
                    brands = brandRes["vehicleBrands"] as VehicleBrand[];
                }

                for (const brand of brands) {
                    let brandModel = brand as VehicleBrandModel;
                    brandModel.models = [];
                    for (const segment of segments) {
                        let model: VehicleModel = {
                            id: 0,
                            name: "",
                            brandId: 0,
                            segmentId: 0,
                            vehicleBrand: undefined
                        };

                        if (segment.vehicleModels) {
                            for (const _model of segment.vehicleModels) {
                                if (_model.vehicleBrand &&
                                    _model.vehicleBrand.id &&
                                    _model.vehicleBrand.id === brand.id) {
                                    model = _model as VehicleModel;
                                    break;
                                }
                            }
                        }
                        brandModel.models.push(model as VehicleModel);
                    }
                    // If there is no segment's models related with a label, remove it from the array brands 
                    console.log(brandModel.models);
                    if (brandModel.models) {
                        const modelCount = _.filter(
                            brandModel.models as VehicleModel[],
                            (model => model.id !== 0)
                        ).length;
                        console.log(modelCount);
                        if (modelCount === 0) {
                            let [removed, ...newBrands] = brands;
                            console.log(brands);
                            console.log(newBrands);
                            brands = newBrands;
                            continue;
                        }
                    }

                    brandModels.push(brandModel);
                }

                setBrandModels(brandModels, brands, segments);
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

    return { getBrandModels, loading };
}

export const useQuickBridgeTechnology = () => {
    const [loading, setLoading] = useState(false);
    const technologyStore = useBoundStore((state) => state.quickBridgeTechnologies);
    const { setData } = technologyStore;

    const getTechnologies = async (didCancel?: boolean) => {
        try {
            if (loading) return;
            console.log("getTechnologies - called");
            setLoading(true);

            const { data } = await request.get(`vehicle_fuel_types`);

            console.log(data);
            if (!didCancel && "vehicleFuelTypes" in data) {
                setData(data["vehicleFuelTypes"]);
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

    return { getTechnologies, loading };
}

export const useQuickBridgeCommodity = () => {
    const [loading, setLoading] = useState(false);
    const commodityStore = useBoundStore((state) => state.quickBridgeCommodities);
    const { setData } = commodityStore;

    const getCommodities = async (didCancel?: boolean) => {
        try {
            if (loading) return;
            console.log("getCommodities - called");
            setLoading(true);

            const { data } = await request.get(`commodities`);

            console.log(data);
            if (!didCancel && "commodities" in data) {
                setData(data["commodities"]);
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

    return { getCommodities, loading };
}

export const useQuickBridgeProductionTechnology = () => {
    const [loading, setLoading] = useState(false);
    const productionTechnologyStore = useBoundStore((state) => state.quickBridgeProductionTechnologies);
    const { setData } = productionTechnologyStore;

    const getProductionTechnologies = async (didCancel?: boolean) => {
        try {
            if (loading) return;
            console.log("getProductionTechnologies - called");
            setLoading(true);

            const { data } = await request.get(`production_technologies`);

            console.log(data);
            if (!didCancel && "productionTechnologies" in data) {
                setData(data["productionTechnologies"]);
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

    return { getProductionTechnologies, loading };
}

export const useQuickBridgePioneer = () => {
    const [loading, setLoading] = useState(false);
    const pioneerStore = useBoundStore((state) => state.quickBridgePioneers);
    const { setData } = pioneerStore;

    const getPioneers = async (didCancel?: boolean) => {
        try {
            if (loading) return;
            console.log("getPioneers - called");
            setLoading(true);

            const { data } = await request.get(`pioneers`);

            console.log(data);
            if (!didCancel && "pioneers" in data) {
                setData(data["pioneers"]);
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

    return { getPioneers, loading };
}

export const resetAllSelected = () => {
    const {
        quickBridgeVehicles,
        quickBridgeOEMs,
        quickBridgeClasses,
        quickBridgeSegments,
        quickBridgeTechnologies,
        quickBridgeCommodities,
        quickBridgeProductionTechnologies,
        quickBridgePioneers
    } = useBoundStore(state => state);

    const { setSelected: setSelectedVehicle } = quickBridgeVehicles;
    const { setSelected: setSelectedOEM } = quickBridgeOEMs;
    const { setSelected: setSelectedClass } = quickBridgeClasses;
    const { setSelected: setSelectedSegment } = quickBridgeSegments;
    const { setSelected: setSelectedTechnology } = quickBridgeTechnologies;
    const { setSelected: setSelectedCommodity } = quickBridgeCommodities;
    const { setSelected: setSelectedProductionTechnology } = quickBridgeProductionTechnologies;
    const { setSelected: setSelectedPioneer } = quickBridgePioneers;

    setSelectedVehicle(null);
    setSelectedOEM(null);
    setSelectedClass(null);
    setSelectedSegment(null);
    setSelectedTechnology(null);
    setSelectedCommodity(null);
    setSelectedProductionTechnology(null);
    setSelectedPioneer(null);
}