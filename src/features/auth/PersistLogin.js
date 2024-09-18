import { Outlet, Link, Navigate, useLocation, useNavigate, replace } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);
    const location = useLocation()
    const navigate = useNavigate()

    const [trueSuccess, setTrueSuccess] = useState(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true) { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token');
                try {
                    await refresh();
                    setTrueSuccess(true);
                    console.log('is refreshSuccess?' + isSuccess);
                } catch (err) {
                    console.error(err);
                }
            };

            if (!token && persist) verifyRefreshToken();
        }

        return () => effectRan.current = true;

        // eslint-disable-next-line
    }, []);

    console.log('is refreshSuccess? 2' + isSuccess);
    let content;
    if (!persist) { // persist: no
        console.log('no persist');
        content = <Outlet />;
    } else if (isLoading) { // persist: yes, token: no
        console.log('loading');
        content = <p>Loading...</p>;
    } else if (isSuccess && trueSuccess) { // persist: yes, token: yes
        console.log('success');
        content = <Outlet />;
    } else if (token && isUninitialized) { // persist: yes, token: yes
        console.log('token and uninit');
        console.log(isUninitialized);
        content = <Outlet />;
    } else if (isError) { // persist: yes, token: no
        console.log('error');
       token ?  content = (
        <p className='errmsg'>
            {`${error?.data?.message} - `}
            <Link to = '/login'>Please Login Again</Link>
        </p>
    ) : content = <Navigate to = "/" state={{ from: location }} replace /> 
    }

    return content;
};

export default PersistLogin;