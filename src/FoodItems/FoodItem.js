import React, {useEffect, useState} from 'react';
import {useParams, useHistory } from 'react-router-dom';
import { useHttpClient } from '../shared/hooks/http-hook';
import Card from '../shared/UIElements/Card';
import Button from '../shared/FormElements/Button';
import Modal from '../shared/UIElements/Modal';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';


import "./FoodItem.css";

const FoodItem = props => {
  const history = useHistory();
   const {isLoading, error, sendRequest, clearError} = useHttpClient();
  
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const showDeleteWarningHandler = () => {
      setShowConfirmModal(true);
    };
  
    const cancelDeleteHandler = () => {
      setShowConfirmModal(false);
    };
  
    const confirmDeleteHandler = async () => {
      setShowConfirmModal(false);
      console.log('Inside FoodItems: foodid='+ foodid);
      try{
        await sendRequest(
          `http://localhost:5000/api/food/${foodid}`,
          'DELETE'
          );
          props.onDelete(props.id);
          history.push('/');
      } catch (err) {}
      

      
    };
    const [identifiedFood, setIdentifiedFood ] = useState([]);
    const foodid = useParams().foodid;

    useEffect(() => {
      
      const fetchIdentifiedFood = async () => {
        try {
            const responseData = await sendRequest(`http://localhost:5000/api/food/${foodid}`);
            setIdentifiedFood(responseData.food);
        } catch (err) {}
      };
      fetchIdentifiedFood();
    }, [sendRequest, foodid]);

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
        <div className="food-item">
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
                <Button to={`/foodedit/${identifiedFood.id}`}>EDIT</Button>
              {/* )} */}
  
              {/* {auth.isLoggedIn && ( */}
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              {/* )} */}
            </div>
          </Card>
        </div>
      </React.Fragment>
    );
  };
  
  export default FoodItem;