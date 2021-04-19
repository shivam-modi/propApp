import React, { useState, useEffect } from "react";
import { storage } from "../backend/firebase";
import PropertyImageU from "../components/PropertyImageU";
import Title from "../components/Title";
import loader from "../public/assets/giphy.gif";
import Loading from "../components/Loading"
import PropertyFeatures from "../components/PropertyFeatures";
import AreaAndTransaction from "../components/AreaAndTransaction";
import { useAuth } from "../contexts/AuthContext";
import { Button, Form, Container, Card, Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import PropertyAddress from "../components/PropertyAddress";
import { withPropertyConsumer } from "../contexts/PropertyContext";
import { v4 as uuidV4 } from "uuid";
import Head from "next/head";

const NewProperty = ({ context }) => {
  const [PropType, setPropType] = useState("");
  const [loading, setLoading] = useState(false);
  const [Purpose, setPurpose] = useState("");
  const [Size, setSize] = useState("");
  const [SuperBuiltSize, setSuperBuiltSize] = useState("");
  const [AreaUnit, setAreaUnit] = useState("Sq-ft");
  const [AvailMonth, setAvailMonth] = useState("Month");
  const currYear = new Date().getFullYear();
  const [AvailYear, setAvailYear] = useState(currYear.toString());
  const [Location, setLocation] = useState({
    address: "",
    locality: "",
    pincode: "",
    state: "",
  });
  const [IsSale, setIsSale] = useState(false);
  const [Description, setDescription] = useState("");
  const [Progress, setProgress] = useState(0);
  const [PersonalDetails, setPersonalDetails] = useState("");
  const [isRegistry, setIsRegistry] = useState(false);
  const [Parking, setParking] = useState(false);
  const [Price, setPrice] = useState(500);
  const [Metro, setMetro] = useState(0);
  const [BdRoom, setBdRoom] = useState("1");
  const [BtRoom, setBtRoom] = useState("1");
  const [Balcony, setBalcony] = useState("0");
  const [FloorNo, setFloorNo] = useState("Lower Basement");
  const [tfloorNo, setTfloorNo] = useState("1");
  const [BusStand, setBusStand] = useState(0);
  const [Airport, setAirport] = useState(0);
  const [Hospital, setHospital] = useState(0);
  const [Furnished, setFurnished] = useState("unfurnished");
  const [Lift, setLift] = useState(false);
  const [Age, setAge] = useState(0);
  const [Security, setSecurity] = useState(false);
  const [ModularKitchen, setModularKitchen] = useState(false);
  const [ImagesUrl, setImagesUrl] = useState([]);
  // const location = useLocation()
  // const userId = location.state.userId
  const { currentUser, getUser } = useAuth();
  const { uploadProperty, deleteImageUsingUrl } = context;
  const iid = uuidV4()
  const [error, setError] = useState("");
  let userId = "";
  const types = [
    "Select property type",
    "Flat/ Apartment",
    "Residential House",
    "Villa",
    "Builder Floor Apartment",
    "Residential Land",
    "Penthouse",
    "Shop",
  ];
  const router = useRouter() 

  if(!currentUser){
    router.replace("/signin");
  } 

  const handleChange = (e) => {
    setError("");
    if (e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (image) => {
    // setLoading(true);)
    const uploadTask = storage
      .ref(`images/${iid.substr(0, 7)}${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        setError(error);
      },
      () => {
        storage
          .ref("images")
          .child(`${iid.substr(0, 7)}${image.name}`)
          .getDownloadURL()
          .then((url) => {
            let imageUrlLinks = [...ImagesUrl];
            imageUrlLinks.push(url);
            setImagesUrl(imageUrlLinks);
          })
          .catch((e) => setError(e.message));
      }
    );
    // setLoading(false);
  };

  const removeImage = (url) => {
    deleteImageUsingUrl(url).then(() => {
      const images = ImagesUrl.filter((link) => {
        return link !== url;
      });
      setImagesUrl(images);
    }).catch(e => {
      setError(e.message)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    await getUser()
      .then((res) => {
        res.forEach((doc) => {
          userId = doc.id;
        });
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });

    if (
      userId != null &&
      PersonalDetails != "" &&
      Purpose != "" &&
      PropType != "" &&
      Location.address != "" &&
      Location.pincode != "" &&
      Location.locality != "" &&
      AvailMonth != "Month" &&
      SuperBuiltSize != "" &&
      Size != ""
    ) {
      setLoading(true);
      await uploadProperty(
        userId,
        PersonalDetails,
        Purpose,
        PropType,
        Description,
        Location,
        Age,
        BdRoom,
        IsSale,
        Balcony,
        BtRoom,
        FloorNo,
        tfloorNo,
        Furnished,
        Security,
        ModularKitchen,
        Lift,
        Parking,
        Metro,
        Hospital,
        Airport,
        BusStand,
        Size,
        SuperBuiltSize,
        AreaUnit,
        AvailMonth,
        AvailYear,
        Price,
        ImagesUrl,
        isRegistry
      )
        .then((val) => {
          setImagesUrl([]);
          setLoading(false);
        })
        .catch((e) => {
          setError(e.message);
          window.scrollTo(0, 0);
        });
    } else {
      setLoading(false);
      setError("Fill details completely");
      window.scrollTo(0, 0);
    }

    // this.props.history.push("/dashboard");
  };

  const handleRadio = (e) => {
    const target = e.target;
    if (target.name == "per") {
      setPersonalDetails(target.value);
    } else if (target.name == "propFor") {
      setPurpose(target.value);
      if (target.value != "sale") {
        setIsSale(false);
      } else {
        setIsSale(true);
      }
    } else if (target.name == "regis") {
      if (target.value == true) {
        setIsRegistry(true);
      } else {
        setIsRegistry(false);
      }
    } else if (target.name == "fur") {
      setFurnished(target.value);
    }
  };

  const fetchApi = async (val) => {
    let value = "";
    await fetch(`https://api.postalpincode.in/pincode/${val}`)
      .then((res) => res.json())
      .then((json) => {
        value = json[0]["PostOffice"][0]["State"];
      })
      .catch((err) => console.error(err.msg));
    return value;
  };

  const handleAddress = async (e) => {
    const target = e.target;
    let locate = {
      ...Location,
    };
    if (target.name == "address") {
      locate.address = target.value;
    } else if (target.name == "locality") {
      locate.locality = target.value;
    } else if (target.name == "pincode" && target.value.length == 6) {
      locate.pincode = target.value;
      let st = "";
      await fetchApi(target.value).then((res) => (st = res));
      locate.state = st;
    }
    setLocation(locate);
  };

  const handleFeatures = (e) => {
    const target = e.target;
    if (target.type == "radio") {
      handleRadio(e);
    } else if (target.type == "select-one") {
      if (target.name == "bdroom") {
        setBdRoom(target.value);
      } else if (target.name == "btroom") {
        setBtRoom(target.value);
      } else if (target.name == "balcony") {
        setBalcony(target.value);
      } else if (target.name == "tfloor") {
        setTfloorNo(target.value);
      } else if (target.name == "sfloor") {
        setFloorNo(target.value);
      }
    } else if (target.type == "checkbox") {
      if (target.name == "sec") {
        setSecurity(!Security);
      } else if (target.name == "lift") {
        setLift(!Lift);
      } else if (target.name == "modkit") {
        setModularKitchen(!ModularKitchen);
      } else if (target.name == "parking") {
        setParking(!Parking);
      }
    } else if (target.type == "number") {
      if (target.name == "metrodis") {
        setMetro(target.value);
      } else if (target.name == "hospdis") {
        setHospital(target.value);
      } else if (target.name == "airdis") {
        setAirport(target.value);
      } else if (target.name == "busdis") {
        setBusStand(target.value);
      } else if (target.name == "age") {
        setAge(target.value);
      }
    }
  };

  const handleArAndTrans = (e) => {
    const target = e.target;
    if (target.type == "text") {
      if (target.name == "covered") {
        setSize(target.value);
      } else if (target.name == "builtin") {
        if (Size >= target.value) {
          setError("");
          setSuperBuiltSize(target.value);
        } else {
          setError("Built in size can't be larger than covered size");
          window.scrollTo(0, 0);
        }
      }
    } else if (target.type == "select-one") {
      if (target.name == "areaprms") {
        setAreaUnit(target.value);
      } else if (target.name == "year") {
        setAvailYear(target.value);
      } else if (target.name == "month") {
        setAvailMonth(target.value);
      }
    } else if (target.type == "number") {
      setPrice(target.value);
    }
  };

  useEffect(() => {
    // return () => {
    //   cleanup;
    // };
    // console.log("render");
  }, [IsSale, loading, ImagesUrl]);

  return (
    <>
      <Head>
        <title>
          Lk Modi Properties/post property | Post new property to sell or rent
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Post your property for sale, rent or lease as a owner, builder or agent. We assure you great returns to your properties"
        />
        <meta
          name="keywords"
          content="Post Property, Property, agent, realtor, real estate agent, Real Estate, Sell, Rent, Lease, Shops, Flat, Floor, Home, House, Keys,  Dream House, Modi, Properties, Add properties"
        />
      </Head>
      <main className="newprop">
        <Container>
          {loading ? (
            <div className="align-center justify-content-center">
              <img src={loader} alt="uploading..." />
            </div>
          ) : (
            <div className="contain">
              <Title title="Post new property" />
              <Container>
                <Card className="upProp">
                  <Form>
                    <div className="ml-4 mt-3 mr-5 mb-4">
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form.Group>
                        <h2>Personal Details</h2>
                        <Form.Group onChange={handleRadio}>
                          <span>
                            <strong>I am </strong>
                          </span>
                          <input
                            type="radio"
                            required
                            name="per"
                            value="owner"
                          />
                          <span> Owner </span>
                          <input
                            type="radio"
                            required
                            name="per"
                            value="agent"
                          />
                          <span> Agent </span>
                          <input
                            type="radio"
                            required
                            name="per"
                            value="builder"
                          />
                          <span> Builder </span>
                        </Form.Group>
                      </Form.Group>
                      <Form.Group>
                        <h2>Property Details</h2>
                        <Form.Group onChange={handleRadio} className="">
                          <span>
                            <strong>For</strong>{" "}
                          </span>{" "}
                          <input
                            type="radio"
                            required
                            name="propFor"
                            value="rent"
                          />
                          <span> Rent </span>
                          <input
                            type="radio"
                            required
                            name="propFor"
                            value="sale"
                          />
                          <span> Sale </span>
                          <input
                            type="radio"
                            required
                            name="propFor"
                            value="lease"
                          />
                          <span> Lease </span>
                          <input
                            type="radio"
                            required
                            name="propFor"
                            value="pg"
                          />
                          <span> P.G </span>
                        </Form.Group>
                      </Form.Group>
                      <Form.Group className="description">
                        <article>
                          <Form.Label htmlFor="type">Property Type</Form.Label>
                          <select
                            name="type"
                            id="type"
                            value={PropType}
                            required
                            className="form-control col-lg-5"
                            onChange={(e) => setPropType(e.target.value)}
                          >
                            {types.map((item, index) => {
                              return (
                                <option value={item} key={index}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                          <Form.Label htmlFor="descri">Description</Form.Label>
                          <textarea
                            type="text"
                            name="descri"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </article>
                        {IsSale ? (
                          <Form.Group onChange={handleRadio}>
                            <input
                              type="radio"
                              name="regis"
                              value="true"
                              required
                            />{" "}
                            <span> Registery </span>
                            <input
                              type="radio"
                              name="regis"
                              value="false"
                              required
                            />{" "}
                            <span> No-registery </span>
                          </Form.Group>
                        ) : null}
                      </Form.Group>
                      <PropertyAddress
                        handleAddress={handleAddress}
                        locState={Location.state}
                      />
                      <Form.Group>
                        <h2>Property Features</h2>
                        <PropertyFeatures
                          handleFeatures={handleFeatures}
                          type={PropType}
                        />
                        <AreaAndTransaction
                          handleChanges={handleArAndTrans}
                          arPrms={AreaUnit}
                        />
                      </Form.Group>
                      <Form.Group>
                        <div className="images-group">
                          <h2>Add Photos</h2>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                          />
                          <Form.Group className="inrow mt-5">
                            {ImagesUrl.map((url, index) => {
                              return (
                                <Container key={index} fluid>
                                  <PropertyImageU
                                    image={url}
                                    required
                                    Progress
                                    removeImg={removeImage}
                                  />
                                </Container>
                              );
                            })}
                          </Form.Group>
                        </div>
                      </Form.Group>
                    </div>
                    <Container className="typ">
                      <Button
                        className="butCen"
                        type="submit"
                        name="smit"
                        onClick={handleSubmit}
                      >
                        Post Property
                      </Button>
                    </Container>
                  </Form>
                </Card>
              </Container>
            </div>
          )}
        </Container>
        <Alert variant=""></Alert>
      </main>
    </>
  );
}

export default withPropertyConsumer(NewProperty)