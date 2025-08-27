// Define types for our data
export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: string;
}

export interface OrderStatus {
  _id: string;
  count: number;
}

export interface SalesOverTime {
  _id: {
    year: number;
    month: number;
    day: number;
  };
  total: number;
  count: number;
}

export interface TopProduct {
  _id: string;
  totalSold: number;
}

export interface RecentUser {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  role: string;
  createdAt: string;
}

export interface UserGrowth {
  _id: {
    year: number;
    month: number;
  };
  count: number;
}
