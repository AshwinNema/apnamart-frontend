import { setKeyVal } from "@/app/_utils";
import L, { LayerGroup } from "leaflet";
interface newlyCreatedArea {
  radius: number;
  lat: number;
  lng: number;
}

interface currentDbAreas extends newlyCreatedArea {
  dbId: number;
}

export interface EventLayer {
  _leaflet_id: number;
  _mRadius: number;
  _latlng: {
    lat: number;
    lng: number;
  };
}

export interface featureGroupAreas {
  created: {
    [leafletId: string]: newlyCreatedArea;
  };
  deleted: number[];
  current: {
    [leafletId: string]: currentDbAreas;
  };
}

export interface deletedMapArea extends newlyCreatedArea {
  dbId?: number;
}

export interface mapProps {
  saveMapState: boolean;
  setData: setKeyVal;
  onLoadComplete: () => void;
}

export interface mapApiLayerInfo {
  id: number;
  latitude: string;
  longtitude: string;
  radius: string;
}

export interface MapLayerGroup extends LayerGroup {
  _layers: {
    [leafletId: string]: EventLayer;
  };
}

export interface LayerCircle extends L.Circle {
  _leaflet_id: number;
}
