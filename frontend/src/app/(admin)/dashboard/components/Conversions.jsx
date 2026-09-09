import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { regionalDistribution, salesChannels } from '../data';
import { useLayoutContext } from '@/context/useLayoutContext';

// CHART 4 [WHO]: Segmentasi & Loyalitas Pelanggan (Col xl={5})
// Signature Indovia Orange Palette: Warm Amber to Vibrant Orange (#ff6c2f & #f97316)
export const CustomerLoyaltyChart = ({ loyaltyData = null }) => {
  const { theme } = useLayoutContext();
  const isDark = theme === 'dark';

  const repeatRate = loyaltyData?.repeat_order_rate || 68.4;
  const newRate = Number((100 - repeatRate).toFixed(1));
  const returningCount = loyaltyData?.returning_customers || 12599;
  const newCount = loyaltyData?.new_customers || 5821;

  const customerChartOptions = {
    chart: {
      height: 220,
      type: 'radialBar',
      background: 'transparent'
    },
    theme: {
      mode: isDark ? 'dark' : 'light'
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: '65%' },
        track: {
          background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.6)',
          strokeWidth: '100%'
        },
        dataLabels: {
          name: {
            fontSize: '11px',
            color: isDark ? '#94a3b8' : '#64748b',
            offsetY: 25,
            fontWeight: 500
          },
          value: {
            offsetY: -10,
            fontSize: '24px',
            fontWeight: 700,
            color: isDark ? '#ffffff' : '#0f172a',
            formatter: (val) => `${val}%`
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: isDark ? 'dark' : 'light',
        type: 'horizontal',
        shadeIntensity: 0.3,
        gradientToColors: ['#fb923c'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: { dashArray: 4 },
    colors: ['#ff6c2f'],
    series: [repeatRate],
    labels: ['Pelanggan Setia (Repeat)'],
    grid: {
      padding: { top: -15, bottom: -15 }
    }
  };

  return (
    <Col xl={5} className="mb-3">
      <Card className="border-0 shadow-sm h-100">
        <CardBody className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div>
              <CardTitle as="h5" className="fw-bold mb-0 text-body fs-15">
                Segmentasi & Loyalitas Pelanggan
              </CardTitle>
              <p className="text-muted fs-11 mb-0">
                Rasio Retensi Pembeli Berulang vs Pelanggan Baru
              </p>
            </div>
            <span
              className="px-2 py-0.5 rounded fs-11 fw-semibold"
              style={{ backgroundColor: 'rgba(255, 108, 47, 0.1)', color: '#ff6c2f' }}
            >
              Retensi {repeatRate}%
            </span>
          </div>

          <Row className="align-items-center g-2 mt-1">
            <Col sm={5} className="text-center">
              <div dir="ltr">
                <ReactApexChart
                  options={customerChartOptions}
                  series={customerChartOptions.series}
                  height={200}
                  type="radialBar"
                />
              </div>
            </Col>
            <Col sm={7}>
              <div
                className="p-2 mb-2 rounded-2 bg-light bg-opacity-25 border"
              >
                <div className="d-flex align-items-center">
                  <div
                    className="avatar-xs rounded-circle d-flex align-items-center justify-content-center me-2 text-white"
                    style={{ backgroundColor: '#ff6c2f', width: 24, height: 24 }}
                  >
                    <IconifyIcon icon="solar:user-check-bold" className="fs-12" />
                  </div>
                  <div>
                    <p className="text-muted mb-0 fs-11">Pembeli Berulang</p>
                    <h6 className="mb-0 fw-bold text-body fs-12">{returningCount.toLocaleString('id-ID')} Akun ({repeatRate}%)</h6>
                  </div>
                </div>
              </div>

              <div
                className="p-2 rounded-2 bg-light bg-opacity-25 border"
              >
                <div className="d-flex align-items-center">
                  <div
                    className="avatar-xs rounded-circle d-flex align-items-center justify-content-center me-2 text-white"
                    style={{ backgroundColor: '#64748b', width: 24, height: 24 }}
                  >
                    <IconifyIcon icon="solar:user-plus-bold" className="fs-12" />
                  </div>
                  <div>
                    <p className="text-muted mb-0 fs-11">Pelanggan Baru</p>
                    <h6 className="mb-0 fw-bold text-body fs-12">{newCount.toLocaleString('id-ID')} Akun ({newRate}%)</h6>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <div
            className="p-2 mt-2 rounded-2 d-flex align-items-center justify-content-between bg-light bg-opacity-25 border"
          >
            <span className="fs-11 text-muted">
              Rata-rata Belanja Ulang: <strong>3.4x / tahun</strong> &bull; LTV: <strong>Rp 940k</strong>
            </span>
            <span
              className="px-2 py-0.5 rounded fs-11 fw-medium"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#16a34a' }}
            >
              Target Tercapai
            </span>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

// CHART 3 [WHERE]: Sebaran Wilayah & Kanal Penjualan (Col xl={12})
// Signature Indovia Warm Palette: Bright Orange (#ff6c2f), Warm Amber (#ea580c), Soft Peach (#fdba74)
export const RegionalDistributionChart = ({ regionalData = null, channelData = null }) => {
  const { theme } = useLayoutContext();
  const isDark = theme === 'dark';

  const regions = regionalData || regionalDistribution;
  const channels = channelData || salesChannels;

  const channelPercentages = channels.map((c) => Math.round(c.percentage));
  const channelLabels = channels.map((c) => c.name);

  const channelChartOptions = {
    chart: { type: 'donut', height: 200, background: 'transparent' },
    theme: {
      mode: isDark ? 'dark' : 'light'
    },
    series: channelPercentages.length > 0 ? channelPercentages : [48, 34, 18],
    labels: channelLabels.length > 0 ? channelLabels : ['Web Storefront', 'WhatsApp Direct', 'Multi-Channel Sync'],
    colors: ['#ff6c2f', '#ea580c', '#fdba74'],
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: {
      colors: [isDark ? '#1e252b' : '#ffffff'],
      width: 2
    },
    plotOptions: {
      pie: {
        donut: {
          size: '76%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Saluran',
              fontSize: '11px',
              color: isDark ? '#94a3b8' : '#64748b',
              formatter: () => '100%'
            },
            value: {
              color: isDark ? '#ffffff' : '#0f172a',
              fontSize: '16px',
              fontWeight: 700
            }
          }
        }
      }
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (val) => `${val}% Kontribusi Omset`
      }
    }
  };

  const regionTones = ['#ea580c', '#ff6c2f', '#f97316', '#fb923c', '#fdba74'];

  return (
    <Col xl={12} className="mb-3">
      <Card className="border-0 shadow-sm h-100">
        <CardBody className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <CardTitle as="h5" className="fw-bold mb-0 text-body fs-15">
                Sebaran Wilayah & Kanal Penjualan
              </CardTitle>
              <p className="text-muted fs-11 mb-0">
                Konsentrasi Pesanan Nusantara & Integrasi Saluran Toko Indovia
              </p>
            </div>
            <span
              className="px-2 py-0.5 rounded fs-11 fw-medium"
              style={{ backgroundColor: 'rgba(255, 108, 47, 0.1)', color: '#ff6c2f' }}
            >
              Nasional &bull; 34 Provinsi
            </span>
          </div>

          <Row className="align-items-center g-3">
            {/* Donut Saluran Penjualan */}
            <Col md={4} className="text-center">
              <div dir="ltr">
                <ReactApexChart
                  options={channelChartOptions}
                  series={channelChartOptions.series}
                  height={190}
                  type="donut"
                />
              </div>
              <div className="d-flex justify-content-center gap-3 mt-1">
                <span className="fs-11 text-muted">
                  <span style={{ color: '#ff6c2f' }}>&bull;</span> Web (48%)
                </span>
                <span className="fs-11 text-muted">
                  <span style={{ color: '#ea580c' }}>&bull;</span> WhatsApp (34%)
                </span>
                <span className="fs-11 text-muted">
                  <span style={{ color: '#fdba74' }}>&bull;</span> Sync (18%)
                </span>
              </div>
            </Col>

            {/* Progress Wilayah */}
            <Col md={8}>
              <p className="fs-11 fw-bold text-uppercase text-muted mb-2">
                5 Wilayah Pesanan Terbesar di Indonesia:
              </p>
              <Row className="g-2">
                {regions.map((item, idx) => (
                  <Col md={6} key={idx} className="mb-1">
                    <div
                      className="p-2 rounded-2 bg-light bg-opacity-25 border"
                    >
                      <div className="d-flex justify-content-between fs-12 mb-1">
                        <span className="fw-semibold text-body">{item.region}</span>
                        <span className="text-muted fw-bold">
                          {item.orders} order ({item.percentage}%)
                        </span>
                      </div>
                      <div className="progress" style={{ height: '4px' }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: regionTones[idx] || '#64748b'
                          }}
                        />
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

const Conversions = () => {
  return (
    <>
      <CustomerLoyaltyChart />
      <RegionalDistributionChart />
    </>
  );
};

export default Conversions;