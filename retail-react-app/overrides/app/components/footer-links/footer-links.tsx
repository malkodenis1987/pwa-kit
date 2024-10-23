import React from "react";
import { Box } from '@salesforce/retail-react-app/app/components/shared/ui';
import useFooterLinks from './footer-links-hook';

const FooterLinks = ({ assetId }) => {
    const { data, error, isLoading } = useFooterLinks(assetId);

    if (isLoading) {
        return <Box>Loading...</Box>;
    }

    if (error) {
        return <Box color="red">Failed to load footer links: {error}</Box>;
    }

    return (
        <Box>
            <Box dangerouslySetInnerHTML={{ __html: data?.c_body }} />
        </Box>
    );
}

export default FooterLinks;