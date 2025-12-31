"use client"

import React, {createContext, useContext, useState} from "react";

type ProfileContextType ={
    photo :string | null;
    setPhoto:(url:string | null) => void;
};

const ProfileContext = createContext<ProfileContextType >({
    photo :null,
    setPhoto:()=>{},
});

export function ProfileProvider({children}:{children:React.ReactNode}){
    const [photo,setPhoto]=useState<string | null>(null);
    return (
        <ProfileContext.Provider value={{photo,setPhoto}}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfile = () =>useContext(ProfileContext);