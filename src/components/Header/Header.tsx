import React from 'react';
import styles from './header.css';
import {Link, useNavigate} from 'react-router-dom';
import { Title } from '../Title';
import { AuthBtn } from '../AuthBtn';
import { Avatar } from '../Avatar'
import { authAPI } from '../../api/authAPI';

interface IHeader{
  title: string;
  linkText?: string;
  path?: string;
  btnId?: string;
  onClick?: () => void;
}

export function Header({title, linkText, path, btnId, onClick}: Readonly<IHeader>) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
        navigate('/login');
    } catch (error) {
      alert('Не удалось осуществить выход. Проверьте подключение к сети.');
    }
  }


  return (
      <div className={styles.header}>
        <Title title={title}/>
        {path && <Link className={styles.link} to={path} id={btnId} onClick={onClick}>{linkText}</Link>}
        <div className={styles.auth}>
          <Avatar></Avatar>
          <AuthBtn onClick={handleLogout} label="Выйти" />
        </div>
      </div>
  );
}
