import { GET_DATA } from "../../actions/types";

const initialState = {
    data: [],
}

const getData = (state = initialState, action) => {
    switch(action.type) {
        case GET_DATA:
            return{
                ...state,
                data: [...state.data, action.payload]
            };
            default:
                return state;
        }
    };

export default getData;