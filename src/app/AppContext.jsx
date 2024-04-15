import React, {useCallback, useContext, useMemo} from 'react'
import {useLocalStorage} from 'usehooks-ts'
import AuthContext from './AuthContext'

const AppContext = React.createContext({})

export function AppProvider({children}) {
    const {user} = useContext(AuthContext)
    const [beta, setBeta] = useLocalStorage('beta', true)

    const handleSetBeta = useCallback(value => {
        setBeta(value)
    }, [setBeta])

    const verbose = false

    const value = useMemo(() => ({
        admin: adminUids.includes(user?.uid),
        beta,
        setBeta: handleSetBeta,
        verbose
    }), [user?.uid, beta, handleSetBeta, verbose])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

const adminUids = [
    'GGplAdctTfVDLVvYsfIADJmfp8f2',
    'WMSvvuutyShfvBBYB3PmDe4fmeS2',
    'mZyfQIARjCP1uJJJc7ioMAALV9v2',
    'XoUDXU5McjTuVnPA1xfmzytcKuy2'
]

export default AppContext
