import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('manara-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Simulation d'authentification
    const mockUser = {
      id: '1',
      email,
      name: 'Client Fidèle',
      orders: [
        { id: 'CMD-2024-001', date: '2024-01-15', total: 45.80, status: 'Livrée' },
        { id: 'CMD-2024-002', date: '2024-02-01', total: 32.50, status: 'En cours' }
      ],
      favorites: []
    }
    setUser(mockUser)
    localStorage.setItem('manara-user', JSON.stringify(mockUser))
    return true
  }

  const register = (name, email, password) => {
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      orders: [],
      favorites: []
    }
    setUser(newUser)
    localStorage.setItem('manara-user', JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('manara-user')
  }

  const addToFavorites = (productId) => {
    if (user) {
      const updatedUser = {
        ...user,
        favorites: [...user.favorites, productId]
      }
      setUser(updatedUser)
      localStorage.setItem('manara-user', JSON.stringify(updatedUser))
    }
  }

  const removeFromFavorites = (productId) => {
    if (user) {
      const updatedUser = {
        ...user,
        favorites: user.favorites.filter(id => id !== productId)
      }
      setUser(updatedUser)
      localStorage.setItem('manara-user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      addToFavorites,
      removeFromFavorites,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}



