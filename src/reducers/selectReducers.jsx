const initialState = {
    foodgroupid: '',
    isValid: true
}

export const selectReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SELECTED":
            //LOGIC FOR Selected
            return {...state, foodgroupid: action.foodgroupid, isValid: action.isValid}
        default:
            return state;
    }

}

