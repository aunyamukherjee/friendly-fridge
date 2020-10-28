import React, {useEffect, useState} from 'react';
import {useParams, useHistory } from 'react-router-dom';
import { useHttpClient } from '../shared/hooks/http-hook';
import Card from '../shared/UIElements/Card';
import Button from '../shared/FormElements/Button';
import Modal from '../shared/UIElements/Modal';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';
import { AuthContext } from '../shared/context/auth-context';
import { useContext } from 'react';

import "./FoodItem.css";
const axios = require('axios');

const FoodItem = props => {
  const history = useHistory();
   const {isLoading, error, sendRequest, clearError} = useHttpClient();
  
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const auth = useContext(AuthContext);
    const [identifiedFood, setIdentifiedFood ] = useState([]);
    const foodid = useParams().foodid;

    const showDeleteWarningHandler = () => {
      setShowConfirmModal(true);
    };
  
    const cancelDeleteHandler = () => {
      setShowConfirmModal(false);
    };
  
    const confirmDeleteHandler = async () => {
      setShowConfirmModal(false);
      try{
            const fid = `${foodid}`;
            console.log("Starting axios call for confirmDeleteHandler ");
            const responseData = 
              await axios.delete('http://localhost:5000/api/food/'+`${foodid}`,
                { headers: {
                'Content-Type': 'application/json' , 
                Authorization: 'Bearer '+ auth.token 
                }}
              );
              console.log("responseData="+ JSON.stringify(responseData));
        } catch (err) {console.log("Error in axios");}
              history.push(`/${identifiedFood.foodgroupid}/food`);
              // props.onDelete(props.id);
        };

    useEffect(() => {
      
      const fetchIdentifiedFood = async () => {
        try {
              const fid = `${foodid}`;
              console.log("Starting axios call for fetchIdentifiedFood");
              const responseData = 
                await axios.get('http://localhost:5000/api/food/'+`${foodid}`,
                  { headers: {
                  'Content-Type': 'application/json' , 
                  Authorization: 'Bearer '+ auth.token 
                  }}
                );
                console.log("responseData="+ JSON.stringify(responseData.data.food));
                setIdentifiedFood(responseData.data.food);
              console.log("setIdentifiedFood finished");
          } catch (err) {console.log("Error in axios");}
          };
          fetchIdentifiedFood();
          }, [auth.token, foodid]);

    return (
        <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
        <Modal
          show={showConfirmModal}
          onCancel={cancelDeleteHandler}
          header="Are you sure?"
          footerClass="food-item__modal-actions"
          footer={
            <React.Fragment>
              <Button inverse onClick={cancelDeleteHandler}>
                CANCEL
              </Button>
              <Button danger onClick={confirmDeleteHandler}>
                DELETE
              </Button>
            </React.Fragment>
          }
        >
          <p>
          Do you want to delete this item? Please note that it
          cannot be reversed.
          </p>
        </Modal>
        <div className="center">
          <Card className="food-item__content">
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="food-item__info">
              <h2>{identifiedFood.name}</h2>
              <p>Details: {identifiedFood.details}</p>
              <p>Expiration Date: {identifiedFood.expirydate}</p>
              <p>Quantity: {identifiedFood.qty}</p>
            </div>
            <div className="food-item__actions">
              {/* {auth.isLoggedIn && ( */}
                <Button to={`/foodedit/${identifiedFood.id}`}>Edit</Button>
              {/* )} */}
  
              {/* {auth.isLoggedIn && ( */}
                <Button danger onClick={showDeleteWarningHandler}>
                  Delete
                </Button>
              {/* )} */}
            </div>
          </Card>
        </div>
      </React.Fragment>
    );
  };
  
  export default FoodItem;