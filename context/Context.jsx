import React, { createContext, useEffect, useState } from "react";
import AuthUser from "../auth/AuthUser";
export const DataContext = createContext();

const Context = ({ children }) => {

  const {http} = AuthUser();
  
  const [allProducts, setAllProducts] = useState([])
  const [allAttributeValue, setAttributeValue] = useState([])

  useEffect(()=>{

    fetchAllProducts();
    fetchAllAttributes();

},[]);

  const fetchAllProducts = () => {
    http.get('/all-products')
      .then((res) => {
        setAllProducts(res.data.products);
      })
      .catch((error) => {
        if (error.response.products) {
          
          if (error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login page or showing login modal.');
          } else {
            console.error('Error response from server:', error.response.data);
          }
        } else if (error.request) {
          console.error('No response received from server.');
        } else {
          console.error('Error setting up the request:', error.message);
        }
      });
  };

  const fetchAllAttributes = () => {
    http.get('/all-attributes-value')
      .then((res) => {
        setAttributeValue(res.data.attributevalue);
      })
      .catch((error) => {
        if (error.response.products) {
          
          if (error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login page or showing login modal.');
          } else {
            console.error('Error response from server:', error.response.data);
          }
        } else if (error.request) {
          console.error('No response received from server.');
        } else {
          console.error('Error setting up the request:', error.message);
        }
      });
  };

  const info = {
    allProducts,
    allAttributeValue
  };

  return <DataContext.Provider value={info}>{children}</DataContext.Provider>;
};

export default Context;