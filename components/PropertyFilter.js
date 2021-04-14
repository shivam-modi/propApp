import React, {useContext, useEffect, useRef} from 'react'
import { PropertyContext } from '../contexts/PropertyContext'
import Title from './Title'

//without higher order componets or direct consumer method 
//using useContext

const getUnique = (items, value) => {
   return [...new Set(items.map(item => item[value]))]
}

export default function PropertyFilter({properties, defaultFilter}) {
    const context = useContext(PropertyContext);
    const {
      handleChange,
      handlePage,
      type,
      price,
      minPrice,
      maxPrice,
      purpose,
      security,
      modularKitchen,
      lift,
      parking,
      layout,
    } = context;
    let types = getUnique(properties, 'type');
    types = ['all', ...types];
    let availFor = getUnique(properties, 'purpose');
    availFor = ['all', ...availFor]
    let layoutType = ['all', ...Array.from(getUnique(properties, 'bedroom').sort(), (val, index) => val + " BHK")]

    useEffect(() => {
      if(defaultFilter !== undefined){
        handlePage(defaultFilter)
      }
    }, [defaultFilter]);
    return (
      <section className="filter-container">
        <Title title="search properties" />
        <form className="filter-form">
          <div className="form-group">
            <label htmlFor="type">Property Type</label>
            <select
              name="type"
              id="type"
              value={type}
              className="form-control"
              onChange={handleChange}
            >
              {types.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="purpose">Availability</label>
            <select
              name="purpose"
              id="purpose"
              value={purpose}
              className="form-control"
              onChange={handleChange}
            >
              {availFor.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Property price ₹{price}</label>
            <input
              type="range"
              name="price"
              min={minPrice}
              max={maxPrice}
              id="price"
              value={price}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="layout">Property layout</label>
            <select
              name="layout"
              id="layout"
              value={layout}
              className="form-control"
              onChange={handleChange}
            >
              {layoutType.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <div className="single-extra">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                checked={parking}
                onChange={handleChange}
              />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="single-extra">
              <input
                type="checkbox"
                name="modularKitchen"
                id="modularKitchen"
                checked={modularKitchen}
                onChange={handleChange}
              />
              <label htmlFor="modularKitchen">Modular Kitchen</label>
            </div>
            <div className="single-extra">
              <input
                type="checkbox"
                name="security"
                id="security"
                checked={security}
                onChange={handleChange}
              />
              <label htmlFor="security">Security</label>
            </div>
            <div className="single-extra">
              <input
                type="checkbox"
                name="lift"
                id="lift"
                checked={lift}
                onChange={handleChange}
              />
              <label htmlFor="lift">Lift</label>
            </div>
          </div>
        </form>
      </section>
    );
}
