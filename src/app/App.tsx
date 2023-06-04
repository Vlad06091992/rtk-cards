import React, { useEffect } from 'react';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import 'app/App.css';
import ErrorPage from 'features/ErrorPage';
import { Login } from 'features/login/Login';
import { Register } from 'features/auth/register/Register';
import { CheckEmail } from 'features/check-email/CheckEmail';
import { SetNewPassword } from 'features/set-new-password/SetNewPassword';
import { ForgotPassword } from 'features/forgot-password/ForgotPassword';
import { Profile } from 'features/profile/Profile';
import { Packs } from 'features/packs/Packs';
import { Cards } from 'features/cards/Cards';
import { Learn } from 'features/learn/Learn';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Main } from 'features/header/Main';
import { authAPI } from 'features/auth/auth-api';
import { authThunks } from 'features/auth/auth-slice';
import { useRedirect } from 'common/custom-hooks/useRedirect';

// sign-in or login
// sign-up or register
// check-email
// set-set-new-password
// forgot-password
// profile
// packs
// cards
// learn

const router = createHashRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: 'auth/login',
                element: <Login />,
            },
            {
                path: 'auth/register',
                element: <Register />,
            },
            {
                path: 'auth/check-email',
                element: <CheckEmail />,
            },
            {
                path: 'auth/set-new-password?/:tokenId',
                element: <SetNewPassword />,
            },
            {
                path: 'auth/forgot-password',
                element: <ForgotPassword />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
        ],
        errorElement: <ErrorPage />,
    },

    {
        path: 'packs',
        element: <Packs />,
    },

    {
        path: 'cards',
        element: <Cards />,
    },
    {
        path: 'learn',
        element: <Learn />,
    },
]);

function App() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authThunks.authMe());
    }, [isLoggedIn]);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;

// import React from 'react';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import logo from './logo.svg';
// import { Counter } from 'features/counter/Counter';
// import './App.css';
//
// function App() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <Counter />
//                 <p>
//                     Edit <code>src/App.tsx</code> and save to reload.
//                 </p>
//                 <span>
//                     <span>Learn </span>д
//                     <a
//                         className="App-link"
//                         href="https://reactjs.org/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                     >
//                         React
//                     </a>
//                     <span>, </span>
//                     <a
//                         className="App-link"
//                         href="https://redux.js.org/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                     >
//                         Redux
//                     </a>
//                     <span>, </span>
//                     <a
//                         className="App-link"
//                         href="https://redux-toolkit.js.org/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                     >
//                         Redux Toolkit
//                     </a>
//                     ,<span> and </span>
//                     <a
//                         className="App-link"
//                         href="https://react-redux.js.org/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                     >
//                         React Redux
//                     </a>
//                 </span>
//             </header>
//         </div>
//     );
// }
//
// export default App;
