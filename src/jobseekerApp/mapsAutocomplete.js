import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class MapsAutocomplete extends React.Component {
  constructor(props) {
    super(props)
    const { input: { value, onChange } } = this.props
    if(value){
      this.state = { 
        address: value,
        geocodeResults: null,
        loading: false
      }
    }
    else{
      this.state = { 
        address: "",
        geocodeResults: null,
        loading: false
      }
    }
    this.enterPressed = (address) => {
      this.setState({ address })
      onChange(address)
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
  }
  handleSelect(address) {
    const { input: { value, onChange } } = this.props
    this.setState({
      address,
      loading: true
    })
    onChange(address)
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false
        })
        this.handleUpdatingUserMarker(lat, lng)
      })
      .catch((error) => {
        console.log('Oh no!', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false
        })
      this.handleUpdatingUserMarker(0, 0)
      })
  }
  handleUpdatingUserMarker(lat, lng){
    let newMarker = {
      position: {
        lat, lng
      }
    }
    this.props.updateUserMarker(newMarker)
    this.props.createRoutesAndDuration()
  }
  renderGeocodeSuccess(lat, lng) {}
  renderGeocodeFailure(err) {
    return (
      <div 
        className="alert alert-danger" 
        role="alert"
        style={{backgroundColor: "white"}}
      >
        Not found.
      </div>
    )
  }
  render() {
    const styleObj = {
      input: { padding: "6px", width: "176px"},
      autocompleteContainer: { 
      zIndex: "99999", backgroundColor: 'green', width: "100%"},
      autocompleteItem: { color: '#000', fontSize: "12px", padding: "3px" },
      autocompleteItemActive: { color: '#00BCD4' },
      googleLogoImage: { width: "100px"}
    }
    const inputProps = {
      type: "text",
      value: this.state.address,
      onChange: this.enterPressed,
      placeholder: 'Postcode (Required)',
      autoFocus: true,
      name: 'Demo__input',
      id: "my-input-id",
    }

    const errorStyle = {
      position: "absolute",
      display: "inline",
      backgroundColor: "white",
      marginLeft: "100px",
      marginTop: "-28px",
      width: "70px",
      color: "red"
    }
    const { meta: { touched, dirty, error } } = this.props
    return (
      <div>
        <div>
          <PlacesAutocomplete 
            onSelect={this.handleSelect}
            styles={styleObj} 
            inputProps={inputProps} 
            onEnterKeyDown={this.handleSelect}
          />
          {this.state.loading ? <div style={{backgroundColor: "white"}}>Loading...</div> : null}
          {!this.state.loading && this.state.geocodeResults ?
                <div className='geocoding-results'>{this.state.geocodeResults}</div> :
              null}
        </div>
        {(dirty || touched) ? <div style={errorStyle}>{error}</div> : ""}
      </div>
    )
  }
}

export default MapsAutocomplete