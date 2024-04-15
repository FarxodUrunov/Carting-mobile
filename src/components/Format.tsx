export const FormatLoadType = (type: string | undefined): string | null => {
  const loadMap: Record<string, string> = {
    service_apartment_moving: "Service apartment moving",
    service_transportation_of_building_materials:
      "Service transportation of building materials",
    service_transportation_of_products: "Service transportation of products",
    service_furniture_transportation: "Service furniture transportation",
    service_passenger_transportation: "Service passenger transportation",
    service_transportation_of_oversized_cargo:
      "Service transportation of oversized cargo",
    service_loader_services: "Service loader services",
    service_car_rent: "Service car rent",
    service_cargo_clearance: "Service cargo clearance",
    service_insurance: "Service insurance",
    service_secure_transaction_payment: "Service secure transaction payment",
  };

  return loadMap[type as string] || null;
};
export const FormatTripType = (type: string | undefined): string | null => {
  const tripMap: Record<string, string> = {
    one_way_trip: "One way trip",
    round_trip: "Round trip",
    multi_leg_trip: "Multi leg trip",
    shuttle_service: "Shuttle service",
    custom: "Custom",
  };

  return tripMap[type as string] || null;
};

export const FormatAge = (date: any) => {
  let birthDate = new Date(date);
  let currentDate = new Date();
  let age = currentDate.getUTCFullYear() - birthDate.getUTCFullYear();

  if (
    currentDate.getUTCMonth() < birthDate.getUTCMonth() ||
    (currentDate.getUTCMonth() === birthDate.getUTCMonth() &&
      currentDate.getUTCDate() < birthDate.getUTCDate())
  ) {
    age--;
  }

  return `${age}`;
};
