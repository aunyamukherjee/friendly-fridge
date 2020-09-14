const initialState = {
    foodgroupid: '',
    isValid: true
}

export const selectReducer = (state = initialState, action) => {
    console.log('Inside selectReducer: action.foodgroupid=',action.foodgroupid );
    switch (action.type) {
        case "SELECTED":
            //LOGIC FOR Selected
            return {...state, foodgroupid: action.foodgroupid, isValid: action.isValid}
        default:
            return state;
    }

}

