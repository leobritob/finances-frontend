import { useState, useCallback } from 'react';
import Services from 'Services';
import { useDebounce } from 'use-debounce';
import { toast } from 'react-toastify';
import { history } from 'Config/Store';

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    search: '',
  });
  const [filterDebounce] = useDebounce(filter, 300);
  const [companies, setCompanies] = useState({
    total: 0,
    page: 0,
    perPage: 20,
    data: [],
  });

  const getAllCompanies = useCallback(async params => {
    try {
      setIsLoading(true);
      const response = await Services.companies.getAllCompanies(params);
      if (response.status === 200) {
        setCompanies(response.data);
      }
    } catch (e) {
      console.log('_getAllCompanies/ERROR', e.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteCompanyById = useCallback(
    async id => {
      try {
        if (!id) throw new Error('id is required');

        setIsLoading(true);

        const response = await Services.companies.destroyCompanyById(id);
        if (response.status === 204) {
          toast.success('Empresa removida com sucesso');

          getAllCompanies(filterDebounce);
        }
      } catch (e) {
        console.log('_deleteRow/ERROR', e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [getAllCompanies, filterDebounce]
  );

  const storeNewCompany = useCallback(async data => {
    try {
      const response = await Services.companies.storeCompany(data);
      if ([200, 201].includes(response.status)) {
        toast.success('Empresa cadastrada com sucesso');

        history.push('/companies');
      }
    } catch (e) {
      console.log('storeNewCompany/ERROR', e.message);
    }
  }, []);

  return {
    isLoading,
    filterDebounce,
    setFilter,
    companies,
    getAllCompanies,
    deleteCompanyById,
    storeNewCompany,
  };
};
