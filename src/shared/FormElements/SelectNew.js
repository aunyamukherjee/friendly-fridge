// import React, { useEffect, useState, Component } from 'react';
// import { useHttpClient } from '../hooks/http-hook';
// import { validate } from '../util/validators';

// class Select extends React.Component {

//     useEffect(() => {
      
//         const fetchFoodgroups = async () => {
//           try {
//               const responseData = await sendRequest('http://localhost:5000/api/foodgroups')
//               setLoadedFoodgroups(responseData);
//              console.log('ResponseData'+ JSON.stringify(responseData));
//           } catch (err) {}
//         };
//         fetchFoodgroups();
//       }, [sendRequest]);

//     constructor (props) {
//         super(props);
//         this.state = {
//             loadedFoodgroups
//         }
//     }

// }

// export default Select;