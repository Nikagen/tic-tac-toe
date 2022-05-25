import styles from './AuthForm.module.sass';

import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import $api from './../../http';

type AuthFields = {
  login: string;
  password: string;
}

function Auth() {
  const { register, handleSubmit, reset} = useForm<AuthFields>();

  function signin(fields: AuthFields) {
    $api.post('/auth', {
      login: fields.login,
      password: fields.password
    })
      .then((response) => {
        console.log(response);
        reset();
      })
      .catch((error) => console.log(error));
  } 
  
  return (
    <>
      <form className={styles.mainBlock} onSubmit={handleSubmit(signin)}>
        <h1 className={styles.title}>Авторизация</h1>

        <div className={styles.fieldBlock}>
          <input 
            type="text"
            className={styles.field}
            placeholder="Логин"
            {...register('login')}
          />
        </div>
        
        <div className={styles.fieldBlock}>
          <input 
            type="password"
            className={styles.field}
            placeholder="Пароль"
            {...register('password')}
          />
        </div>

        <div className={styles.btnBlock}>
          <NavLink to='/signup' className={styles.signUp}>Регистрация</NavLink>
          <input 
            className={styles.logIn}
            type="submit"
            value="Войти"
          />
        </div>
      </form>
    </>
  );
}

export default Auth;