import { useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { request } from "config/axios";
import useBoundStore from "hooks/useBoundStore";
import console from "utils/console";
import {
  VehicleBrandModel,
  VehicleBrand,
  VehicleSegment,
  VehicleModel,
} from "hooks/quick-bridge/segmentSlice";
import { useNonPersistentStore, usePersistentStore } from "hooks/useStore";

export const useQuickBridgeSupplier = () => {
  const [loading, setLoading] = useState(false);

  const {
    quickBridge,
    quickBridgeVehicles,
    quickBridgeOEMs,
    quickBridgeClasses,
    quickBridgeSegments,
    quickBridgeTechnologies,
    quickBridgeService,
    quickBridgeCommodities,
    quickBridgeProductionTechnologies,
    quickBridgePioneers,
  } = useBoundStore((state) => ({
    quickBridge: state.quickBridge,
    quickBridgeVehicles: state.quickBridgeVehicles,
    quickBridgeOEMs: state.quickBridgeOEMs,
    quickBridgeClasses: state.quickBridgeClasses,
    quickBridgeSegments: state.quickBridgeSegments,
    quickBridgeTechnologies: state.quickBridgeTechnologies,
    quickBridgeService: state.quickBridgeService,
    quickBridgeCommodities: state.quickBridgeCommodities,
    quickBridgeProductionTechnologies: state.quickBridgeProductionTechnologies,
    quickBridgePioneers: state.quickBridgePioneers,
  }));
  const { page, pageSize, setCount, setSuppliers, filter, q, setExtraFilter } =
    quickBridge;
  const { setSuppliers: setSuppliersStore } = useNonPersistentStore();
  const { filterData } = usePersistentStore(); //I added this to use the filter on quickbridge

  const searchSuppliers = async (
    pageNumber: number = page,
    reset = true,
    searchString?: string
    // extraFilter?: any
  ) => {
    console.log("inside search suppliers: filter: ", filter);

    try {
      setLoading(true);
      const searchObj = {
        q: q || filterData.q || searchString,
        offset: (pageNumber - 1) * pageSize,
        limit: pageSize,
        filter: {
          ...filter,
        },
      };

      /*
      if (extraFilter != null) {
        searchObj.filter = { ...searchObj.filter, ...extraFilter };
      }
      */

      console.log("quickbridge suppliers searching for", searchObj);
      const { data } = await request.post(
        `suppliers/search_full_text`,
        searchObj
      );
      // setExtraFilter({ a: 1, b: 2 });
      console.log("quick bridge result", data);
      setLoading(false);
      setSuppliers(data?.suppliers, reset);
      setSuppliersStore(data?.suppliers, reset);
      setCount(data.count);
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const searchSuppliersThreeP = async (
    pageNumber: number = page,
    reset = true,
    searchString?: string
  ) => {
    try {
      setLoading(true);
      const searchObj = {
        q: q || filterData.q || searchString,
        offset: (pageNumber - 1) * pageSize,
        limit: pageSize,
        serviceType:
          filter?.servicesType?.toString() === ""
            ? ["Logistics", "Engineering", "Quality"]
            : filter?.servicesType?.toString(),
      };

      console.log("searchObj: ", searchObj, "//", filter);
      /*
      if (extraFilter != null) {
        searchObj.filter = { ...searchObj.filter, ...extraFilter };
      }
      */

      const { data } = await request.post(`suppliers/by-3p-service`, searchObj);
      setLoading(false);
      setSuppliers(data?.suppliers, reset);
      setSuppliersStore(data?.suppliers, reset);
      setCount(data.count);
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const resetAllSelected = async () => {
    const { setSelected: setSelectedVehicle } = quickBridgeVehicles;
    const { setSelected: setSelectedOEM } = quickBridgeOEMs;
    const { setSelected: setSelectedClass } = quickBridgeClasses;
    const { setSelected: setSelectedSegment } = quickBridgeSegments;
    const { setSelected: setSelectedTechnology } = quickBridgeTechnologies;
    const { setSelected: setSelectedServices } = quickBridgeService;

    const { setSelected: setSelectedCommodity } = quickBridgeCommodities;
    const { setSelected: setSelectedProductionTechnology } =
      quickBridgeProductionTechnologies;
    const { setSelected: setSelectedPioneer } = quickBridgePioneers;

    setSelectedVehicle(null);
    setSelectedOEM(null);
    setSelectedClass(null);
    setSelectedSegment(null);
    setSelectedTechnology(null);
    setSelectedServices(null);
    setSelectedCommodity(null);
    setSelectedProductionTechnology(null);
    setSelectedPioneer(null);
  };
  return { searchSuppliers, searchSuppliersThreeP, resetAllSelected, loading };
};

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

      if (!didCancel && "vehicleTypes" in data) {
        setData(data["vehicleTypes"]);
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
  };

  return { getVehicles, loading };
};

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

      if (!didCancel && "vehicleOems" in data) {
        setData(data["vehicleOems"]);
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
  };

  return { getOEMs, loading };
};

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

      if (!didCancel && "vehicleClasses" in data) {
        setData(data["vehicleClasses"]);
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
  };

  return { getClasses, loading };
};
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
      if (!didCancel && "vehicleBrands" in data) {
        setBrands(data["vehicleBrands"]);
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
  };

  const getSegments = async (didCancel?: boolean) => {
    try {
      if (loadingSegments) return;
      console.log("getSegments - called");
      setLoadingSegments(true);
      const { data } = await request.get(`vehicle_segments`);

      if (!didCancel && "vehicleSegments" in data) {
        setSegments(data["vehicleSegments"]);
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
  };

  const getBrandModels = async (didCancel?: boolean) => {
    try {
      if (loading) return;
      console.log("getBrandModels - called");
      setLoading(true);
      const { data: brandRes } = await request.get(`vehicle_brands`);
      const { data: segmentRes } = await request.get(`vehicle_segments`);

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
              vehicleBrand: undefined,
            };

            if (segment.vehicleModels) {
              for (const _model of segment.vehicleModels) {
                if (
                  _model.vehicleBrand &&
                  _model.vehicleBrand.id &&
                  _model.vehicleBrand.id === brand.id
                ) {
                  model = _model as VehicleModel;
                  break;
                }
              }
            }
            brandModel.models.push(model as VehicleModel);
          }
          // If there is no segment's models related with a label, remove it from the array brands
          if (brandModel.models) {
            const modelCount = _.filter(
              brandModel.models as VehicleModel[],
              (model) => model.id !== 0
            ).length;
            if (modelCount === 0) {
              let [removed, ...newBrands] = brands;
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
  };

  return { getBrandModels, loading };
};
export const useQuickBridgeService = () => {
  const [loading, setLoading] = useState(false);
  const services = useBoundStore((state) => state.quickBridgeService);
  const { setData } = services;

  const getServices3P = async (didCancel?: boolean) => {
    try {
      if (loading) return;
      setLoading(true);
      const { data } = await request.get(`three_p_services`);
      if (!didCancel && "serviceTypes" in data) {
        setData(data["serviceTypes"]);
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
  };

  return { getServices3P, loading };
};

export const useQuickBridgeTechnology = () => {
  const [loading, setLoading] = useState(false);
  const technologyStore = useBoundStore(
    (state) => state.quickBridgeTechnologies
  );
  const { setData } = technologyStore;

  const getTechnologies = async (didCancel?: boolean) => {
    try {
      if (loading) return;
      console.log("getTechnologies - called");
      setLoading(true);

      const { data } = await request.get(`vehicle_fuel_types`);
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
  };

  return { getTechnologies, loading };
};

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

      if (!didCancel && "commodities" in data) {
        setData(data["commodities"]);
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
  };

  return { getCommodities, loading };
};

export const useQuickBridgeProductionTechnology = () => {
  const [loading, setLoading] = useState(false);
  const productionTechnologyStore = useBoundStore(
    (state) => state.quickBridgeProductionTechnologies
  );
  const { setData } = productionTechnologyStore;

  const getProductionTechnologies = async (didCancel?: boolean) => {
    try {
      if (loading) return;
      console.log("getProductionTechnologies - called");
      setLoading(true);
      const { data } = await request.get(`production_technologies`);

      if (!didCancel && "productionTechnologies" in data) {
        setData(data["productionTechnologies"]);
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
  };

  return { getProductionTechnologies, loading };
};

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

      if (!didCancel && "pioneers" in data) {
        setData(data["pioneers"]);
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
  };

  return { getPioneers, loading };
};
