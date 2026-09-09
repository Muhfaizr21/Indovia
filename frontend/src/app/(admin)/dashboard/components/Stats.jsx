import IconifyIcon from '@/components/wrappers/IconifyIcon';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardFooter, CardTitle, Col } from 'react-bootstrap';
import { stateData } from '../data';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLayoutContext } from '@/context/useLayoutContext';

// 4 KPI Cards in signature Indovia warm orange branding
export const KpiCards = ({ kpis = stateData }) => {
  const items = kpis && kpis.length > 0 ? kpis : stateData;

  return (
    <>
      {items.map((item, idx) => (
        <Col sm={6} xl={3} key={idx} className="mb-3">
          <Card className="overflow-hidden border-0 shadow-sm h-100">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div
                  className="avatar-md rounded-3 d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'rgba(255, 108, 47, 0.1)' }}
                >
                  <IconifyIcon icon={item.icon || 'solar:wallet-money-bold-duotone'} className="fs-26" style={{ color: '#ff6c2f' }} />
                </div>
                <div className="text-end">
                  <p className="text-muted mb-1 text-truncate fs-12 fw-medium">{item.name}</p>
                  <h4 className="mt-0 mb-0 fw-bold fs-18 text-body">{item.amount}</h4>
                </div>
              </div>
            </CardBody>
            <CardFooter className="py-1 px-3 bg-light bg-opacity-25 border-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span
                    className="d-inline-flex align-items-center px-1.5 py-0.5 rounded fs-11 fw-semibold"
                    style={{
                      backgroundColor: item.variant === 'danger' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                      color: item.variant === 'danger' ? '#dc2626' : '#16a34a'
                    }}
                  >
                    <IconifyIcon icon={item.variant === 'danger' ? 'bxs:down-arrow' : 'bxs:up-arrow'} className="fs-10 me-1" />
                    {item.change}%
                  </span>
                  <span className="text-muted ms-1 fs-11">{item.period || 'vs bln lalu'}</span>
                </div>
                <Link to="/billing/billing-dashboard" className="fw-semibold fs-11 text-decoration-none" style={{ color: '#ff6c2f' }}>
                  Detail &rarr;
                </Link>
              </div>
            </CardFooter>
          </Card>
        </Col>
      ))}
    </>
  );
};

// CHART 1 [WHAT]: Pertumbuhan Pendapatan & Volume Transaksi (Signature Indovia Orange & Emerald Green)
export const RevenueChart = ({ revenueData = null }) => {
  const [filterRange, setFilterRange] = useState('1T');
  const { theme } = useLayoutContext();
  const isDark = theme === 'dark';

  const months = revenueData?.months || ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const gmvData = revenueData?.gmv || [115, 142, 130, 168, 185, 210, 195, 240, 265, 280, 310, 345];
  const netRevenueData = revenueData?.net_revenue || [38, 46, 42, 55, 61, 70, 64, 79, 88, 93, 102, 114];
  const targetData = revenueData?.target || [100, 120, 135, 150, 175, 190, 205, 225, 250, 270, 295, 320];

  const chartOptions = {
    series: [
      {
        name: 'Gross Merchandise Value (GMV)',
        type: 'column',
        data: gmvData
      },
      {
        name: 'Pendapatan Bersih Platform',
        type: 'area',
        data: netRevenueData
      },
      {
        name: 'Target Penjualan',
        type: 'line',
        data: targetData
      }
    ],
    chart: {
      height: 290,
      type: 'line',
      background: 'transparent',
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    theme: {
      mode: isDark ? 'dark' : 'light'
    },
    // Signature Indovia Palette: Orange (#ff6c2f), Emerald Green (#22c55e), Muted Slate (#64748b)
    colors: ['#ff6c2f', '#22c55e', isDark ? '#94a3b8' : '#64748b'],
    stroke: {
      width: [0, 2.5, 2],
      dashArray: [0, 0, 4],
      curve: 'smooth'
    },
    fill: {
      opacity: [0.95, 0.22, 1],
      type: ['solid', 'gradient', 'solid'],
      gradient: {
        type: 'vertical',
        shadeIntensity: 0.1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 95]
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '28%',
        borderRadius: 4
      }
    },
    xaxis: {
      categories: months,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: {
          colors: isDark ? '#94a3b8' : '#64748b',
          fontSize: '11px',
          fontWeight: 500
        }
      }
    },
    yaxis: {
      min: 0,
      labels: {
        formatter: (val) => `Rp ${val}Jt`,
        style: {
          colors: isDark ? '#94a3b8' : '#64748b',
          fontSize: '11px'
        }
      }
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.7)',
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { top: 0, right: 10, bottom: 0, left: 10 }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '12px',
      markers: { radius: 3 },
      itemMargin: { horizontal: 10, vertical: 2 },
      labels: {
        colors: isDark ? '#e2e8f0' : '#334155'
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (val) => (typeof val !== 'undefined' ? `Rp ${val} Juta` : '')
      }
    }
  };

  return (
    <Col xl={7} className="mb-3">
      <Card className="border-0 shadow-sm h-100">
        <CardBody className="p-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
            <div>
              <CardTitle as="h5" className="fw-bold mb-0 text-body fs-15">
                Pertumbuhan Pendapatan & Nilai Transaksi
              </CardTitle>
              <p className="text-muted fs-11 mb-0">
                Performa GMV, Pendapatan Bersih Platform, dan Target Finansial Sepanjang 2026
              </p>
            </div>
            <div className="btn-group mt-1 mt-sm-0" role="group">
              {['1B', '6B', '1T', 'Semua'].map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setFilterRange(range)}
                  className={`btn btn-xs py-0.5 px-2 fs-11 ${
                    filterRange === range
                      ? 'text-white fw-semibold'
                      : 'btn-outline-light text-muted border'
                  }`}
                  style={{
                    backgroundColor: filterRange === range ? '#ff6c2f' : 'transparent',
                    borderColor: filterRange === range ? '#ff6c2f' : '#e2e8f0'
                  }}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div dir="ltr">
            <ReactApexChart options={chartOptions} series={chartOptions.series} height={290} type="line" className="apex-charts" />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

const Stats = () => {
  return <KpiCards />;
};

export default Stats;