import { Navigate } from 'react-router-dom';

const WishList = () => {
  const user = true;
  return (
    <div>
      <div>{user ? <p>This is wishlist page</p> : <Navigate to="/authenticate" />}</div>
    </div>
  );
};

export default WishList;
