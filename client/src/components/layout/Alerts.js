import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.type} className={`ui message ${alert.type}`}>
        <p>{alert.msg}</p>
      </div>
    ))
  );
};

export default Alerts;
