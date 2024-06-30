import React, { createContext, useEffect, useState } from "react";
import AuthUser from "../auth/AuthUser";
export const DataContext = createContext();

const Context = ({ children }) => {

  const { http } = AuthUser();

  const [allCategories, setAllCategories] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [allAttributes, setAllAttributes] = useState([])
  const [userData, setUserData] = useState(null);
  const [banner, setBanner] = useState(null);
  const [review, setReview] = useState();
  const [offers,setOffers] = useState();
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem('order')) || []);
  const [authOrder, serAuthOrder] = useState(null);

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);



  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('order', JSON.stringify(order));

    fetchAllCategories();
    fetchAllProducts();
    fetchUserDetail();
    fetchAllAttributes();
    fetchBanner();
    fetchReview();
    fetchOffer();
    fetchOrder();

  }, [cart]);

  const fetchAllCategories = () => {
    http.get('/all-categories')
      .then((res) => {
        setAllCategories(res.data.categories);
      })
      .catch((error) => {
        if (error.response.categories) {

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
    http.get('/all-attributes')
      .then((res) => {
        setAllAttributes(res.data.attributes);
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

  const fetchUserDetail = () => {
    http.get('/alluser``')
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        if (error.response) {
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

  const fetchBanner = () => {
    http.get('/banners')
      .then((res) => {
        setBanner(res.data.banners);
      })
      .catch((error) => {
        if (error.response) {
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

  const fetchReview = () => {
    http.get('/reviews')
      .then((res) => {
        setReview(res.data.reviews);
      })
      .catch((error) => {
        if (error.response) {
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

  const fetchOffer = () => {
    http.get('/offers')
      .then((res) => {
        setOffers(res.data.offers);
      })
      .catch((error) => {
        if (error.response) {
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

  const fetchOrder = () => {
    http.get('/orders')
      .then((res) => {
        serAuthOrder(res.data.orders);
      })
      .catch((error) => {
        if (error.response) {
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

  console.log(userData);

  const info = {
    allCategories,
    allProducts,
    allAttributes,
    cart,
    setCart,
    userData,
    setUserData,
    banner,
    review,
    order,
    setOrder,
    offers,
    authOrder
  };

  return <DataContext.Provider value={info}>{children}</DataContext.Provider>;
};

export default Context;