// ─────────────────────────────────────────────────────────────
//  RetailConnect AI  –  Enterprise Electronics Dashboard Data
// ─────────────────────────────────────────────────────────────

export const kpiCards = [
  {
    id: 'todays-calls',
    label: "Today's Calls",
    value: '48',
    change: '+14%',
    positive: true,
    sub: '38 completed • 10 in queue',
    color: 'blue',
    icon: 'PhoneCall',
  },
  {
    id: 'active-customers',
    label: 'Active Customers',
    value: '184',
    change: '+9%',
    positive: true,
    sub: 'Store visit follow-up pipeline',
    color: 'purple',
    icon: 'Users',
  },
  {
    id: 'open-leads',
    label: 'Open Leads',
    value: '126',
    change: '+6%',
    positive: true,
    sub: '54 post-store visit leads',
    color: 'cyan',
    icon: 'UserCheck',
  },
  {
    id: 'revenue',
    label: 'Revenue',
    value: '$348,500',
    change: '+22.4%',
    positive: true,
    sub: 'MTD Retail Concierge Sales',
    color: 'gold',
    icon: 'DollarSign',
  },
  {
    id: 'conversion',
    label: 'Conversion Rate',
    value: '38.6%',
    change: '+4.2%',
    positive: true,
    sub: 'Benchmark: 18% (2.1x lift)',
    color: 'green',
    icon: 'TrendingUp',
  },
  {
    id: 'avg-call',
    label: 'Average Call Duration',
    value: '4m 32s',
    change: '-18s',
    positive: true,
    sub: 'Optimal satisfaction window',
    color: 'indigo',
    icon: 'Timer',
  },
  {
    id: 'followups',
    label: "Today's Follow Ups",
    value: '19',
    change: '6 Urgent',
    positive: false,
    sub: '13 on-schedule • 6 SLA alert',
    color: 'amber',
    icon: 'ListTodo',
  },
  {
    id: 'missed',
    label: 'Missed Calls',
    value: '3',
    change: '-50%',
    positive: true,
    sub: 'All callbacks logged in queue',
    color: 'red',
    icon: 'PhoneMissed',
  },
  {
    id: 'high-intent',
    label: 'High Intent Customers',
    value: '42',
    change: '+18%',
    positive: true,
    sub: 'Score >85% within 48h visit',
    color: 'emerald',
    icon: 'Sparkles',
  },
];

export const quickActionCards = [
  {
    id: 'qa-1',
    title: 'Start Follow-Up Queue',
    desc: '19 post-visit consultations due today. 6 SLA breach alerts.',
    icon: 'PhoneCall',
    badge: '19 Due',
    badgeVariant: 'urgent',
    route: '/follow-up-queue',
    color: '#EF4444',
  },
  {
    id: 'qa-2',
    title: 'High Intent Store Visitors',
    desc: '42 customers with >85% intent score browsing product sheets.',
    icon: 'TrendingUp',
    badge: '42 VIP',
    badgeVariant: 'gold',
    route: '/customers',
    color: '#D4AF37',
  },
  {
    id: 'qa-3',
    title: 'Dispatch AI Trade-In Offer',
    desc: 'Send personalized trade-in vouchers for iPhone 16 & Galaxy S24.',
    icon: 'Sparkles',
    badge: 'AI Ready',
    badgeVariant: 'ai',
    route: '/ai-assistant',
    color: '#8B5CF6',
  },
  {
    id: 'qa-4',
    title: 'Electronics Catalog & Stock',
    desc: 'Check live allocation across Apple, Sony, Dyson & Samsung.',
    icon: 'Package',
    badge: '6 Brands',
    badgeVariant: 'neutral',
    route: '/products',
    color: '#3B82F6',
  },
];

// Revenue last 7 days (Daily totals)
export const revenueTrend = [
  { day: 'Mon', revenue: 42000, target: 45000 },
  { day: 'Tue', revenue: 48500, target: 45000 },
  { day: 'Wed', revenue: 53200, target: 48000 },
  { day: 'Thu', revenue: 61000, target: 50000 },
  { day: 'Fri', revenue: 74800, target: 60000 },
  { day: 'Sat', revenue: 89400, target: 70000 },
  { day: 'Sun', revenue: 68600, target: 60000 },
];

// Sales Funnel
export const salesFunnel = [
  { stage: 'Store Visit & Demo', value: 1000, fill: '#8B5CF6' },
  { stage: 'AI Lead Ingestion', value: 820, fill: '#6366F1' },
  { stage: 'Call Center Follow-Up', value: 680, fill: '#3B82F6' },
  { stage: 'Financing / Offer Sent', value: 490, fill: '#06B6D4' },
  { stage: 'Final Sale Converted', value: 386, fill: '#10B981' },
];

// Lead conversion by week
export const leadConversion = [
  { week: 'W1', leads: 110, converted: 42, rate: 38.2 },
  { week: 'W2', leads: 125, converted: 49, rate: 39.2 },
  { week: 'W3', leads: 140, converted: 56, rate: 40.0 },
  { week: 'W4', leads: 165, converted: 68, rate: 41.2 },
];

