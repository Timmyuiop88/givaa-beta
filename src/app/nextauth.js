'use client'
import { SessionProvider } from "next-auth/react"
export default function Nextauthprovider({children}){
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}