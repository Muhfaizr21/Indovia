import { useState, useEffect, useCallback } from 'react';
import {
  stateData as defaultKpis,
  hourlyActivityData as defaultHourly,
  regionalDistribution as defaultRegional,
  salesChannels as defaultChannels,
  conversionFunnel as defaultFunnel,
  paymentMethods as defaultPayments,
  recentIndoviaOrders as defaultOrders
} from '../data';

export const useSuperadminDashboard = (range = '1T') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiveSync, setIsLiveSync] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/v1/admin/superadmin/dashboard/overview?range=${range}`);
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}: Gagal memuat dashboard`);
      }
      const json = await res.json();
      if (json.data) {
        setData(json.data);
        setIsLiveSync(true);
      } else {
        throw new Error('Format data tidak valid');
      }
    } catch (err) {
      console.warn('Backend dashboard offline, using fallback state:', err.message);
      setError(err.message);
      setIsLiveSync(false);

      // Fallback data
      setData({
        generated_at: new Date().toISOString(),
        kpis: defaultKpis,
        revenue_chart: {
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
          gmv: [115, 142, 130, 168, 185, 210, 195, 240, 265, 280, 310, 345],
          net_revenue: [38, 46, 42, 55, 61, 70, 64, 79, 88, 93, 102, 114],
          target: [100, 120, 135, 150, 175, 190, 205, 225, 250, 270, 295, 320]
        },
        hourly_activity: defaultHourly,
        regional_distribution: defaultRegional,
        sales_channels: defaultChannels,
        customer_loyalty: {
          repeat_order_rate: 68.4,
          total_customers: 14280,
          new_customers: 4520,
          returning_customers: 9760
        },
        conversion_funnel: defaultFunnel,
        payment_methods: defaultPayments,
        recent_orders: defaultOrders
      });
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    data,
    loading,
    error,
    isLiveSync,
    refetch: fetchDashboardData
  };
};
