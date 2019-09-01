import { DefaultLayout } from "./layouts";
import GoogleMapView from "./views/GoogleMapView";

// Route Views
export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: GoogleMapView
  }
];
