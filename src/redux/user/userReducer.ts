import { SET_USER_INFO } from './userActions';

interface UserState {
    middle_name: string;
    name: string;
    surname: string;
    email: string;
    password: string;
}

const initialState: UserState = {
    middle_name: '',
    name: '',
    surname: '',
    email: '',
    password: '',
};

const userReducer = (state = initialState, action: any): UserState => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
