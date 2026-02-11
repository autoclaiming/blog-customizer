import React, { useState } from 'react';
import { ArrowButton } from './ArrowButton';

export { ArrowButton } from './ArrowButton';

export const ArrowButtonExample = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => setIsOpen(prev => !prev);

    return <ArrowButton isOpen={isOpen} onClick={handleClick} />;
};