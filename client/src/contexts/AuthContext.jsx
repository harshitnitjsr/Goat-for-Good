import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import {doc, getDoc} from "firebase/firestore"
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [currentUserDetails, setCurrentUserDetails] = useState() 
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

const value = {
    currentUser,
    currentUserDetails,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
}

useEffect(() => {
    if (currentUser) {
        const fetchUserDetails = async () => {
            try {
                // console.log(currentUser)
                const userRef = doc(db, "users", currentUser.uid)
                const userSnapshot = await getDoc(userRef)
                if (userSnapshot.exists()) {
                    const x = userSnapshot.data()
                    const y = {...x, id: userSnapshot.id}
                    setCurrentUserDetails(y)
                }
            } catch (error) {
                console.log("Error fetching user details: ", error)
            }
        }

        fetchUserDetails()
    }
}, [currentUser])

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}