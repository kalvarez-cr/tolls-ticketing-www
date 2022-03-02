import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

// project imports
import config from 'config';
import { DefaultRootStateProps, GuardProps } from 'types';
import { useEffect } from 'react';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }: GuardProps) => {
    const {isLoggedIn} = useSelector((state: DefaultRootStateProps) => state.login);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(config.defaultPath, { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return children;
};

export default GuestGuard;
