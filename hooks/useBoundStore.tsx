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
import { createServiceSlice, ServiceSlice } from './quick-bridge/threePService';

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
  ServiceSlice &
  PioneerSlice &
  FeedbackSlice;

const useBoundStore = create<TotalSlice>()((...args) => ({
  ...createSupplierNewsSlice(...args),
  ...createMarketInsightsSlice(...args),
  ...createQuickBridgeSlice(...args),
  ...createVehicleSlice(...args),
  ...createOEMSlice(...args),
  ...createClassSlice(...args),
  ...createSegmentSlice(...args),
  ...createTechnologySlice(...args),
  ...createCommoditySlice(...args),
  ...createProudctionTechnologySlice(...args),
  ...createPioneerSlice(...args),
  ...createServiceSlice(...args),
  ...createFeedbackSlice(...args),
}));

export default useBoundStore;
