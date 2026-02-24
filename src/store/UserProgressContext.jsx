import { createContext, useState } from "react";

const UserProgressContext = createContext({
    currentPage: 'home',
    progress: '', // cart, checkout
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckout: () => { },
    setCurrentPage: (page) => { },
    // new
    showLogin: () => { },
    hideLogin: () => { },
    showRegister: () => { },
    hideRegister: () => { },
});

export function UserProgressContextProvider({ children }) {
    const [currentPage, setCurrentPage] = useState('home');
    const [userProgress, setUserProgress] = useState('');

    function showCart() { setUserProgress('cart'); }

    function hideCart() { setUserProgress(''); }

    function showCheckout() { setUserProgress('checkout'); }

    function hideCheckout() { setUserProgress(''); }

    //newly added
    function navigateTo(page) { setCurrentPage(page); }

    // new new
    function showLogin() { setUserProgress('login'); }
    function hideLogin() { setUserProgress(''); }
    function showRegister() { setUserProgress('register'); }
    function hideRegister() { setUserProgress(''); }

    const userProgressCtx = {
        currentPage,
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
        setCurrentPage: navigateTo, // newly added
        showLogin,
        hideLogin,
        showRegister,
        hideRegister,
    }


    return (
        <UserProgressContext.Provider value={userProgressCtx}>
            {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext;