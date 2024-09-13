import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Router from './router/Router'
// import MessengerCustomerChat from 'react-messenger-customer-chat';

function App() {
  const [count, setCount] = useState(0)
  const MessengerRef = useRef();
  useEffect(() => {
    MessengerRef.current.setAttribute('page_id', '100179096045189');
    MessengerRef.current.setAttribute('attribution', 'biz_inbox');

    window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v18.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <>
      <Router />
      {/* <MessengerCustomerChat
        pageId="100179096045189"
        appId="429975542843184"
      /> */}
      <div id="fb-root"></div>
      <div ref={MessengerRef} id="fb-customer-chat" className="fb-customerchat"></div>
    </>
  )
}

export default App
