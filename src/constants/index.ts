import { PlateEnum } from "@anysoftuz/carting-shared";

export const vehicleType = [
  { id: "truck", value: "truck" },
  { id: "van", value: "van" },
  { id: "trailer", value: "trailer" },
  { id: "refrigerate_vehicle", value: "refrigerate_vehicle" },
  { id: "tanker", value: "tanker" },
  { id: "flatbed", value: "flatbed" },
  { id: "pickup_truck", value: "pickup_truck" },
  { id: "container", value: "container" },
  { id: "special_vehicle", value: "special_vehicle" },
];

export const loadType = [
  {
    id: "service_passenger_transportation",
    value: "service_passenger_transportation",
    selected: false,
  },
  {
    id: "service_apartment_moving",
    value: "service_apartment_moving",
    selected: false,
  },
  {
    id: "service_transportation_of_building_materials",
    value: "service_transportation_of_building_materials",
    selected: false,
  },
  {
    id: "service_transportation_of_products",
    value: "service_transportation_of_products",
    selected: false,
  },
  {
    id: "service_furniture_transportation",
    value: "service_furniture_transportation",
    selected: false,
  },
  {
    id: "service_transportation_of_oversized_cargo",
    value: "service_transportation_of_oversized_cargo",
    selected: false,
  },
  {
    id: "service_loader_services",
    value: "service_loader_services",
    selected: false,
  },
  { id: "service_car_rent", value: "service_car_rent", selected: false },
  {
    id: "service_cargo_clearance",
    value: "service_cargo_clearance",
    selected: false,
  },
  { id: "service_insurance", value: "service_insurance", selected: false },
  {
    id: "service_secure_transaction_payment",
    value: "service_secure_transaction_payment",
    selected: false,
  },
];

export const supplementaryOptions = [
  { id: "tent_trailer", value: "tent_trailer", selected: false },
  { id: "fridge", value: "fridge", selected: false },
];

export const paymentMethods = [
  { id: "card", value: "card", selected: false },
  { id: "cash", value: "cash", selected: false },
];
export const routeMethods = [
  { id: "1", value: "route 1", selected: false },
  { id: "2", value: "route 2", selected: false },
  { id: "3", value: "route 3", selected: false },
];
export const currencyOptions = [
  { id: "uzs", value: "uzs" },
  { id: "usd", value: "usd" },
];
export const vehicleOptions = [
  { id: "truck", value: "truck" },
  { id: "van", value: "van" },
  { id: "trailer", value: "trailer" },
  { id: "refrigerate_vehicle", value: "refrigerate_vehicle" },
  { id: "tanker", value: "tanker" },
  { id: "flatbed", value: "flatbed" },
  { id: "pickup_truck", value: "pickup_truck" },
  { id: "cargo_bike", value: "cargo_bike" },
  { id: "container", value: "container" },
  { id: "special_vehicle", value: "special_vehicle" },
];

export const gearboxOptions = [
  { id: "auto", value: "auto" },
  { id: "manual", value: "manual" },
];
export const statusOptions = [
  { id: "active", value: "active" },
  { id: "inactive", value: "inactive" },
];

export const autoNumberOptions = [
  { id: "legal_entity", value: "legal_entity" },
  { id: "supreme_state_body", value: "supreme_state_body" },
  { id: "individuals", value: "individuals" },
  { id: "diplomatic_mission_head", value: "diplomatic_mission_head" },
  { id: "diplomatic_head_relative", value: "diplomatic_head_relative" },
  { id: "un_mission_head", value: "un_mission_head" },
  { id: "foreign_citizens", value: "foreign_citizens" },
  { id: "electric_car_uzb", value: "electric_car_uzb" },
  { id: "electric_car_uzb_second", value: "electric_car_uzb_second" },
];

export const tripOptions = [
  { id: "one_way_trip", value: "one_way_trip" },
  { id: "round_trip", value: "round_trip" },
  { id: "multi_leg_trip", value: "multi_leg_trip" },
  { id: "shuttle_service", value: "shuttle_service" },
  { id: "custom", value: "custom" },
];
export const regionOptions = [
  { id: "1", value: "Tahkent" },
  { id: "2", value: "Samarqand" },
];
export const routeOptions = [
  { id: "1", value: "Route 1" },
  { id: "2", value: "Route 2" },
];
export const fuelType = [
  { id: "diesel", value: "diesel" },
  { id: "gasoline", value: "gasoline" },
  { id: "natural_gas", value: "natural_gas" },
  { id: "electric", value: "electric" },
];

export const experienceOptions = [
  { id: "less_than_a_year", value: "less_than_a_year" },
  { id: "from_1_to_3_years", value: "from_1_to_3_years" },
  { id: "from_3_to_6_years", value: "from_3_to_6_years" },
  { id: "more_than_6_years", value: "more_than_6_years" },
];

export const LicenseOptions = [
  { id: "A", value: "A", selected: false },
  { id: "B", value: "B", selected: false },
  { id: "C", value: "C", selected: false },
  { id: "D", value: "D", selected: false },
  { id: "BE", value: "BE", selected: false },
  { id: "CE", value: "CE", selected: false },
  { id: "DE", value: "DE", selected: false },
];

export const ProposalStatus = {
  in_proposal_state: "going_to_pickup_location",
  going_to_pickup_location: "pickup_load",
  pickup_load: "start_delivery",
  start_delivery: "arrived",
  arrived: "unload",
  unload: "completed",
};

export const PlateStateObject = {
  [PlateEnum.LEGAL_ENTITY]: {
    format: "99 999 AAA",
    example: "99 999 AAA",
    regex: /^\d{2} \d{3} [A-Z]{3}$/,
  },
  [PlateEnum.SUPREME_STATE_BODY]: {
    format: "PAA 999",
    example: "PAA 999",
    regex: /^PAA \d{3}$/,
  },
  [PlateEnum.INDIVIDUALS]: {
    format: "99 A 999 AA",
    example: "99 A 999 AA",
    regex: /^\d{2} [A-Z] \d{3} [A-Z]{2}$/,
  },
  [PlateEnum.DIPLOMATIC_MISSION_HEAD]: {
    format: "CMD 9999",
    example: "CMD 9999",
    regex: /^CMD \d{4}$/,
  },
  [PlateEnum.DIPLOMATIC_HEAD_RELATIVE]: {
    format: "D 999999",
    example: "D 999999",
    regex: /^D \d{6}$/,
  },
  [PlateEnum.UN_MISSION_HEAD]: {
    format: "UN 9999",
    example: "UN 9999",
    regex: /^UN \d{4}$/,
  },
  [PlateEnum.FOREIGN_CITIZENS]: {
    format: "99 H 999999",
    example: "99 H 999999",
    regex: /^\d{2} H \d{6}/,
  },
  [PlateEnum.ELECTRIC_CAR_UZB]: {
    format: "99 A 999 AA",
    example: "99 A 999 AA",
    regex: /^\d{2} [A-Z] \d{3} [A-Z]{2}$/,
  },
  [PlateEnum.ELECTRIC_CAR_UZB_SECOND]: {
    format: "99 999 AAA",
    example: "99 999 AAA",
    regex: /^\d{2} \d{3} [A-Z]{3}$/,
  },
};
