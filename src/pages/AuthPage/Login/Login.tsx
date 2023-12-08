import React, {ChangeEvent, MouseEvent, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Login.css';
import { authAPI } from '../../../api/authAPI';
import { MessageComponent } from '../../../components/MessageComponent';
import { AuthBtn } from '../../../components/AuthBtn';
import {  loginFailure, resetAuthMessage } from '../../../redux/auth/authActions';
import { setUserInfo } from '../../../redux/user/userActions'; // Import user actions
import { IRootState } from '../../../redux/redux-store';


export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email, password } = useSelector((state: IRootState) => state.user); // Use Redux store for email and password
    const { message, messageType } = useSelector((state: IRootState) => state.auth);



    useEffect(() => {
        dispatch(resetAuthMessage());
    }, [dispatch]);

    const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Input validation
        if (!email) {
            dispatch(loginFailure('Введите ваш Email.'));
            return;
        }

        if (!email.includes('@')) {
            dispatch(loginFailure('Email должен содержать @'));
            return;
        }

        if (!password) {
            dispatch(loginFailure('Введите ваш пароль.'));
            return;
        }

        try {
            await authAPI.login(email, password);
            navigate('/templates');
        } catch (error) {
            dispatch(
                loginFailure('Произошла ошибка при авторизации.')
            );
        }
    };

    const handleChange = (field: string, value: string) => {
        dispatch(setUserInfo({ [field]: value }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h2 className={styles.title}>Вход</h2>
                <MessageComponent message={message} messageType={messageType} />
                <form>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('email', e.target.value)
                        }
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('password', e.target.value)
                        }
                        className={styles.input}
                    />
                    <Link to="/recovery" className={styles.link}>
                        Забыли пароль?
                    </Link>
                    <AuthBtn onClick={handleLogin} label="Войти" />
                </form>
            </div>
        </div>
    );
}
