import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import UserRegistration from "pages/user-registration";
import UserLogin from "pages/user-login";
import PropertySearchBrowse from "pages/property-search-browse";
import PropertyDetail from "pages/property-detail";
import BookingFlow from "pages/booking-flow";
import UserDashboard from "pages/user-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-16">
            <RouterRoutes>
              <Route path="/" element={<PropertySearchBrowse />} />
              <Route path="/property-search-browse" element={<PropertySearchBrowse />} />
              <Route path="/property-detail" element={<PropertyDetail />} />
              <Route path="/booking-flow" element={<BookingFlow />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/user-registration" element={<UserRegistration />} />
              <Route path="/user-login" element={<UserLogin />} />
              <Route path="*" element={<NotFound />} />
            </RouterRoutes>
          </main>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;