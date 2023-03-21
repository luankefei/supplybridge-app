import create from 'zustand';
import { createSupplierNewsSlice, SupplierNewsSlice } from './supplierNewsSlice';
import { createMarketInsightsSlice, MarketInsightsSlice } from './marketInsightsSlice';
import { createQuickBridgeSlice, QuickBridgeSlice } from "./quick-bridge/quickBridgeSlice";
import { createVehicleSlice, VehicleSlice } from "./quick-bridge/vehicleSlice";
import { createOEMSlice, OEMSlice } from "./quick-bridge/oemSlice";
import { createClassSlice, ClassSlice } from "./quick-bridge/classSlice";
import { createSegmentSlice, SegmentSlice } from "./quick-bridge/segmentSlice";
import { createTechnologySlice, TechnologySlice } from "./quick-bridge/technologySlice";
import { createCommoditySlice, CommoditySlice } from "./quick-bridge/commoditySlice";
import { createProudctionTechnologySlice, ProductionTechnologySlice } from "./quick-bridge/productionTechnologySlice";
import { createPioneerSlice, PioneerSlice } from "./quick-bridge/pioneerSlice";
import { createFeedbackSlice, FeedbackSlice } from "./feedbackSlice";

export type TotalSlice = SupplierNewsSlice &
  MarketInsightsSlice &
  VehicleSlice &
  QuickBridgeSlice &
  OEMSlice &
  ClassSlice &
  SegmentSlice &
  TechnologySlice &
  CommoditySlice &
  ProductionTechnologySlice &
  PioneerSlice &
  FeedbackSlice &
  any;

const useBoundStore = create<TotalSlice>()((...state) => ({
  ...createSupplierNewsSlice(...state),
  ...createMarketInsightsSlice(...state),
  ...createQuickBridgeSlice(...state),
  ...createVehicleSlice(...state),
  ...createOEMSlice(...state),
  ...createClassSlice(...state),
  ...createSegmentSlice(...state),
  ...createTechnologySlice(...state),
  ...createCommoditySlice(...state),
  ...createProudctionTechnologySlice(...state),
  ...createPioneerSlice(...state),
  ...createFeedbackSlice(...state),
}));

export default useBoundStore;