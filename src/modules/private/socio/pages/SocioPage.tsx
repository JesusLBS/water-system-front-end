import React, { useEffect, useMemo, useState } from 'react';
import SocioService from '../services/socioService';
import { useSocios } from '../hooks/useSocios';
import { IndexQueryParams } from '../../../../interfaces/shared/index-params.interface';
import { SociosResponse } from '../interfaces/socio.interface';
import { ReusableStatsCards } from '../../../../shared/components/ReusableStatsCards';

const socioService = new SocioService();

const SocioPage: React.FC = () => {
    const {
        socios,
        setSocios,
        loading,
        setLoading,
        meta,
        setMeta,
        tableState,
        setTableState,
        debouncedSearch,
        setDebouncedSearch,
        openDialog,
        setOpenDialog,
    } = useSocios();
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(debouncedSearch.trim()), 500);
        return () => clearTimeout(t);
    }, [debouncedSearch]);

    const apiParams: IndexQueryParams = useMemo(() => {
        const sortEntry = tableState.sort[0];

        return {
            limit: tableState.pagination.pageSize,
            page: tableState.pagination.page + 1, // API is 1-based
            sort: sortEntry?.field ?? 'createdAt',
            direction: sortEntry?.sort ?? 'desc',
            withTrashed: tableState.withTrashed,
            search: debouncedSearch || '',
        };
    }, [tableState.pagination, tableState.sort, tableState.withTrashed, debouncedSearch]);

    useEffect(() => {
        let mounted = true;
        async function fetchUsers() {
            setLoading(true);
            try {
                const response: SociosResponse = await socioService.index(apiParams);
                if (!mounted) return;
                setSocios(response.data.rows);
                setMeta(response.data.meta);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        fetchUsers();
        return () => {
            mounted = false;
        };
    }, [apiParams]);
    return (
        <div >
            <ReusableStatsCards meta={meta} label="Socios" />
        </div>
    );
};

export default SocioPage;
