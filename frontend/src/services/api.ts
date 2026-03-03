/**
 * QINDE ERP — Backend API Client Integration Service
 * Configured to target the Spring Boot Backend API endpoint.
 * Base URL defaults to VITE_API_BASE_URL or http://localhost:8080/api/v1
 */

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('qinde_auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      console.warn(`[QINDE API Mock Fallback] GET ${endpoint} failed, falling back to local dataset.`, error.message);
      throw error;
    }
  }

  async post<T>(endpoint: string, payload: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      console.warn(`[QINDE API Mock Fallback] POST ${endpoint} failed.`, error.message);
      throw error;
    }
  }

  async put<T>(endpoint: string, payload: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      console.warn(`[QINDE API Mock Fallback] PUT ${endpoint} failed.`, error.message);
      throw error;
    }
  }
}

export const api = new ApiClient(API_BASE_URL);

/**
 * Endpoints specification map for Spring Boot backend controllers:
 * - AuthController: /auth/login, /auth/me, /auth/logout
 * - CustomerController: /customers, /customers/{id}
 * - InvoiceController: /invoices, /invoices/{id}, /invoices/issue
 * - PaymentController: /payments, /payments/initiate, /payments/verify
 * - RefundController: /refunds, /refunds/{id}/approve
 * - ReconciliationController: /reconciliation/diffs, /reconciliation/resolve
 * - AuditController: /audit-logs
 */
export const API_ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  CUSTOMERS: '/customers',
  INVOICES: '/invoices',
  PAYMENTS: '/payments',
  PAYMENT_INITIATE: '/payments/initiate',
  REFUNDS: '/refunds',
  RECONCILIATION_DIFFS: '/reconciliation/diffs',
  RECONCILIATION_RESOLVE: '/reconciliation/resolve',
  AUDIT_LOGS: '/audit-logs',
  SYSTEM_HEALTH: '/admin/health',
};
