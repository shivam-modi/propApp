import React,{ useState } from 'react'
import {Form, FormControl, InputGroup, Row} from 'react-bootstrap'

function PropertyFeatures({handleFeatures, type}) {
  const bedroom = ["1", "2", "3", "4", "5", "5+"];
  const balcony = ["0", "1", "2", "3", "3+"]
  const floorno = [
    "Lower Basement",
    "Upper Basement",
    "Ground",
    "1",
    "2",
    "3",
    "4",
    "5",
    "5+"
  ]; 
  const totalfloor = ["1", "2", "3", "4", "5", "6", "7", "8", "8+"];
  const bathroom = ["1", "2", "3", "3+"];
    return (
      <Form.Group>
        <div>
          <Form.Label htmlFor="age">Age (in years)</Form.Label>
          <Form.Control
            className="col-lg-2"
            type="number"
            name="age"
            min="0"
            id="age"
            onChange={handleFeatures}
          />
        </div>
        <Form.Label htmlFor="bdroom">Bedrooms</Form.Label>
        <div className="mt-20">
          <select
            name="bdroom"
            id="bdroom"
            required
            className="form-control col-lg-3"
            onChange={handleFeatures}
          >
            {bedroom.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <Form.Label htmlFor="balcony">Balconies</Form.Label>
        <div>
          <select
            name="balcony"
            id="balcony"
            required
            className="form-control col-lg-3"
            onChange={handleFeatures}
          >
            {balcony.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        {type === "Residential House" ||
        type === "Villa" ||
        type === "Residential Land" ||
        type === "Penthouse" ||
        type === "Shop" ? null : (
          <>
            <Form.Label htmlFor="sfloor">Floor Number</Form.Label>
            <div>
              <select
                name="sfloor"
                id="sfloor"
                required
                className="form-control col-lg-3"
                onChange={handleFeatures}
              >
                {floorno.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <Form.Label htmlFor="tfloor">Total Floor</Form.Label>
            <div>
              <select
                name="tfloor"
                id="tfloor"
                required
                className="form-control col-lg-3"
                onChange={handleFeatures}
              >
                {totalfloor.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </>
        )}
        <Form.Label htmlFor="fur">Furnished Status</Form.Label>
        <Form.Group onChange={handleFeatures}>
          <input type="radio" name="fur" value="furnished" />
          <span> Furnished </span>
          <input type="radio" name="fur" value="semifurnished" />
          <span> Semi-furnished </span>
          <input type="radio" name="fur" value="unfurnished" />
          <span> Unfurnished </span>
        </Form.Group>
        <Form.Label htmlFor="btroom">Bathrooms</Form.Label>
        <Form.Group>
          <select
            name="btroom"
            id="btroom"
            className="form-control col-lg-3"
            onChange={handleFeatures}
          >
            {bathroom.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </Form.Group>
        <Form.Group as={Row} className="ml-1">
          <div className="single-extra">
            <input
              type="checkbox"
              name="sec"
              id="security"
              onChange={handleFeatures}
            />
            <Form.Label className="ml-2" htmlFor="sec">
              Security
            </Form.Label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="lift"
              id="lift"
              onChange={handleFeatures}
            />
            <Form.Label htmlFor="lift" className="ml-2">
              Lift
            </Form.Label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="modKit"
              id="modkit"
              onChange={handleFeatures}
            />
            <Form.Label htmlFor="modKit" className="ml-2">
              Modular Kitchen
            </Form.Label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="parking"
              id="parking"
              onChange={handleFeatures}
            />
            <Form.Label htmlFor="modKit">Parking</Form.Label>
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="metrodis">Nearby Metro</Form.Label>
          <InputGroup>
            <FormControl
              type="number"
              name="metrodis"
              id="metrodis"
              step="any"
              min="0"
              className="col-lg-3"
              required
              onChange={handleFeatures}
            />
            <InputGroup.Append>
              <InputGroup.Text>km</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <Form.Label htmlFor="hospdis">Nearby Hospital</Form.Label>
          <InputGroup>
            <FormControl
              type="number"
              required
              name="hospdis"
              id="hospdis"
              step="any"
              min="0"
              className="col-lg-3"
              onChange={handleFeatures}
            />
            <InputGroup.Append>
              <InputGroup.Text>km</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <br />
          <Form.Label htmlFor="airdis">Nearby Airport</Form.Label>
          <InputGroup>
            <FormControl
              type="number"
              name="airdis"
              id="airdis"
              step="any"
              min="0"
              className="col-lg-3"
              onChange={handleFeatures}
            />
            <InputGroup.Append>
              <InputGroup.Text>km</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <Form.Label htmlFor="busdis">Nearby Bus Stand</Form.Label>
          <InputGroup>
            <FormControl
              className="col-lg-3"
              type="number"
              name="busdis"
              id="busdis"
              step="any"
              min="0"
              onChange={handleFeatures}
            />
            <InputGroup.Append>
              <InputGroup.Text>km</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form.Group>
    );
}

export default PropertyFeatures
