import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'

// Layout Components
import Header from './components/layout/Header'

// Page Components
import { Home } from './components/home/Home'

// Auth Components
import Login from './components/auth/Login'
import Register from './components/auth/Register'

// Candidate Components
import CandidateProfile from './components/candidate/Profile'
import CVUpload from './components/candidate/CVUpload'
import { DocumentUpload } from './components/shared/DocumentUpload'

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard'

const queryClient = new QueryClient()

function App() {
  const [user, setUser] = useState<{ role: string } | null>(null)

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header user={user} setUser={setUser} />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register setUser={setUser} />} />
              
              {/* Candidate Routes */}
              <Route 
                path="/profile" 
                element={user ? <CandidateProfile /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/upload-cv" 
                element={user ? <CVUpload /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/upload-documents" 
                element={user ? <DocumentUpload /> : <Navigate to="/login" />}
              />

              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  user?.role === 'admin' ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              
              {/* Default Route */}
              <Route path="/" element={user ? <Navigate to="/profile" /> : <Home />} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App
