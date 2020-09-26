import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Card from '../shared/UIElements/Card';
import './FoodGroup_delete.css';
import {useParams, useHistory } from 'react-router-dom';
import { useHttpClient } from '../shared/hooks/http-hook';
import Button from '../shared/FormElements/Button';
import Modal from '../shared/UIElements/Modal';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';


const FoodGroup_delete = props => {

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
      try{
        await sendRequest(
          `http://localhost:5000/api/foodgroup/${foodgroupid}`,
          'DELETE'
          );
      history.push(`/foodgroup/delete`);
      props.onDelete(props.id);
      } catch (err) {} 
    };
    //const [identifiedFood, setIdentifiedFood ] = useState([]);
    const foodgroupid = props.id;

    // useEffect(() => {
      
    //   const fetchIdentifiedFood = async () => {
    //     try {
    //         const responseData = await sendRequest(`http://localhost:5000/api/food/${foodid}`);
    //         setIdentifiedFood(responseData.food);
    //     } catch (err) {}
    //   };
    //   fetchIdentifiedFood();
    // }, [sendRequest, foodid]);
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
        <li className="foodgroup-item">
            <div className="foodgroup-item__content">
            {/* <Link to={`/${props.id}/food`}>  */}
            {isLoading && <LoadingSpinner asOverlay />}
                    <div className="foodgroup-item__info">
                        <h2 >
                             {/* onClick={onClickHandler}> */}
                                <Button danger onClick= {showDeleteWarningHandler}>
                                    DELETE {props.name}
                                </Button> 
                        </h2>
                    </div>
                {/* </Link> */}
            </div>
        </li>
        </React.Fragment>
    );
}

export default FoodGroup_delete;
