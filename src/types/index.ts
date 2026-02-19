// ===== BOOKING =====
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "refunded" | "escrow";

export interface Booking {
  id: string;
  bookingNumber: string;
  customer: {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
  };
  mechanic?: {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
  };
  service: {
    id: string;
    name: string;
    category: string;
  };
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  platformFee: number;
  mechanicEarning: number;
  location: {
    address: string;
    lat: number;
    lng: number;
    city: string;
  };
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    plate: string;
  };
  scheduledAt: string;
  completedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  notes?: string;
}

// ===== MECHANIC =====
export type MechanicStatus = "online" | "offline" | "busy";
export type VerificationStatus = "pending" | "approved" | "rejected";

export interface Mechanic {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: MechanicStatus;
  verificationStatus: VerificationStatus;
  isActive: boolean;
  rating: number;
  totalJobs: number;
  completedJobs: number;
  walletBalance: number;
  specializations: string[];
  location?: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
  joinedAt: string;
  city: string;
  ktpNumber?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountName?: string;
}

// ===== WORKSHOP =====
export interface Workshop {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  rating: number;
  totalJobs: number;
  services: string[];
  isActive: boolean;
  operatingHours: string;
  createdAt: string;
}

// ===== USER =====
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  totalBookings: number;
  isBlocked: boolean;
  joinedAt: string;
  lastActive: string;
  city: string;
}

// ===== TRANSACTION =====
export type TransactionType =
  | "booking_payment"
  | "mechanic_payout"
  | "platform_commission"
  | "withdrawal"
  | "refund";

export type EscrowStatus = "held" | "released" | "refunded";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  status: "completed" | "pending" | "failed";
  escrowStatus?: EscrowStatus;
  bookingId?: string;
  mechanicId?: string;
  description: string;
  createdAt: string;
}

// ===== SERVICE =====
export type PriceType = "fixed" | "hourly" | "estimate";

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  categoryId: string;
  basePrice: number;
  duration: number; // minutes
  priceType: PriceType;
  isActive: boolean;
  description: string;
}

// ===== NOTIFICATION =====
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "push" | "system" | "broadcast";
  target: "all" | "mechanics" | "users" | "workshops";
  sentAt: string;
  readCount: number;
  totalRecipients: number;
}

// ===== ADMIN NOTIFICATION (incoming) =====
export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: "booking" | "mechanic" | "payment" | "system" | "alert";
  isRead: boolean;
  createdAt: string;
  link?: string;
  metadata?: Record<string, string>;
}

// ===== MONITORING =====
export interface ActivityLog {
  id: string;
  type:
    | "booking_created"
    | "booking_accepted"
    | "booking_completed"
    | "mechanic_online"
    | "mechanic_offline"
    | "payment_received"
    | "system_alert";
  message: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

// ===== SETTINGS =====
export interface SystemSettings {
  surgeMultiplier: number;
  commissionPercentage: number;
  serviceRadiusKm: number;
  maxActiveBookingsPerMechanic: number;
  cancellationFeePercentage: number;
  autoAssignEnabled: boolean;
  maintenanceMode: boolean;
}

// ===== ANALYTICS =====
export interface DashboardStats {
  totalBookingsToday: number;
  activeBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  platformCommission: number;
  activeMechanics: number;
  newUsers: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

// ===== PAGINATION =====
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface TableFilters {
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  city?: string;
  service?: string;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
