
import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {
  // since i got rid of the state portion in this code
  // I could change this back to a function (did it)
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  let logoutTimer;

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData', 
      JSON.stringify(
        { userId: uid, 
          token: token, 
          expiration: tokenExpirationDate.toISOString()
        })
    );

  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(()=> {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime()- new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(()=> {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    console.log('Inside useEffect: storeData='+storedData);
    if (
      storedData && 
      storedData.token && 
      new Date(storedData.expiration) > new Date() 
    ){
      login(
        storedData.userId, 
        storedData.token, 
        new Date(storedData.expiration)
      );
    }

  }, [login]);

  return { token, login, logout, userId };
}