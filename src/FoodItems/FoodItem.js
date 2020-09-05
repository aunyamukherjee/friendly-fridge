import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import "./FoodItem.css";
import Card from '../shared/UIElements/Card';
import Button from '../shared/FormElements/Button';
import Modal from '../shared/UIElements/Modal';

const DUMMY_FOODS = [
  {
      id:'5f023dd42c651f6df1816997',
      name:'Cherries',
      details:'Bing Cherries',
      expirydate:'08/12/2020',
      qty:'6',
      comments:'Very yummy',
      foodgroupid:'u1'
  },
  {
      id:'5f023dd42c651f6df1816907',
      name:'Berries',
      details:'Black Berries',
      expirydate:'08/12/2020',
      qty:'5',
      comments:'Quite tart',
      foodgroupid:'u1'
  },
  {
      id:'345dgghh6',
      name:'Apples',
      details:'Gala',
      expirydate:'08/15/2020',
      qty:'5',
      comments:'Use these for Salad',
      foodgroupid:'u2'
  }
];

const FoodItem = props => {
    //const auth = useContext(AuthContext);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
  
    const showDeleteWarningHandler = () => {
      setShowConfirmModal(true);
    };
  
    const cancelDeleteHandler = () => {
      setShowConfirmModal(false);
    };
  
    const confirmDeleteHandler = () => {
      setShowConfirmModal(false);
      console.log('DELETING...');
    };
    const foodname = useParams().foodname;

    const identifiedFood = DUMMY_FOODS.find(p => p.name === foodname);

    return (
        <React.Fragment>
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
            <div className="food-item__info">
              <h2>{identifiedFood.name}</h2>
              <p>Details: {identifiedFood.details}</p>
              <p>Expiration Date: {identifiedFood.expirydate}</p>
              <p>Quantity: {identifiedFood.qty}</p>
              <p>Comments: {identifiedFood.comments}</p>
            </div>
            <div className="food-item__actions">
              {/* {auth.isLoggedIn && ( */}
                <Button to={`/foodedit/${identifiedFood.name}`}>EDIT</Button>
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