// Call volume by hour
export const callVolume = [
  { hour: '9am', inbound: 8, outbound: 3 },
  { hour: '10am', inbound: 14, outbound: 6 },
  { hour: '11am', inbound: 18, outbound: 9 },
  { hour: '12pm', inbound: 11, outbound: 5 },
  { hour: '1pm', inbound: 7, outbound: 4 },
  { hour: '2pm', inbound: 16, outbound: 8 },
  { hour: '3pm', inbound: 21, outbound: 11 },
  { hour: '4pm', inbound: 19, outbound: 10 },
  { hour: '5pm', inbound: 13, outbound: 6 },
  { hour: '6pm', inbound: 9, outbound: 3 },
];

// Customer sentiment distribution
export const sentimentData = [
  { name: 'Highly Enthusiastic', value: 52, fill: '#10B981' },
  { name: 'Deliberating / Positive', value: 31, fill: '#3B82F6' },
  { name: 'Neutral / Comparing', value: 12, fill: '#94A3B8' },
  { name: 'Price Sensitive', value: 5, fill: '#EF4444' },
];

// Top selling products (Apple, Samsung, Sony, LG, Dyson, Bose)
export const topProducts = [
  { name: 'iPhone 16 Pro Max', brand: 'Apple', unitsSold: 284, revenue: 454116, fill: '#8B5CF6' },
  { name: 'Galaxy S24 Ultra', brand: 'Samsung', unitsSold: 198, revenue: 280962, fill: '#6366F1' },
  { name: 'BRAVIA 9 85" Mini LED', brand: 'Sony', unitsSold: 64, revenue: 307136, fill: '#3B82F6' },
  { name: 'Dyson Airwrap i.d.', brand: 'Dyson', unitsSold: 215, revenue: 128785, fill: '#06B6D4' },
  { name: 'LG OLED evo G4 77"', brand: 'LG', unitsSold: 58, revenue: 231942, fill: '#10B981' },
  { name: 'Bose QC Ultra ANC', brand: 'Bose', unitsSold: 310, revenue: 132990, fill: '#F59E0B' },
];

// Agent performance
export const agentPerformance = [
  { name: 'Sarah Jenkins', calls: 38, converted: 18, revenue: 64200, csat: 98, speed: 88, adherence: 96 },
  { name: 'Liam Bennett', calls: 34, converted: 14, revenue: 49500, csat: 92, speed: 90, adherence: 88 },
  { name: 'Charlotte Evans', calls: 31, converted: 13, revenue: 44200, csat: 95, speed: 84, adherence: 92 },
  { name: 'Jean-Luc Moreau', calls: 29, converted: 11, revenue: 39800, csat: 90, speed: 82, adherence: 86 },
  { name: 'Elena Rostova', calls: 26, converted: 10, revenue: 35100, csat: 89, speed: 80, adherence: 84 },
];

// Store performance comparison
export const storeComparison = [
  { store: 'NYC Fifth Ave', visitors: 620, revenue: 142000, conversion: 42.4 },
  { store: 'London Regent St', visitors: 490, revenue: 98000, conversion: 39.1 },
  { store: 'Paris Champs-Élysées', visitors: 380, revenue: 76000, conversion: 36.8 },
  { store: 'Tokyo Ginza', visitors: 440, revenue: 92000, conversion: 40.5 },
  { store: 'Dubai Mall', visitors: 510, revenue: 110000, conversion: 41.2 },
];

// Demographics
export const demographics = [
  { region: 'North America', value: 42, color: '#3B82F6' },
  { region: 'Europe (UK/EU)', value: 29, color: '#8B5CF6' },
  { region: 'Asia-Pacific', value: 18, color: '#10B981' },
  { region: 'Middle East', value: 11, color: '#D4AF37' },
];

// High intent customers
export const highIntentCustomers = [
  {
    id: 'cust-elec-001',
    name: 'Marcus Sterling',
    phone: '+1 (212) 555-8941',
    intentScore: 94,
    lastVisit: 'Yesterday • Fifth Ave NYC',
    budget: '$2,500 - $3,500',
    preferredItem: 'Sony BRAVIA 9 85" + Apple TV Bundle',
    stage: 'Post Store Visit (48h Window)',
    action: 'Confirm ambient reflection guarantee & apply $500 soundbar rebate',
  },
  {
    id: 'cust-elec-002',
    name: 'Elena Rostova',
    phone: '+44 20 7946 0831',
    intentScore: 89,
    lastVisit: '2 Days Ago • Regent St London',
    budget: '$1,200 - $1,800',
    preferredItem: 'Dyson Airwrap i.d. + V15s Submarine',
    stage: 'Negotiation & Offers',
    action: 'Provide Global Blue VAT export link + gift monogramming coupon',
  },
  {
    id: 'cust-elec-003',
    name: 'David Zhao',
    phone: '+1 (415) 555-7319',
    intentScore: 96,
    lastVisit: 'Yesterday • Fifth Ave NYC',
    budget: '$3,000 - $5,000',
    preferredItem: 'Samsung Galaxy S24 Ultra (5 Units B2B)',
    stage: 'Live Telephony Consultation',
    action: 'Finalize enterprise trade-in credit and 0% financing terms',
  },
  {
    id: 'cust-elec-004',
    name: 'Chloe Chevalier',
    phone: '+33 1 42 68 99 44',
    intentScore: 78,
    lastVisit: '3 Days Ago • Paris Flagship',
    budget: '$1,000 - $1,500',
    preferredItem: 'Bose QuietComfort Ultra ANC Headphones',
    stage: 'Considering Financing',
    action: 'Send airline audio adapter bundle offer with 10% instant checkout',
  },
];

