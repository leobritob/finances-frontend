//@flow
import { useState } from 'react';
import Services from 'Services';

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardGeneral, setDashboardGeneral] = useState({
    revenue: 0,
    expenses: 0,
    net_revenue: 0,
    investments: 0,
  });
  const [dashboardGeneralWithMonths, setDashboardGeneralWithMonths] = useState([]);
  const [dashboardGeneralInvestments, setDashboardGeneralInvestments] = useState([]);

  /**
   * Get general reports
   * @param {Object} params - params to query string
   */
  async function getDashboardGeneral(params: {}) {
    try {
      setIsLoading(true);
      const response = await Services.dashboard.getDashboardGeneral(params);
      if (response.status === 200) {
        setDashboardGeneral(response.data);
      }
    } catch (e) {
      console.error('getDashboardGeneral/ERROR', e.message);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Get general report pdf
   * @param {Object} params - params to query string
   */
  async function getDashboardGeneralPdf(params: {}) {
    try {
      setIsLoading(true);
      await Services.dashboard.getDashboardGeneralPdf(params);
    } catch (e) {
      console.error('getDashboardGeneralPdf/ERROR', e.message);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Get general report with months
   * @param {Object} params - params to query string
   */
  async function getDashboardGeneralWithMonths(params: {}) {
    try {
      setIsLoading(true);
      const response = await Services.dashboard.getDashboardGeneralWithMonths(params);
      if (response.status === 200) {
        setDashboardGeneralWithMonths(response.data);
      }
    } catch (e) {
      console.error('getDashboardGeneralWithMonths/ERROR', e.message);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Get investments reports
   * @param {Object} params - params to query string
   */
  async function getDashboardGeneralInvestments(params: {}) {
    try {
      setIsLoading(true);
      const response = await Services.dashboard.getDashboardGeneralInvestments(params);
      if (response.status === 200) {
        setDashboardGeneralInvestments(response.data);
      }
    } catch (e) {
      console.error('getDashboardGeneralInvestments/ERROR', e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    dashboardGeneral,
    dashboardGeneralWithMonths,
    dashboardGeneralInvestments,
    getDashboardGeneral,
    getDashboardGeneralPdf,
    getDashboardGeneralWithMonths,
    getDashboardGeneralInvestments,
  };
};
