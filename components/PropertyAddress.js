import React from 'react'
import {Form} from "react-bootstrap"
import imp from "../public/assets/imp.webp";

export default function PropertyAddress({handleAddress, locState}) {
    return (
      <div className="form-group">
        <h2>Property Location</h2>
        <div>
          <Form.Label htmlFor="address">
            Address
            <img src={imp} width="7px" height="7px" alt="imp" />
          </Form.Label>
          <Form.Control
            className="col-lg-5"
            type="text"
            id="address"
            name="address"
            required
            onChange={handleAddress}
          />
          <Form.Label htmlFor="locality">
            Locality
            <img src={imp} width="7px" height="7px" alt="imp" />
          </Form.Label>
          <Form.Control
            className="col-lg-5"
            type="text"
            id="locality"
            required
            name="locality"
            onChange={handleAddress}
          />
          <Form.Label htmlFor="pincode">
            Pin code
            <img src={imp} width="7px" height="7px" alt="imp" />
          </Form.Label>
          <Form.Control
            className="col-lg-5"
            type="text"
            id="pincode"
            name="pincode"
            required
            onChange={handleAddress}
          />
          <Form.Label htmlFor="lcline3">State</Form.Label>
          <Form.Control
            className="col-lg-5"
            type="text"
            id="lcline3"
            readOnly
            name="landmark"
            value={locState}
          />
        </div>
      </div>
    );
}
