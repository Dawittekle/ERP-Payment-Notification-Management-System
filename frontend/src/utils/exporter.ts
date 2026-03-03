/**
 * QINDE ERP — Data & Financial Statement Exporter Utility
 * Utility functions for exporting tabular ledgers to CSV files and formatted printable documents.
 */

export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string = 'qinde_erp_export.csv'
): void {
  if (!data || data.length === 0) {
    alert('No data available to export.');
    return;
  }

  // Extract headers
  const headers = Object.keys(data[0]);
  const csvRows: string[] = [];

  // Header row
  csvRows.push(headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(','));

  // Data rows
  for (const row of data) {
    const values = headers.map((header) => {
      const val = row[header];
      const escaped = ('' + (val ?? '')).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  // Create blob and download trigger
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printFinancialReport(reportTitle: string, dataHtml: string): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${reportTitle} - QINDE ERP</title>
        <style>
          body { font-family: 'Inter', sans-serif; padding: 32px; color: #172033; }
          h1 { font-size: 22px; color: #102A43; margin-bottom: 8px; }
          .header { border-bottom: 2px solid #102A43; padding-bottom: 16px; margin-bottom: 24px; }
          .footer { margin-top: 40px; border-top: 1px solid #E4E7EC; pt: 16px; font-size: 11px; color: #667085; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>QINDE ERP (ቅንደ) — Executive Report</h1>
          <p>Title: ${reportTitle} | Generated: ${new Date().toLocaleString()}</p>
        </div>
        <div>${dataHtml}</div>
        <div class="footer">Confidential — QINDE Enterprise Technologies PLC</div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
