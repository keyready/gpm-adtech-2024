import { useSearchParams } from 'react-router-dom';

export function useURLParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    function addSearchParams(newParams: Record<string, string>) {
        for (const key in newParams) {
            searchParams.set(key, newParams[key]);
        }
        setSearchParams(searchParams);
    }

    function deleteSearchParams(key: string) {
        searchParams.delete(key);
        setSearchParams(searchParams);
    }

    function getSearchParams(): { param: string; value: string }[] {
        return Array.from(searchParams.entries()).map(([param, value]) => ({ param, value }));
    }

    function getParam(param: string): string | false {
        const params = Array.from(searchParams.entries()).map(([param, value]) => ({
            param,
            value,
        }));
        const thisParam = params.find((p) => p.param === param);
        if (thisParam) return thisParam.value;
        return false;
    }

    return { addSearchParams, deleteSearchParams, getSearchParams, getParam };
}
