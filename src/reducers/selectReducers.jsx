const initialState = {
    foodgroupid: '',
    expirydate: '',
    isValid: true
}

export const selectReducer = (state = initialState, action) => {
    console.log('selectReducers: action.type='+ action.type);
    console.log('selectReducers: action.foodgroupid='+ action.foodgroupid);
    console.log('selectReducers: action.expirydate='+ action.expirydate);

    switch (action.type) {
        case "SELECTED":
            //LOGIC FOR Selected
            return {...state, foodgroupid: action.foodgroupid, isValid: true}

            case "DATE_SELECTED":
                //LOGIC FOR Date Selected
                return {...state, expirydate: action.expirydate, isValid: true}
    
        default:
            return state;
    }

}
