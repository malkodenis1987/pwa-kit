import React, { Component } from 'react';
import { Box } from '@chakra-ui/react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error in Component:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <Box color="red">Oooops. Something went wrong</Box>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
