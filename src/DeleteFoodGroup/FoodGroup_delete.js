import React, {useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import {FaTrashAlt} from "react-icons/fa";

import { Link } from 'react-router-dom';
import Card from '../shared/UIElements/Card';
import './FoodGroup_delete.css';
import {useParams, useHistory } from 'react-router-dom';
import { useHttpClient } from '../shared/hooks/http-hook';
import Button from '../shared/FormElements/Button';
import Modal from '../shared/UIElements/Modal';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';
import { AuthContext } from '../shared/context/auth-context';

library.add(faTrash, faSignOutAlt);

const FoodGroup_delete = props => {

  const auth = useContext(AuthContext);
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
          process.env.REACT_APP_BACKEND_URL+'/foodgroups/'+`${foodgroupid}`,
          'DELETE',
          null,
          {
            'Content-type': 'application/json',
            Authorization: 'Bearer '+ auth.token
        }
          );

      history.push(`/`);
      props.onDelete(props.id);
      } catch (err) {} 
    };
    //const [identifiedFood, setIdentifiedFood ] = useState([]);
    const foodgroupid = props.id;

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
                          <Card>
                                <FaTrashAlt />
                                <button className="btn" onClick= {showDeleteWarningHandler}>
                                     {props.name}
                                </button>  
                          </Card>
                        </h2>
                    </div>
                {/* </Link> */}
            </div>
        </li>
        </React.Fragment>
    );
}

export default FoodGroup_delete;
