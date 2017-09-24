import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import _ from "lodash"

class MapComponent extends Component {
  render(){
    return(
      <GoogleMap
        defaultZoom={this.props.zoom}
        defaultCenter={this.props.center}
        onMarkerClick={_.noop}
        options={{streetViewControl: false, mapTypeControl: false, zoomControl: false, fullscreenControl: false}}>
      </GoogleMap>
    )
  }
}

export default withGoogleMap(MapComponent)