import React, { useState } from "react";
import { useAccessToken } from '@salesforce/commerce-sdk-react';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@salesforce/retail-react-app/app/components/shared/ui';

const FooterLinks = ({ assetId, locale = "default" }) => {
    const { getTokenWhenReady } = useAccessToken();
    const [error, setError] = useState(null);
    const { data } = useQuery({
        'queryKey': ['footer-links'],
        'queryFn': async () => {
            try {
                const accessToken = await getTokenWhenReady();
                const res = await fetch(`http://localhost:3000/mobify/proxy/ocapi/s/RefArchGlobal/dw/shop/v22_8/content/${assetId}?locale=${locale}`, {
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
    if (error) {
        return <Box color="red">Failed to load footer links: {error}</Box>;
    }
    return <Box dangerouslySetInnerHTML={{ __html: data?.c_body }} />;
}

export default FooterLinks;