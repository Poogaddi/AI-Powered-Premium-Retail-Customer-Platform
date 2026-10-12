import React, { createContext, useContext, useState, useEffect } from 'react';
import { CUSTOMERS, PRODUCTS, AI_RECOMMENDATION_ITEMS, STORES } from '../data/premiumRetailData';
import staffProfile from '../data/staffProfile.json';

const CallSessionContext = createContext();

export function CallSessionProvider({ children }) {
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [recommendations, setRecommendations] = useState(AI_RECOMMENDATION_ITEMS);
  const [catalog, setCatalog] = useState(PRODUCTS);
  const [staff] = useState(staffProfile);

  // Active call session state
  const [isCallActive, setIsCallActive] = useState(true); // default active for showcase
  const [activeCustomerId, setActiveCustomerId] = useState('cust-elec-001'); // Marcus Sterling
  const [callSeconds, setCallSeconds] = useState(142); // 02:22 active call timer
  const [isMuted, setIsMuted] = useState(false);
  const [isHold, setIsHold] = useState(false);
  const [isAiActive, setIsAiActive] = useState(true);
  const [selectedStore, setSelectedStore] = useState('Fifth Avenue Experience Center, NYC');
  const [callNotes, setCallNotes] = useState(
    'Customer inquiring about Sony BRAVIA 9 85" ambient glare performance vs LG OLED G4. Living room has South-facing floor-to-ceiling glass. Recommending XR Backlight Master Drive with 4,000 nits.'
  );

  // Timer interval for live call
  useEffect(() => {
    let interval = null;
    if (isCallActive && !isHold) {
      interval = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCallActive, isHold]);

  // Derived current customer
  const activeCustomer =
    customers.find((c) => c.id === activeCustomerId) || customers[0];

  // Derived recommendations for the active customer
  const activeCustomerRecommendations =
    recommendations.filter((r) => r.customerId === activeCustomerId) || [];

  const startCall = (customerId) => {
    setActiveCustomerId(customerId);
    setIsCallActive(true);
    setCallSeconds(0);
    setIsHold(false);
    setIsMuted(false);
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsHold(false);
    setIsMuted(false);
  };

  const toggleMute = () => setIsMuted((prev) => !prev);
  const toggleHold = () => setIsHold((prev) => !prev);
  const toggleAi = () => setIsAiActive((prev) => !prev);

  // Format call timer (MM:SS)
  const formatCallTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <CallSessionContext.Provider
      value={{
        customers,
        setCustomers,
        recommendations,
        setRecommendations,
        catalog,
        setCatalog,
        staff,
        isCallActive,
        activeCustomer,
        activeCustomerId,
        setActiveCustomerId,
        callSeconds,
        callTimeFormatted: formatCallTime(callSeconds),
        isMuted,
        isHold,
        isAiActive,
        selectedStore,
        setSelectedStore,
        callNotes,
        setCallNotes,
        activeCustomerRecommendations,
        startCall,
        endCall,
        toggleMute,
        toggleHold,
        toggleAi,
      }}
    >
      {children}
    </CallSessionContext.Provider>
  );
}

export function useCallSession() {
  const context = useContext(CallSessionContext);
  if (!context) {
    throw new Error('useCallSession must be used within a CallSessionProvider');
  }
  return context;
}

export default CallSessionContext;
