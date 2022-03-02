import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

// project imports
import { DefaultRootStateProps, GuardProps } from 'types';
import { useEffect } from 'react';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
    const {isLoggedIn} = useSelector((state: DefaultRootStateProps) => state.login);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('login', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return children;
};

export default AuthGuard;
