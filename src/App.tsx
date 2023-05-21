import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import ErrorPage from 'features/ErrorPage';
import { Login } from 'components/login/Login';
import { Register } from 'components/register/Register';
import { CheckEmail } from 'components/check-email/CheckEmail';
import { SetNewPassword } from 'components/set-new-password/SetNewPassword';
import { ForgotPassword } from 'components/forgot-password/ForgotPassword';
import { Profile } from 'components/profile/Profile';
import { Packs } from 'components/packs/Packs';
import { Card } from '@mui/material';
import { Cards } from 'components/cards/Cards';
import { Learn } from 'components/learn/Learn';

// sign-in or login
// sign-up or register
// check-email
// set-set-new-password
// forgot-password
// profile
// packs
// cards
// learn

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Hello world!</div>,
        errorElement: <ErrorPage />,
    },
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: 'register',
        element: <Register />,
    },
    {
        path: 'check-email',
        element: <CheckEmail />,
    },
    {
        path: 'set-new-password',
        element: <SetNewPassword />,
    },
    {
        path: 'forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: 'profile',
        element: <Profile />,
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
