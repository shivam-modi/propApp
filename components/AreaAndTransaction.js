import React from 'react'
import { Form, FormControl, InputGroup, Row } from 'react-bootstrap';

function AreaAndTransaction({handleChanges, arPrms}) {
    const areaParams = ["Sq-ft", "Sq-yrd", "Sq-m", "Acre", "Bigha", "Hectare"]
    const months = ["Month", "January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const currYear = (new Date()).getFullYear();
    const years = Array.from(Array(6), (val, index) => index + currYear);

    return (
      <Form.Group>
        <h2>Area Details</h2>
        <Form.Group>
          <Form.Label>Total Area</Form.Label>
          <Row className="pl-3">
            <FormControl
              className="form-control col-lg-2"
              type="text"
              placeholder="Covered Area"
              name="covered"
              required
              id="covered"
              onChange={handleChanges}
            />
            <select
              name="areaprms"
              id="areaPrms"
              onChange={handleChanges}
              value={arPrms}
            >
              {areaParams.map((params, index) => {
                return (
                  <option value={params} key={index}>
                    {params}
                  </option>
                );
              })}
            </select>
          </Row>
          <Form.Label>Built in Area</Form.Label>
          <Row className="pl-3">
            <input
              type="text"
              className="form-control col-lg-2"
              placeholder="Built In Area"
              name="builtin"
              required
              id="builtIn"
              onChange={handleChanges}
            />
            <select
              name="areaprms"
              id="bltPrms"
              value={arPrms}
              onChange={handleChanges}
            >
              {areaParams.map((params, index) => {
                return (
                  <option value={params} key={index}>
                    {params}
                  </option>
                );
              })}
            </select>
          </Row>
        </Form.Group>
        <Form.Group>
          <h2>Transcation, Availability</h2>
          <Form.Label>Available from</Form.Label>
          <select required name="month" id="month" onChange={handleChanges}>
            {months.map((month, index) => {
              return (
                <option vlaue={month} key={index}>
                  {month}
                </option>
              );
            })}
          </select>
          <select required name="year" id="year" onChange={handleChanges}>
            {years.map((year, index) => {
              return (
                <option key={`year${index}`} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
          <Form.Group>
            {/* <h3>Price Details</h3> */}
            <Form.Label htmlFor="price">Expected Price</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>₹</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="number"
                name="price"
                min="100"
                className="col-lg-2"
                id="price"
                required
                onChange={handleChanges}
              />
            </InputGroup>
          </Form.Group>
        </Form.Group>
      </Form.Group>
    );
}

export default AreaAndTransaction
