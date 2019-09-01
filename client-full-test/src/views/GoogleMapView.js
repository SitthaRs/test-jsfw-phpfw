/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { InputGroup, Row, Col, FormControl, Button } from "react-bootstrap";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Axios from "axios";

/*
 * AIzaSyDcYfddvWPrVm2xhcJXJzIiNfIZ7bjo2IM
 */
class GoogleMapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      placeNameSearch: "",
      responsePlaces: [],
      stores: [{ lat: 18.7952345, lng: 98.93557369999999 }],
      show: false
    };

    this.handleonFocusInputText = this.handleonFocusInputText.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  handleonFocusInputText(event) {
    this.setState({ show: true });
  }

  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

    if (this.state.placeNameSearch !== "") this.handleProvince();
  }

  handleSelectChange = (value, geometry) => {
    this.setState({placeNameSearch: value}, function () {
        console.log(this.state.placeNameSearch);
    });

    this.setState({stores: [{lat: geometry.location.lat, lng: geometry.location.lng}]}, function () {
        console.log(this.state.stores);
    });

    this.displayMarkers();
  }

  handleProvince() {
    const insertdata = {
      input: this.state.placeNameSearch
    };

    Axios.post("/api/googleApi/placesApi/search", insertdata)
      .then(res => {
        if (res.data.data.candidates !== "undefined") {
          this.setState({
            responsePlaces: res.data.data.candidates
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="transaction-body mt-3">
        <Row>
          <Col lg="9" md="12">
            <p>Google Map</p>
          </Col>
        </Row>
        <Row>
          <div className="google_map">
            <Map
              google={this.props.google}
              zoom={12}
              center={this.state.stores[0]}
            >
              {this.displayMarkers()}
            </Map>
          </div>
        </Row>

        <br />

        <Row>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Place Search"
              aria-label="Place Search"
              aria-describedby="basic-addon2"
              className="myInput"
              name="placeNameSearch"
              value={this.state.placeNameSearch}
              onFocus={this.handleonFocusInputText}
              // onBlur={() => {
              //   this.setState({ show: false });
              // }}
              onChange={this.handleFieldChange}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
        <Row>
          {
            this.state.show && (
              <ul className="myUL">
                {this.state.responsePlaces.map((responsePlace, idx) => (
                  <li key={idx}>
                    <button 
                      onFocus={this.handleonFocusInputText} 
                      onClick={() => {
                        this.handleSelectChange(responsePlace.name, responsePlace.geometry); 
                      }} 
                      value={responsePlace.name}
                    >
                      {responsePlace.name}
                    </button>
                  </li>
                ))}
              </ul>
            )
          }
        </Row>

        <div className="h-100"></div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDcYfddvWPrVm2xhcJXJzIiNfIZ7bjo2IM"
})(GoogleMapView);