// Recent Activities
export const recentActivities = [
  {
    id: 'act-01',
    time: '8 mins ago',
    advisor: 'Sarah Jenkins',
    type: 'Sale Converted',
    customer: 'David Zhao',
    details: 'Converted 5x Samsung Galaxy S24 Ultra enterprise package ($7,095 total)',
    icon: 'DollarSign',
    color: '#10B981',
  },
  {
    id: 'act-02',
    time: '22 mins ago',
    advisor: 'System AI Copilot',
    type: 'AI Trigger',
    customer: 'Marcus Sterling',
    details: 'Detected customer downloaded Sony Bravia 9 technical cutsheet; dispatched follow-up task',
    icon: 'Sparkles',
    color: '#8B5CF6',
  },
  {
    id: 'act-03',
    time: '45 mins ago',
    advisor: 'Liam Bennett',
    type: 'Store Visit Logged',
    customer: 'Elena Rostova',
    details: 'Completed 40-minute Dyson Airwrap styling demonstration at Regent Street',
    icon: 'Store',
    color: '#3B82F6',
  },
  {
    id: 'act-04',
    time: '1 hour ago',
    advisor: 'Charlotte Evans',
    type: 'Follow-up Sent',
    customer: 'Alexander Pierce',
    details: 'Sent 0% 24-month AppleCard financing application via SMS link',
    icon: 'Send',
    color: '#D4AF37',
  },
];

// Upcoming Follow-ups
export const upcomingFollowUps = [
  {
    id: 'fu-01',
    customerName: 'Marcus Sterling',
    phone: '+1 (212) 555-8941',
    store: 'Fifth Ave NYC Flagship',
    interest: 'Sony BRAVIA 9 85" + Apple TV Bundle',
    dueTime: 'In 25 mins',
    priority: 'Urgent',
    intentScore: 94,
    recommendedAction: 'Confirm ambient reflection guarantee & apply $500 soundbar rebate',
  },
  {
    id: 'fu-02',
    customerName: 'Elena Rostova',
    phone: '+44 20 7946 0831',
    store: 'Regent St London Lounge',
    interest: 'Dyson Airwrap i.d. + V15s Wet/Dry Vac',
    dueTime: 'In 1 hour',
    priority: 'High',
    intentScore: 89,
    recommendedAction: 'Provide Global Blue VAT export link + gift monogramming coupon',
  },
  {
    id: 'fu-03',
    customerName: 'Chloe Chevalier',
    phone: '+33 1 42 68 99 44',
    store: 'Champs-Élysées Paris',
    interest: 'Bose QC Ultra ANC Headphones',
    dueTime: 'In 2 hours',
    priority: 'Medium',
    intentScore: 78,
    recommendedAction: 'Send airline audio adapter bundle offer with 10% instant checkout link',
  },
];

// AI recommendations widget
export const aiWidgetRecs = [
  {
    id: 'ai-rec-1',
    customer: 'Marcus Sterling',
    headline: 'High Propensity for Sony Bravia 9 TV Bundle',
    probability: '94% Conversion Likelihood',
    rationale: 'Customer demonstrated hesitation on ambient room brightness. Highlight Sony 4,000-nit peak luminance vs OLED.',
    suggestedScript: '"Mr. Sterling, regarding your concern about afternoon glare in your penthouse: the BRAVIA 9 utilizes our XR Backlight Master Drive with 4,000 nits, which is more than 3x brighter than traditional displays."',
    suggestedOffer: 'Complimentary White-Glove Wall Flush Installation ($250 value) + 24M 0% APR.',
  },
  {
    id: 'ai-rec-2',
    customer: 'Elena Rostova',
    headline: 'Cross-Sell Dyson Airwrap + V15s Submarine',
    probability: '88% Conversion Likelihood',
    rationale: 'Customer added both to wish-list after store demo. Offer combined luxury gift bundling discount.',
    suggestedScript: '"Madame Rostova, if you finalize the Airwrap i.d. together with the V15s Submarine today, our boutique will include the custom leather presentation case with complimentary monogramming."',
    suggestedOffer: 'Free $80 Monogramming Case + Extended 3-Year Protection.',
  },
];

export const analyticsSummary = {
  totalRevenueMTD: '$348,500',
  totalCallsMTD: '1,420',
  avgCSAT: '96.4%',
  npsScore: '+78',
  conversionRateMTD: '38.6%',
  aiLiftRate: '+34.2%',
};
