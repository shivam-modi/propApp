import Link from 'next/link'
import {useRouter} from 'next/router'
import React, { useEffect, useState } from 'react'
import { Card, Container, Button, Alert } from 'react-bootstrap'
import Loading from '../components/Loading'
import Title from '../components/Title'
import { useAuth } from '../contexts/AuthContext'
import { withPropertyConsumer } from "../contexts/PropertyContext";
import Property from "../components/Property"
import Head from 'next/head'

const Dashboard = ({context}) => {
    const { currentUser, logOut, getUser } = useAuth()
    const { getPropertiesById, removeProperty } = context;
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(true)
    const [error, setError] = useState("")
    const [properties,setProperties] = useState([]);
    const [userId, setUserId] = useState("");
    const router = useRouter()

    if(!currentUser){
      router.replace("/signin") 
    }
    
    const userPropertiesFetch = async (id) => {
     let allproperties = [];
      await getPropertiesById(id).then((qSnapshot) => {
        qSnapshot.docs.map((doc) => {
          allproperties.push(doc.data());
        });
      });
      setProperties([...allproperties]);
    }

    const getUserDetails = async () => {
      let id;
      await getUser()
          .then((res) => {
            res.forEach((doc) => {
              id = doc.id
              setUserId(doc.id);
            });
          })
          .catch((e) => {
            setError(e.message);
          });
      userPropertiesFetch(id)
      setLoading(false);
    }

    useEffect(() => {
      if(currentUser !== null && loading === true){
        getUserDetails();
      }
      if(!refresh){
        getPropertiesById(userId)
      }
    }, [loading, refresh])

    const removePropertyById = (propertyId) => {
      // setRefresh(true);
      removeProperty(userId, propertyId)
      setLoading(false)
    }

    async function handleLogout() {
      setError("");
      try {
        await logOut();
        router.replace("/signin");
      } catch {
        setError("Failed to log out");
      }
    }

    return (
      <>
        <Head>
          <title>Lk Modi Properties/user profile | User profile </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Manage all your account details, property details easily"
          />
          <meta
            name="keywords"
            content="uploaded, all properties, my account, all, agent, realtor, real estate agent, property, real estate, sell, rent, lease, shops, flat, floor, home, house, keys, dream house, modi, properties"
          />
        </Head>
        <main className="mt-5 mb-5">
          {!currentUser ? (
            <Loading />
          ) : (
            <>
              <Container>
                <Card>
                  <Card.Body>
                    <Title title="profile" />
                    <h3>
                      <strong>Email:</strong> {currentUser.email}
                    </h3>
                    <h3>
                      <strong>Phone:</strong> {currentUser.phoneNumber}
                    </h3>
                    <Link
                      href={{
                        pathname: "/update-profile",
                        query: { userId: userId },
                      }}
                    >
                      <a className="btn btn-primary w-100">Update Profile</a>
                    </Link>
                  </Card.Body>
                </Card>
              </Container>
              <Container>
                <section className="featured-rooms">
                  <Title title="your properties" />
                  {properties.length > 0 ? (
                    <div className="featured-rooms-center">
                      {properties.map((property) => {
                        return (
                          <Card key={property.id}>
                            <Card.Body className="p-0">
                              <Property key={property.id} property={property} />
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center">
                              <Button
                                onClick={() => removePropertyById(property.id)}
                              >
                                Delete
                              </Button>
                            </Card.Footer>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <Container className="d-flex justify-content-center">
                      <Alert variant="warning">
                        You have not posted any property
                      </Alert>
                    </Container>
                  )}
                </section>
              </Container>
              <div className="d-flex justify-content-center">
                <Button type="link" onClick={handleLogout}>
                  log out
                </Button>
              </div>
            </>
          )}
        </main>
      </>
    );
}

export default withPropertyConsumer(Dashboard);

