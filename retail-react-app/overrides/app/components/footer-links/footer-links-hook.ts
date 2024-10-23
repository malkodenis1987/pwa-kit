import { useState } from 'react';
import { useAccessToken } from '@salesforce/commerce-sdk-react';
import { useQuery } from '@tanstack/react-query';
import useMultiSite from '@salesforce/retail-react-app/app/hooks/use-multi-site';
import { DEFAULT_LOCALE } from '@salesforce/retail-react-app/app/constants';

const useFooterLinks = (assetId) => {
    const { locale } = useMultiSite();
    const { getTokenWhenReady } = useAccessToken();
    const [error, setError] = useState(null);

    const { data, isLoading } = useQuery({
        queryKey: ['footer-links', assetId, locale?.id || DEFAULT_LOCALE],
        queryFn: async () => {
            try {
                const accessToken = await getTokenWhenReady();
                const res = await fetch(`http://localhost:3000/mobify/proxy/ocapi/s/RefArchGlobal/dw/shop/v22_8/content/${assetId}?locale=${locale?.id || DEFAULT_LOCALE}`, {
                    'method': 'GET',
                    'headers': {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }

                const jsonData = await res.json();
                return jsonData;
            } catch (error) {
                setError(error.message);
            }
        }
    });

    return { data, error, isLoading };
}

export default useFooterLinks;
