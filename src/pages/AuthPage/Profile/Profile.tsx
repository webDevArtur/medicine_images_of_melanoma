import React, { useEffect, ChangeEvent, MouseEvent } from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Profile.css';
import { authAPI } from '../../../api/authAPI';
import { MessageComponent } from '../../../components/MessageComponent';
import { AuthBtn } from '../../../components/AuthBtn';
import { setUserInfo } from '../../../redux/user/userActions';
import { loginFailure, resetAuthMessage } from '../../../redux/auth/authActions';
import { IRootState } from '../../../redux/redux-store';

export function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state: IRootState) => state.user);
    const { message, messageType } = useSelector((state: IRootState) => state.auth);
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        dispatch(resetAuthMessage());
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await authAPI.getUserData();
                dispatch(setUserInfo(userData));
            } catch (error) {
                dispatch(loginFailure('Ошибка получения данных.'));
            }
        };
        fetchData();
    }, []);

    const handleUpdate = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        if (!userData.surname || !userData.name || !userData.email ) {
            dispatch(loginFailure('Заполните все обязательные поля.'));
            return;
        }

        if (!userData.email.includes('@')) {
            dispatch(loginFailure('Email должен содержать @'));
            return;
        }

        try {
            await authAPI.postUserData(
                userData.middle_name,
                userData.name,
                userData.surname,
                userData.email,
            );

            dispatch(setUserInfo(userData));
                navigate('/templates');
        } catch (error) {
            dispatch(
                loginFailure('Произошла ошибка при обновлении данных.')
            );
        }
    };

    const handleChange = (field: string, value: string) => {
        dispatch(setUserInfo({ ...userData, [field]: value.trim() }));
    };

    return (
        <div className={styles.containerStyle}>
            <div className={styles.formStyle}>
                <h2 className={styles.titleStyle}>Обновление данных</h2>
                <MessageComponent message={message} messageType={messageType} />
                <form>
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={userData.surname}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('surname', e.target.value)
                        }
                        className={styles.inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Имя"
                        value={userData.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('name', e.target.value)
                        }
                        className={styles.inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Отчество"
                        value={userData.middle_name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('middle_name', e.target.value)
                        }
                        className={styles.inputStyle}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('email', e.target.value)
                        }
                        className={styles.inputStyle}
                    />
                    <AuthBtn onClick={handleUpdate} label="Обновить данные" />
                </form>
                <Link to="/templates" className={styles.linkStyle}>
                    Вернуться на главную страницу
                </Link>
            </div>
        </div>
    );
}
