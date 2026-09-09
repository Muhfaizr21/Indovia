import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardTitle, Col } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { hourlyActivityData } from '../data';
import { useLayoutContext } from '@/context/useLayoutContext';

const ActivityChart = () => {
  const { theme } = useLayoutContext();
  const isDark = theme === 'dark';

  // CHART 2 [WHEN]: Distribusi Waktu & Jam Puncak Transaksi
  // Signature Indovia Palette: Warm Orange (#ff6c2f) & Clean Charcoal Slate / Sky Blue (#334155 / #38bdf8)
  const chartOptions = {
    series: [
      {
        name: 'Jumlah Transaksi (Order)',
        type: 'column',
        data: hourlyActivityData.orders
      },
      {
        name: 'Pengunjung Aktif (Trafik)',
        type: 'line',
        data: hourlyActivityData.visitors.map((v) => Math.round(v / 3))
      }
    ],
    chart: {
      height: 300,
      type: 'line',
      background: 'transparent',
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    theme: {
      mode: isDark ? 'dark' : 'light'
    },
    stroke: {
      width: [0, 2.5],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '26%',
        borderRadius: 4
      }
    },
    fill: {
      opacity: [0.95, 1],
      type: ['solid', 'solid']
    },
    colors: ['#ff6c2f', isDark ? '#38bdf8' : '#334155'],
    labels: hourlyActivityData.hours,
    xaxis: {
      type: 'category',
      labels: {
        style: {
          colors: isDark ? '#94a3b8' : '#64748b',
          fontSize: '11px',
          fontWeight: 500
        }
      },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: [
      {
        title: {
          text: 'Transaksi (Order/Jam)',
          style: { color: '#ff6c2f', fontSize: '11px', fontWeight: 600 }
        },
        labels: {
          formatter: (val) => `${Math.round(val)}`,
          style: { colors: isDark ? '#94a3b8' : '#64748b', fontSize: '10px' }
        },
        min: 0
      },
      {
        opposite: true,
        title: {
          text: 'Estimasi Pengunjung Realtime',
          style: { color: isDark ? '#38bdf8' : '#334155', fontSize: '11px', fontWeight: 600 }
        },
        labels: {
          formatter: (val) => `${Math.round(val * 3)}`,
          style: { colors: isDark ? '#94a3b8' : '#64748b', fontSize: '10px' }
        },
        min: 0
      }
    ],
    grid: {
      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.7)',
      strokeDashArray: 3,
      yaxis: { lines: { show: true } }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '12px',
      markers: { radius: 3 },
      labels: {
        colors: isDark ? '#e2e8f0' : '#334155'
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: isDark ? 'dark' : 'light',
      y: [
        { formatter: (val) => `${val} pesanan` },
        { formatter: (val) => `${val * 3} pengunjung` }
      ]
    }
  };

  return (
    <Col xl={6} className="mb-3">
      <Card className="border-0 shadow-sm h-100">
        <CardBody className="p-3">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <CardTitle as="h5" className="fw-bold mb-0 text-body fs-15">
                Distribusi Waktu & Jam Puncak Transaksi
              </CardTitle>
              <p className="text-muted fs-11 mb-0">
                Pola Pembelian Konsumen Berdasarkan 24 Jam Aktivitas Toko
              </p>
            </div>
            <span
              className="px-2 py-0.5 rounded fs-11 fw-medium"
              style={{ backgroundColor: 'rgba(255, 108, 47, 0.1)', color: '#ff6c2f' }}
            >
              Zona Waktu WIB
            </span>
          </div>

          <div dir="ltr">
            <ReactApexChart options={chartOptions} series={chartOptions.series} height={300} type="line" className="apex-charts" />
          </div>

          {/* Business Prime Time Insight */}
          <div
            className="p-2 mt-2 rounded-2 d-flex align-items-center justify-content-between bg-light bg-opacity-25 border"
          >
            <div className="d-flex align-items-center">
              <div
                className="avatar-xs rounded-circle d-flex align-items-center justify-content-center me-2 text-white"
                style={{ backgroundColor: '#ff6c2f', width: 24, height: 24 }}
              >
                <IconifyIcon icon="solar:clock-circle-bold" className="fs-12" />
              </div>
              <span className="fs-12 text-muted">
                <strong>Jam Emas:</strong> Pukul <strong>19:00 - 21:00 WIB</strong> mencatat 41.2% dari total checkout harian.
              </span>
            </div>
            <span
              className="px-2 py-0.5 rounded fs-11 fw-semibold"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#16a34a' }}
            >
              Rekomendasi Flash Sale
            </span>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ActivityChart;
