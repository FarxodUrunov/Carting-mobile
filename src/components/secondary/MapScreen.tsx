// import { UrlTile } from "react-native-maps";
// import { developers } from "_constants/mockData";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { getDistance } from "geolib";
import { useTranslation } from "react-i18next";

// @ts-ignore
// import MapViewNavigation, {
//   NavigationModes,
//   TravelModeBox,
//   TravelIcons,
//   Geocoder,
//   TravelModes,
//   DirectionsListView,
//   ManeuverView,
//   DurationDistanceView,
// } from "react-native-maps-navigation";

// const GOOGLE_API_KEY = "GOOGLE_KEY";
// const USE_METHODS = false;

export default function MapScreen({ mapDetails }: { mapDetails: any }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [marker, setMarker] = useState({
    latitude: mapDetails.pickup_latitude,
    longitude: mapDetails.pickup_longitude,
  });
  const [marker2, setMarker2] = useState({
    latitude: mapDetails.delivery_latitude,
    longitude: mapDetails.delivery_longitude,
  });
  // const [navi, setNavi] = useState({
  //   origin: { latitude: marker.latitude, longitude: marker.longitude },
  //   destination: "132 Wilmot St, San Francisco, CA 94115",
  //   navigationMode: NavigationModes.IDLE,
  //   travelMode: TravelModes.DRIVING,
  //   isFlipped: false,
  //   isNavigation: false,
  //   route: false,
  //   step: false,
  // });
  const [polygon, setPolygon] = useState([]);
  const [distance, setDistance] = useState();
  useEffect(() => {
    const calculation = getDistance(
      { latitude: marker.latitude, longitude: marker.longitude },
      { latitude: marker2.latitude, longitude: marker2.longitude }
    );
    setDistance(calculation);
  }, [polygon]);

  // const handleRegionChange = (region: any) => {
  //   if (step === 1) {
  //     setShow(false);

  //     setMarker({
  //       latitude: region.latitude,
  //       longitude: region.longitude,
  //     });
  //   } else if (step === 2) {
  //     setShow(false);

  //     setMarker2({
  //       latitude: region.latitude,
  //       longitude: region.longitude,
  //     });
  //   }
  // };
  // const handleRegionComplete = (region: any) => {
  //   if (step === 1) {
  //     setShow(true);
  //     setMarker({
  //       latitude: region.latitude,
  //       longitude: region.longitude,
  //     });
  //   } else if (step === 2) {
  //     setShow(true);
  //     setMarker2({
  //       latitude: region.latitude,
  //       longitude: region.longitude,
  //     });
  //   }
  // };
  // const handleNext = () => {
  //   if (step === 1) {
  //     setStep(2);
  //   } else if (step === 2) {
  //     setStep(3);
  //     setPolygon([marker, marker2]);
  //   }
  // };
  // const handleDrag = (e: any, id: any) => {
  //   e.stopPropagation
  //   e.preventDefault
  //   e.defaultPrevented
  //   e.isDefaultPrevented
  //   e.isPropagationStopped
  //   new Date(e.timeStamp)

  // };

  return (
    <View className="flex-1 relative">
      <MapView
        // onRegionChange={(region) => handleRegionChange(region)}
        // onRegionChangeComplete={(region) => handleRegionComplete(region)}
        className="flex-1"
        mapType="standard"
        initialRegion={{
          latitude: mapDetails.pickup_latitude,
          longitude: mapDetails.pickup_longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={{ height: "100%" }}
      >
        {/* {developers.map((item) => (
          <Marker
            draggable
            key={item.id}
            onDragStart={() => console.log("Start")}
            onDrag={() => console.log("Ondrag")}
            onDragEnd={(e) => console.log("End", e.nativeEvent)}
            isPreselected={true}
            // onDragEnd={(e) => handleDrag(e,item.id)}
            coordinate={{
              latitude: item.location.latitude,
              longitude: item.location.longitude,
            }}
            style={{ width: 40, height: 40 }}
            title={item.name}
            description={item.currentDescription}
          >
            <Image
              className="rounded-full"
              source={item.url}
              style={{ height: 40, width: 40 }}
            />
          </Marker>
        ))} */}
        <Marker
          onPress={(e) => console.log("Pressed", e)}
          draggable
          pinColor={"red"}
          onDragStart={() => console.log("Start")}
          onDrag={() => console.log("Ondrag")}
          onDragEnd={(e) => console.log("End", e.type)}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          style={{ width: 40, height: 40 }}
          title={t("pickup_location")}
          // description={"I am there"}
        />
        <Marker
          draggable
          onDragStart={() => console.log("Start")}
          onDrag={() => console.log("Ondrag")}
          onDragEnd={(e) => console.log("End", e.type)}
          coordinate={{
            latitude: marker2.latitude,
            longitude: marker2.longitude,
          }}
          style={{ width: 40, height: 40 }}
          title={t("delivery_location")}
          // description={"Address"}
          pinColor={"green"}
        />
        {/* {(step === 2 || step === 3) && (
        )} */}
        <MapViewDirections
          origin={marker}
          destination={marker2}
          apikey={"AIzaSyAsWh2k-xvwNjXA2Oox4oq8PG6M9fwDWeY"}
          strokeWidth={3}
          strokeColor="rgba(255,90,0,0.8)"
        />
        {step === 3 && (
          <>
            {/* <MapViewNavigation
              origin={navi.origin}
              destination={navi.destination}
              navigationMode={navi.navigationMode}
              travelMode={navi.travelMode}
              // ref={(ref) => (this.refNavigation = ref)}
              // map={() => this.refMap}
              apiKey={'AIzaSyAsWh2k-xvwNjXA2Oox4oq8PG6M9fwDWeY'}
              simulate={true}
              // onRouteChange={(route) => this.setState({ route })}
              // onStepChange={(step, nextStep) => this.setState({ step, nextStep })}
              displayDebugMarkers={true}
              onNavigationStarted={(route) => console.log('Navigation Started')}
              // onNavigationCompleted={(route) => this.setState({ isNavigation: false })}
            /> */}
          </>
        )}
      </MapView>
      {/* {show && (
        <TouchableOpacity
          onPress={handleNext}
          className="w-full px-4 py-6 rounded-t-md justify-center items-center absolute bottom-0 bg-yellow-500 "
        >
          <Text className="text-white font-medium">Next</Text>
        </TouchableOpacity>
      )} */}
      {distance && (
        <View
          style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          className="absolute w-full top-0 left-0 p-2 justify-center items-center"
        >
          <Text className="  text-xl text-red-600">
            {distance >= 1000
              ? Math.floor(distance / 1000) + " km " + (distance % 1000) + " m"
              : distance + " m"}{" "}
          </Text>
        </View>
      )}
    </View>
  );
}
