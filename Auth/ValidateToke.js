import jwt from 'jsonwebtoken';

const decodeToken = async () => {
    const token = 'your_jwt_token';
    const secretKey = 'your_secret_key'; 
    const decoded = jwt.verify(token, secretKey);
    return decoded
  };
  
  export { decodeToken };
  