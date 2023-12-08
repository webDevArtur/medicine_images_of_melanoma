import { LOGIN_FAILURE, RESET_AUTH_MESSAGE } from './authActions';

interface AuthState {
    message: string | null;
    messageType: 'error' | null;
}

const initialState: AuthState = {
    message: null,
    messageType: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        case LOGIN_FAILURE:
            return {
                ...state,
                message: action.payload,
                messageType: 'error',
            };
        case RESET_AUTH_MESSAGE:
            return {
                ...state,
                message: null,
                messageType: null,
            };
        default:
            return state;
    }
};



export default authReducer;
