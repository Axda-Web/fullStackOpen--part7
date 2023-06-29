import PropTypes from 'prop-types';
import { useState, forwardRef, useImperativeHandle } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        };
    });

    return (
        <Box mb="40px">
            <Box
                display={visible ? 'none' : 'flex'}
                flexDirection="column"
                alignItems="center"
            >
                <Button variant="contained" onClick={toggleVisibility}>
                    {props.buttonLabel}
                </Button>
            </Box>
            <Box
                display={visible ? 'flex' : 'none'}
                flexDirection="column"
                alignItems="center"
                rowGap="10px"
            >
                {props.children}
                <Button onClick={toggleVisibility}>cancel</Button>
            </Box>
        </Box>
    );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
