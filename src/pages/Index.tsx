
import { Navigate } from 'react-router-dom';

// Our dashboard is now the main component, so redirect to the root route
const Index = () => {
  return <Navigate to="/" />;
};

export default Index;
