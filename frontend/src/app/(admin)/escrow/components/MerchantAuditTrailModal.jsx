import React from 'react';
import { Modal, Button, Table, Badge, Spinner } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { formatRupiah } from '../data';

const MerchantAuditTrailModal = ({ show, onHide, merchant, journals = [], loading = false }) => {
  if (!merchant) return null;

  const displayJournals = Array.isArray(journals) ? journals : [];

  const handleExportMerchantJournals = () => {
    let csv = 'ID Jurnal,Waktu,Merchant,No Referensi,Akun Debit,Akun Kredit,Nominal (IDR),Jenis Mutasi,Keterangan\n';
    displayJournals.forEach((j) => {
      const jId = j.journal_id || j.journalId || '';
      const time = j.timestamp || '';
      const mName = j.merchant_name || j.merchantName || '';
      const ref = j.ref_id || j.refId || '';
      const debit = j.account_debit || j.accountDebit || '';
      const credit = j.account_credit || j.accountCredit || '';
      const amt = j.amount || 0;
      const type = j.type || '';
      const memo = (j.memo || '').replace(/"/g, '""');
      csv += `"${jId}","${time}","${mName}","${ref}","${debit}","${credit}",${amt},"${type}","${memo}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `jurnal_audit_${merchant.merchantCode || merchant.merchant_code || 'merchant'}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const storeName = merchant.storeName || merchant.store_name || merchant.name;
  const merchantCode = merchant.merchantCode || merchant.merchant_code || merchant.merchantId;
  const ownerName = merchant.ownerName || merchant.owner_name;
  const ownerPhone = merchant.ownerPhone || merchant.owner_phone;
  const tier = merchant.tier || merchant.plan || 'Pro';
  const bankName = merchant.bankAccount?.bankName || merchant.bankAccount?.bank_name || 'BCA';
  const accountNum = merchant.bankAccount?.accountNumber || merchant.bankAccount?.account_number || '-';
  const availBal = merchant.availableBalance ?? merchant.available_balance ?? 0;
  const pendBal = merchant.pendingBalance ?? merchant.pending_balance ?? 0;
  const lockBal = merchant.lockedBalance ?? merchant.locked_balance ?? 0;

  return (
    <Modal show={show} onHide={onHide} size="xl" centered scrollable>
      <Modal.Header closeButton className="border-secondary-subtle">
        <Modal.Title className="d-flex align-items-center fs-16 fw-bold text-body">
          <IconifyIcon icon="solar:book-bookmark-bold-duotone" className="text-primary me-2 fs-22" />
          Buku Besar Akuntansi (Double-Entry Ledger Audit Trail)
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* MERCHANT HEADER INFO */}
        <div className="d-flex flex-wrap justify-content-between align-items-center p-3 rounded-2 bg-body-secondary border border-secondary-subtle mb-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <h5 className="mb-0 fw-bold text-body">{storeName}</h5>
              <Badge bg="primary-subtle" className="text-primary fs-11">
                {tier}
              </Badge>
              <Badge bg="secondary-subtle" className="text-body font-monospace fs-11">
                {merchantCode}
              </Badge>
            </div>
            <p className="text-muted fs-12 mb-0">
              Pemilik: <strong>{ownerName}</strong> ({ownerPhone}) • Rekening: {bankName} {accountNum}
            </p>
          </div>

          <div className="d-flex gap-3 text-end mt-2 mt-sm-0">
            <div>
              <span className="text-muted fs-11 d-block">Available</span>
              <strong className="text-success fs-14">{formatRupiah(availBal)}</strong>
            </div>
            <div>
              <span className="text-muted fs-11 d-block">Pending</span>
              <strong className="text-warning fs-14">{formatRupiah(pendBal)}</strong>
            </div>
            <div>
              <span className="text-muted fs-11 d-block">Locked</span>
              <strong className="text-danger fs-14">{formatRupiah(lockBal)}</strong>
            </div>
          </div>
        </div>

        {/* LEDGER TABLE */}
        <div className="table-responsive rounded-2 border border-secondary-subtle">
          <Table hover className="table-nowrap mb-0 align-middle">
            <thead className="bg-body-tertiary fs-11 text-uppercase text-muted">
              <tr>
                <th className="py-2.5">No. Jurnal & Waktu</th>
                <th>Entitas / Merchant</th>
                <th>Akun Debit (Dr)</th>
                <th>Akun Kredit (Cr)</th>
                <th className="text-end">Nominal</th>
                <th>Jenis Mutasi</th>
                <th>Keterangan / Memo</th>
              </tr>
            </thead>
            <tbody className="fs-12">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    <Spinner animation="border" size="sm" variant="primary" className="me-2" />
                    <span className="text-muted fs-12">Memuat catatan jurnal buku besar...</span>
                  </td>
                </tr>
              ) : displayJournals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted fs-12">
                    Belum ada riwayat mutasi jurnal akuntansi untuk toko ini.
                  </td>
                </tr>
              ) : (
                displayJournals.map((j) => {
                  const jId = j.journal_id || j.journalId;
                  const time = j.timestamp;
                  const mName = j.merchant_name || j.merchantName;
                  const ref = j.ref_id || j.refId;
                  const debit = j.account_debit || j.accountDebit;
                  const credit = j.account_credit || j.accountCredit;
                  const amt = j.formatted_amount || formatRupiah(j.amount || 0);
                  const type = j.type;
                  const memo = j.memo;

                  return (
                    <tr key={jId || Math.random()}>
                      <td>
                        <strong className="font-monospace text-body d-block">{jId}</strong>
                        <small className="text-muted fs-11">{time}</small>
                      </td>
                      <td>
                        <span className="fw-semibold text-body">{mName}</span>
                        <small className="text-muted d-block font-monospace fs-11">Ref: {ref}</small>
                      </td>
                      <td>
                        <code className="text-primary fs-11">{debit}</code>
                      </td>
                      <td>
                        <code className="text-success fs-11">{credit}</code>
                      </td>
                      <td className="text-end fw-bold text-body">
                        {amt}
                      </td>
                      <td>
                        {type === 'ESCROW_INFLOW' && (
                          <Badge bg="info-subtle" className="text-info fs-10">
                            Inflow Masuk
                          </Badge>
                        )}
                        {type === 'PLATFORM_REVENUE' && (
                          <Badge bg="primary-subtle" className="text-primary fs-10">
                            Komisi SaaS
                          </Badge>
                        )}
                        {type === 'DISBURSEMENT_PAYOUT' && (
                          <Badge bg="success-subtle" className="text-success fs-10">
                            Disbursement Payout
                          </Badge>
                        )}
                        {type === 'DISPUTE_HOLD' && (
                          <Badge bg="danger-subtle" className="text-danger fs-10">
                            Pembekuan Sengketa
                          </Badge>
                        )}
                        {type === 'DISPUTE_RELEASE' && (
                          <Badge bg="warning-subtle" className="text-warning fs-10">
                            Pelepasan Sengketa
                          </Badge>
                        )}
                        {type === 'SETTLEMENT_RELEASE' && (
                          <Badge bg="success-subtle" className="text-success fs-10">
                            Auto-Release
                          </Badge>
                        )}
                        {type === 'DISPUTE_FREEZE' && (
                          <Badge bg="danger-subtle" className="text-danger fs-10">
                            Pembekuan Sengketa
                          </Badge>
                        )}
                      </td>
                      <td>
                        <span className="text-body-secondary fs-11">{memo}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-secondary-subtle d-flex justify-content-between">
        <Button
          variant="outline-secondary"
          size="sm"
          className="d-flex align-items-center"
          onClick={handleExportMerchantJournals}
          disabled={displayJournals.length === 0}
        >
          <IconifyIcon icon="solar:file-download-bold" className="me-1.5 fs-16" />
          Ekspor Jurnal CSV
        </Button>
        <Button variant="secondary" size="sm" onClick={onHide}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MerchantAuditTrailModal;
