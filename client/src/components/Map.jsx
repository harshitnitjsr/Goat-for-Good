import React, { useState, useCallback, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const center = {
  lat: 18.91070000,
  lng: 73.32354000,
};
function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
function DraggableMarker({formData,setFormData}) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const [data, setData] = useState([center]);

  const markerRef = useRef(null);
  
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          setPosition(newPosition);
          setData([...data, newPosition]); // Add new position to the data array
          console.log("Marker position after drag:", newPosition);
          setFormData({...formData, latitude:newPosition.lat, longitude:newPosition.lng});
          console.log(formData)
          data.map((d)=>{
console.log(d);
          })
        }
      },
    }),
    [data]
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

export default function MyMap({formData, setFormData}) {
  return (
 <>
    <MapContainer
      center={{ lat: 18.91070000, lng: 73.32354000 }}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "750px", zIndex: "9999" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker formData={formData} setFormData={setFormData} />
      <LocationMarker />
    </MapContainer>
    
    
    
    </>
  );
}
