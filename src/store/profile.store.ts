import { create } from "zustand";
import { ProfileState } from "_/profile";
import { Alert } from "react-native";
import {
  createTransport,
  deleteTransport,
  getTransport,
  getTransports,
  updateTransport,
} from "_api/transport";
import { GetCountries, GetRegions } from "_api/utils";
import { getVehicleBrands, getVehicleModels } from "_api/vehicle";
import {
  CreateCareerWithTruck,
  CreateCareerWithoutTruck,
  DeleteCv,
  GetCareer,
  GetCareers,
  GetUserTrucks,
  updateCareer,
} from "_api/profile";
import { FormatMedia } from "_utils/formatMedia";
import { DeleteMediaFile, UploadMediaFile } from "_api/media";
import { useAuth } from "./auth.store";
import i18next from "i18next";
import { PlateEnum } from "@anysoftuz/carting-shared";
import { PlateStateObject } from "_constants/index";
const { t } = i18next;
export const useProfile = create<ProfileState>((set, get) => ({
  isLoading: false,
  isLoad: {
    careers: false,
    vehicles: false,
    careersDetail: false,
    vehiclesDetail: false,
    getVehicles: false,
    cv: false,
    deleteVehicle: false,
  },
  careers: {
    data: [],
    pageInfo: {
      endCursor: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: 0,
    },
    totalCount: 0,
  },
  cvDetail: {},
  trucks: [],
  confirmData: {},
  myVehicles: {
    data: [],
    pageInfo: {
      endCursor: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: 0,
      totalCount: 0,
    },
  },
  vehicleDetail: {},
  countries: [],
  regions: [],
  countryOptions: [],
  brands: [],
  models: [],
  autoNumberType: "",
  autoPlaceholder: "00 000 MMM",
  plateState: {
    format: PlateStateObject[PlateEnum.LEGAL_ENTITY].format,
    example: PlateStateObject[PlateEnum.LEGAL_ENTITY].example,
    regex: PlateStateObject[PlateEnum.LEGAL_ENTITY].regex,
  },

  rememberDetails(data: any) {
    const confirmData = get().confirmData;
    set({ confirmData: { ...confirmData, ...data } });
  },

  getVehicleDetail(id) {
    set({ isLoad: { ...get().isLoad, vehiclesDetail: true } });
    return getTransport(id)
      .then(({ data }) => {
        set({ vehicleDetail: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoad: { ...get().isLoad, vehiclesDetail: false } });
      });
  },
  getCareers() {
    set({ isLoad: { ...get().isLoad, careers: true } });
    return GetCareers()
      .then(({ data }) => {
        set({ careers: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoad: { ...get().isLoad, careers: false } });
      });
  },
  getCareerDetail(id, type) {
    set({ isLoad: { ...get().isLoad, careersDetail: true } });
    return GetCareer(id, type)
      .then(({ data }) => {
        set({ cvDetail: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoad: { ...get().isLoad, careersDetail: false } });
      });
  },
  getUserTrucks() {
    set({ isLoad: { ...get().isLoad, getVehicles: true } });
    return GetUserTrucks()
      .then(({ data }) => {
        set({ trucks: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoad: { ...get().isLoad, getVehicles: false } });
      });
  },
  getMyVehicles(params) {
    set({ isLoad: { ...get().isLoad, vehicles: true } });
    return getTransports(params)
      .then(({ data }) => {
        set({ myVehicles: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoad: { ...get().isLoad, vehicles: false } });
      });
  },

  async createWithoutTruck(payload) {
    try {
      set({ isLoading: true });
      const getCareers = get().getCareers;
      const [res]: any = await Promise.all([
        CreateCareerWithoutTruck({ ...payload }),
        getCareers(),
      ]);
      Alert.alert(t("successfully_created"));
      return res.data.id;
    } catch (error: any) {
      if (error?.response?.data) {
        Alert.alert(error.response.data.error, error.response.data.message);
      } else {
        Alert.alert(t("system_error"), t("see_console"));
      }
    } finally {
      set({ isLoading: false });
    }
  },
  async createWithTruck() {
    let confirmData = get().confirmData;
    try {
      set({ isLoading: true });
      const getCareers = get().getCareers;

      const [res]: any = await Promise.all([
        CreateCareerWithTruck(confirmData),
        getCareers(),
      ]);
      Alert.alert(t("successfully_created"));
      return res.data.id;
    } catch (error: any) {
      if (error?.response?.data) {
        if (error.response.data.statusCode === 409) {
          Alert.alert(t("cv_already_created"));
        } else {
          Alert.alert(error.response.data.error, error.response.data.message);
        }
      } else {
        Alert.alert(t("system_error"), t("see_console"));
      }
    } finally {
      set({ isLoading: false });
    }
  },
  async createNewTruck() {
    let confirmData = get().confirmData;
    try {
      set({ isLoading: true });

      const getMyVehicles = get().getMyVehicles;
      const [res]: any = await Promise.all([
        createTransport(confirmData),
        getMyVehicles(),
      ]);
      Alert.alert(t("successfully_created"));
      return res.data.id;
    } catch (error: any) {
      if (error?.response?.data) {
        Alert.alert(error.response.data.error, error.response.data.message);
      } else {
        Alert.alert(t("system_error"), t("see_console"));
      }
    } finally {
      set({ isLoading: false });
    }
  },

  getCountries() {
    set({ isLoading: true });
    return GetCountries()
      .then(({ data }) => {
        const updatedList = data?.map((obj: { id: number; name: string }) => ({
          id: obj.id.toString(),
          value: obj.name,
        }));
        set({ countryOptions: updatedList });
        set({ countries: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  getRegions(country_id: number) {
    set({ isLoading: true });
    return GetRegions(country_id)
      .then(({ data }) => {
        set({ regions: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  getBrands() {
    set({ isLoading: true });
    return getVehicleBrands()
      .then(({ data }) => {
        if (data.length > 0) {
          data.forEach((obj: any) => {
            obj.id = `${obj.id}`;
            obj.value = obj.name;
            delete obj.name;
          });
        } else {
          Alert.alert(t("no_model_create_transport"));
        }
        set({ brands: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  getModels(id) {
    set({ isLoading: true });
    return getVehicleModels(id)
      .then(({ data }) => {
        if (data.length > 0) {
          data.forEach((obj: any) => {
            obj.id = `${obj.id}`;
            obj.value = obj.name;
            delete obj.name;
          });
        } else {
          Alert.alert(t("no_model_create_transport"));
        }

        set({ models: data });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },

  changeAutoNumberType(id: keyof typeof PlateStateObject) {
    // console.log("PlateStateObject[id]", PlateStateObject[id]);
    set({ autoNumberType: id });
    set({ plateState: PlateStateObject[id] });
    switch (id) {
      case "legal_entity":
        set({ autoPlaceholder: "00 000 MMM" });
        break;
      case "supreme_state_body":
        set({ autoPlaceholder: "PAA 000" });
        break;
      case "individuals":
        set({ autoPlaceholder: "00 M 000 MM" });
        break;
      case "diplomatic_mission_head":
        set({ autoPlaceholder: "CMD 0000" });
        break;
      case "diplomatic_head_relative":
        set({ autoPlaceholder: "D 000000" });
        break;
      case "un_mission_head":
        set({ autoPlaceholder: "UN 0000" });
        break;
      case "foreign_citizens":
        set({ autoPlaceholder: "00 H 000000" });
        break;
      case "electric_car_uzb":
        set({ autoPlaceholder: "00 M 000 ME" });
        break;
      case "electric_car_uzb_second":
        set({ autoPlaceholder: "00 000 MME" });
        break;
      default:
        break;
    }
  },

  clearValues() {
    let confirmData = get().confirmData;
    for (let prop in confirmData) {
      delete confirmData[prop];
    }
  },
  setEditValues() {
    let vehicleDetail = get().vehicleDetail;
    let getModels = get().getModels;
    vehicleDetail.brand_type = vehicleDetail.brand_id;
    getModels(vehicleDetail.brand_type);
    // vehicleDetail.photos = vehicleDetail.photos?.map(
    //   (item: string, i: number) => ({
    //     id: `${item} - ${i}`,
    //     url: item,
    //   })
    // );
    // vehicleDetail.files = vehicleDetail.files?.map((item: any, i: number) => ({
    //   id: `${item.url} - ${i}`,
    //   url: item.url,
    // }));

    set({ confirmData: vehicleDetail });
  },
  setEditCvValues() {
    let cvDetail = get().cvDetail;
    // if (cvDetail.photo) {
    //   cvDetail.photo = cvDetail.photo?.map((item: string, i: number) => ({
    //     id: `${item} - ${i}`,
    //     url: item,
    //   }));
    // }
    // if (cvDetail.          ) {
    //   cvDetail.files = cvDetail.files?.map((item: any, i: number) => ({
    //     id: `${item.url} - ${i}`,
    //     url: item.url,
    //   }));
    // }

    set({ confirmData: cvDetail });
  },

  updateVehicle(id, payload) {
    set({ isLoading: true });
    const getVehicleDetail = get().getVehicleDetail;
    // if (
    //   payload.photos &&
    //   payload.photos.length > 0 &&
    //   typeof payload.photos[0] !== "string"
    // ) {
    //   payload.photos = payload.photos.map((item: any) => item.url);
    // }
    delete payload.files;
    return updateTransport(id, payload)
      .then(({ data }) => {
        // if we push detail page
        getVehicleDetail(id);
        Alert.alert(t("successfully_updated"));
        return data.id;
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  updateCv(type, id, payload) {
    set({ isLoading: true });
    const getCareerDetail = get().getCareerDetail;
    // if (
    //   payload.photos &&
    //   payload.photos.length > 0 &&
    //   typeof payload.photos[0] !== "string"
    // ) {
    //   payload.photos = payload.photos.map((item: any) => item.url);
    // }

    return updateCareer(type, id, payload)
      .then(({ data }) => {
        getCareerDetail(data.id, type);
        Alert.alert(t("successfully_updated"));
        return data.id;
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },

  async uploadPhotos(payload) {
    const formdataPhotos = await FormatMedia(payload);
    const response = await UploadMediaFile("photos", formdataPhotos);
    return response.data;
  },
  async uploadFiles(payload) {
    const formdataFiles = await FormatMedia(payload);
    const response = await UploadMediaFile("files", formdataFiles);

    return response.data;
  },
  async deleteProfilePhoto(id: string) {
    set({ isLoading: true });
    const editProfile = useAuth.getState().editProfile;
    const { photo, country, ...user } = useAuth.getState().user;
    return await DeleteMediaFile(id)
      .then(({ data }) => {
        Alert.alert(t("successfully_deleted"));
        editProfile({ ...user, region_id: user.region?.id });
        return data;
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },

  async deleteCv(id: string) {
    set({ isLoad: { ...get().isLoad, cv: true } });
    return await DeleteCv(id)
      .then((data) => {
        Alert.alert(t("successfully_deleted"));
        return data;
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoad: { ...get().isLoad, cv: false } });
      });
  },

  async deleteVehicle(id: number) {
    set({ isLoad: { ...get().isLoad, deleteVehicle: true } });
    const getMyVehicles = get().getMyVehicles;
    return await deleteTransport(id)
      .then(({ data }) => {
        Alert.alert(t("successfully_deleted"));
        getMyVehicles();
        return data.id;
      })
      .catch((err) => {
        Alert.alert(err.response.data.error, err.response.data.message);
      })
      .finally(() => {
        set({ isLoad: { ...get().isLoad, deleteVehicle: false } });
      });
  },
}));
