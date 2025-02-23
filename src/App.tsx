import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Suspense, lazy } from 'react';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy loading dos componentes
const PhoneVerification = lazy(() => import('./components/PhoneVerification'));
const FormSelection = lazy(() => import('./components/FormSelection'));
const AssessmentForm = lazy(() => import('./components/AssessmentForm'));
const NutritionGenderSelect = lazy(() => import('./components/NutritionGenderSelect'));
const NutritionalAssessmentForm = lazy(() => import('./components/NutritionalAssessmentForm'));
const Success = lazy(() => import('./components/Success'));

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<PhoneVerification />} />
            <Route path="/form-selection" element={<FormSelection />} />
            <Route path="/assessment" element={<AssessmentForm />} />
            <Route path="/nutrition-gender-select" element={<NutritionGenderSelect />} />
            <Route path="/nutrition-assessment" element={<NutritionalAssessmentForm />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </Suspense>
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#FF5733',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#fff',
                secondary: '#FF5733',
              },
            },
            error: {
              iconTheme: {
                primary: '#fff',
                secondary: '#FF5733',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}