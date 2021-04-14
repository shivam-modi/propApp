import React, { Component } from 'react'
import { db, firebase, storage } from "../backend/firebase";
import { v4 as uuidv4 } from "uuid";

//creating a refernec of context api
const PropertyContext = React.createContext();

export default class PropertyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      sortedProperties: [],
      loading: true,
      type: "all",
      price: 0,
      minPrice: 500,
      maxPrice: 0,
      purpose: "all",
      security: false,
      modularKitchen: false,
      lift: false,
      parking: false,
      layout: "all",
    };
  }

  componentDidMount() {
    db.collection("properties")
      .get()
      .then((snapshot) => {
        let estates = [];
        snapshot.forEach((doc) => estates.push(doc.data()));
        let properties = this.formatData(estates);

        let maxPrice = Math.max(
          ...properties.map((item) => parseInt(item.price))
        );

        this.setState({
          properties: properties,
          sortedProperties: properties,
          price: maxPrice,
          maxPrice: maxPrice,
          loading: false,
        });
      })
      .catch((e) => console.error(e));
  }

  formatData(allItems) {
    let tempItems = allItems.map((item) => {
      let id = item.id;
      let images = item.images.map((image) => image);
      let room = { ...item, images, id };

      return room;
    });

    return tempItems;
  }

  getProperty = (id) => {
    let tempProperty = [...this.state.properties];
    const property = tempProperty.find((property) => property.id === id);

    return property;
  };

  handlePage = (pageFor) => {
    let tempProperties = [...this.state.properties];
    //filter by purpose
    tempProperties = tempProperties.filter(
      (property) => property.purpose === pageFor
    );
    this.setState({
      sortedProperties: tempProperties,
      purpose: pageFor,
    });
  };

  getPropertiesById = (userId) => {
    return db.collection("properties").where("userId", "==", userId).get()
  }

  deleteImageUsingUrl = (imgUrl) => {
    let img = storage.refFromURL(imgUrl);
    return img.delete()
  } 

  removeProperty = (userId, propertyId) => {
    const propertyReference = db.collection("properties").where("userId", "==", userId).where("id", "==", propertyId)
    propertyReference.get().then((qShorts) => {
      qShorts.forEach((doc) => {
        const images = doc.data()["images"];
        images.forEach((imgurl) => {
          this.deleteImageUsingUrl(imgurl).then(
            doc.ref.delete()
          )
        })
      })
    })
  }

  uploadProperty = (
    userId,
    personalDetails,
    purpose,
    propType,
    description,
    location,
    age,
    bdRoom,
    isSale,
    balcony,
    btRoom,
    floorNo,
    tfloorNo,
    furnished,
    security,
    modularKitchen,
    lift,
    parking,
    metro,
    hospital,
    airport,
    busStand,
    size,
    superBuiltSize,
    areaUnit,
    availMonth,
    availYear,
    price,
    imagesUrl,
    isRegistry
  ) => {
    const propId = uuidv4();
    return db.collection("properties").add({
      id: propId,
      userId: userId,
      uploadBy: personalDetails,
      purpose: purpose,
      type: propType,
      description: description,
      location: location,
      age: age,
      bedroom: bdRoom,
      registery: isSale ? isRegistry : "no",
      balcony: balcony,
      bathroom: btRoom,
      propFloor: floorNo,
      totalFloor: tfloorNo,
      furnished: furnished,
      security: security,
      modularKitchen: modularKitchen,
      lift: lift,
      parking: parking,
      metroDis: metro,
      hospitalDis: hospital,
      airportDis: airport,
      busstandDis: busStand,
      totalArea: size,
      builtArea: superBuiltSize,
      areaUnit: areaUnit,
      availMonth: availMonth,
      availYear: availYear,
      price: price,
      images: imagesUrl,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value,
      },
      this.filterProperties
    );
  };
  filterProperties = () => {
    let {
      properties: properties,
      type,
      capacity,
      price,
      purpose,
      security,
      modularKitchen,
      lift,
      parking,
      layout,
    } = this.state;

    //all the properties
    let tempProperties = [...properties];
    capacity = parseInt(capacity);
    price = parseInt(price);

    //filter by type
    if (type !== "all") {
      tempProperties = tempProperties.filter(
        (property) => property.type === type
      );
    }
    //filter by purpose
    if (purpose !== "all") {
      tempProperties = tempProperties.filter(
        (property) => property.purpose === purpose
      );
    }
    //filter by layout
    if (layout !== "all") {
      tempProperties = tempProperties.filter(
        (property) => property.bedroom === layout[0]
      );
    }
    //filter by price
    tempProperties = tempProperties.filter(
      (property) => property.price <= price
    );

    // //filter by size
    // tempProperties = tempProperties.filter(
    //   (property) => property.size >= minSize && property.size <= maxSize
    // );

    //filter by lift
    if (lift) {
      tempProperties = tempProperties.filter(
        (property) => property.lift === true
      );
    }

    //filter by parking
    if (parking) {
      tempProperties = tempProperties.filter(
        (property) => property.parking === true
      );
    }

    //filter by modular kitchen
    if (modularKitchen) {
      tempProperties = tempProperties.filter(
        (property) => property.modularKitchen === true
      );
    }

    //filter by security
    if (security) {
      tempProperties = tempProperties.filter(
        (property) => property.security === true
      );
    }

    this.setState({
      sortedProperties: tempProperties,
    });
  };

  render() {
    return (
      <PropertyContext.Provider
        value={{
          ...this.state,
          getProperty: this.getProperty,
          handleChange: this.handleChange,
          handlePage: this.handlePage,
          uploadProperty: this.uploadProperty,
          getPropertiesById: this.getPropertiesById,
          removeProperty: this.removeProperty,
          deleteImageUsingUrl: this.deleteImageUsingUrl
        }}
      >
        {this.props.children}
      </PropertyContext.Provider>
    );
  }
}

const PropertyConsumer = PropertyContext.Consumer;

//Higher order component for Consumer

export function withPropertyConsumer(Component){
    return function ConsumerWrapper(props){
        return <PropertyConsumer>
            {
                value => <Component {...props} context={value}/>
            }
        </PropertyConsumer>
    }
}

export{PropertyProvider, PropertyConsumer, PropertyContext};