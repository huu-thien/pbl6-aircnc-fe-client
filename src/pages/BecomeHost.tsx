import { Navigate } from 'react-router-dom';

const BecomeHost = () => {
  const user = true;
  return (
    <div>
      <div>{user ? <p>be come host</p> : <Navigate to="/authenticate" />}</div>
    </div>
  );
};
export default BecomeHost;
