"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../lib/redux/store";

interface IStoreProviderProps {
    children: React.ReactNode;
}



const StoreProvider: React.FC<IStoreProviderProps> = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};


export default StoreProvider;

