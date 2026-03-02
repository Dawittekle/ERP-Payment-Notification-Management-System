import React, { useState } from 'react';
import { Building2, Key, Bot, Receipt, Save, CheckCircle2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

/**
 * QINDE ERP — System & Organization Settings Component
 * Covers Organization Profile, Chapa Gateway API keys, Telegram Bot integration, and 15% VAT Tax configuration.
 */
export const SystemSettings: React.FC = () => {
  const [isSaved, setIsSaved] = useState(false);

  const [orgForm, setOrgForm] = useState({
    companyName: 'QINDE Enterprise Technologies PLC',
    tinNumber: '0049281034',
    vatRegNumber: 'VAT-ETH-984321',
    address: 'Bole Medhanealem, Atlas Building 4th Floor, Addis Ababa, Ethiopia',
    fiscalCurrency: 'ETB (Ethiopian Birr)',
  });

  const [chapaForm, setChapaForm] = useState({
    publicKey: 'CHAPUBK_TEST-9843201948203948',
    secretKey: 'CHASECK_TEST-••••••••••••••••••••••••',
    webhookSecret: 'whsec_9843201948203948',
    environment: 'SANDBOX',
  });

  const [botForm, setBotForm] = useState({
    botToken: 'bot78439201:AAH••••••••••••••••••••••••',
    channelChatId: '-100198432019',
    enableOutboxDispatch: true,
  });

  const [taxForm, setTaxForm] = useState({
    vatRate: 15.0,
    invoicePrefix: 'INV-2026-',
    autoApplyVat: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-brand-navy)' }}>
            Organization Profile & System Gateway Settings
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Manage legal entity details, Chapa API credentials, Telegram notification bots, and VAT parameters.
          </p>
        </div>

        <Button variant="primary" type="submit" icon={isSaved ? CheckCircle2 : Save}>
          {isSaved ? 'Settings Saved!' : 'Save System Configuration'}
        </Button>
      </div>

      {/* Organization Legal Profile */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--color-border-default)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-brand-navy)' }}>
          <Building2 size={20} />
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Organization Legal Entity</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <Input
            label="Company Registered Name"
            value={orgForm.companyName}
            onChange={(e) => setOrgForm({ ...orgForm, companyName: e.target.value })}
          />
          <Input
            label="Ethiopian Tax Identification Number (TIN)"
            value={orgForm.tinNumber}
            onChange={(e) => setOrgForm({ ...orgForm, tinNumber: e.target.value })}
          />
          <Input
            label="VAT Registration Number"
            value={orgForm.vatRegNumber}
            onChange={(e) => setOrgForm({ ...orgForm, vatRegNumber: e.target.value })}
          />
          <Input
            label="Base Fiscal Currency"
            value={orgForm.fiscalCurrency}
            disabled
          />
        </div>
        <Input
          label="Registered Head Office Address"
          value={orgForm.address}
          onChange={(e) => setOrgForm({ ...orgForm, address: e.target.value })}
        />
      </div>

      {/* Chapa Payment Gateway Configuration */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--color-border-default)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-brand-navy)' }}>
          <Key size={20} />
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Chapa Gateway Integration Keys</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <Input
            label="Chapa Public Key (CHAPUBK)"
            value={chapaForm.publicKey}
            onChange={(e) => setChapaForm({ ...chapaForm, publicKey: e.target.value })}
          />
          <Input
            label="Chapa Secret Key (CHASECK)"
            type="password"
            value={chapaForm.secretKey}
            onChange={(e) => setChapaForm({ ...chapaForm, secretKey: e.target.value })}
          />
        </div>
        <Input
          label="Webhook HMAC Secret Key"
          value={chapaForm.webhookSecret}
          onChange={(e) => setChapaForm({ ...chapaForm, webhookSecret: e.target.value })}
        />
      </div>

      {/* Telegram Outbox Bot & Tax Config */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        <div
          style={{
            backgroundColor: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border-default)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-brand-navy)' }}>
            <Bot size={20} />
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Telegram Notification Bot</h3>
          </div>

          <Input
            label="Telegram Bot API Token"
            value={botForm.botToken}
            onChange={(e) => setBotForm({ ...botForm, botToken: e.target.value })}
          />
          <Input
            label="Finance Channel Chat ID"
            value={botForm.channelChatId}
            onChange={(e) => setBotForm({ ...botForm, channelChatId: e.target.value })}
          />
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border-default)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-brand-navy)' }}>
            <Receipt size={20} />
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Ethiopian Tax & Invoice Parameters</h3>
          </div>

          <Input
            label="Standard Ethiopian VAT Rate (%)"
            type="number"
            value={taxForm.vatRate}
            onChange={(e) => setTaxForm({ ...taxForm, vatRate: parseFloat(e.target.value) || 0 })}
          />
          <Input
            label="Invoice Serial Number Prefix"
            value={taxForm.invoicePrefix}
            onChange={(e) => setTaxForm({ ...taxForm, invoicePrefix: e.target.value })}
          />
        </div>
      </div>
    </form>
  );
};
