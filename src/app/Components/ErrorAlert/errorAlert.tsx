import React, { useEffect, useState } from 'react';
import Styles from './errorAlert.module.css';

interface ErrorAlertProps {
    message: string;
    onClose?: () => void;
    duration?: number; // milliseconds
    isVisible?: boolean;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
    message, 
    onClose, 
    duration = 3000,
    isVisible = true 
}) => {
    const [isShowing, setIsShowing] = useState(isVisible);

    useEffect(() => {
        setIsShowing(isVisible);
        
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                setIsShowing(false);
                if (onClose) onClose();
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isShowing) return null;

    return (
        <div className={Styles.alertOverlay}>
            <div className={`${Styles.alertContainer} ${Styles.slideIn}`}>
                <div className={Styles.alertContent}>
                    <div className={Styles.alertIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="currentColor"/>
                            <path d="M12 14C11.4477 14 11 13.5523 11 13V8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V13C13 13.5523 12.5523 14 12 14Z" fill="currentColor"/>
                            <path d="M12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <p className={Styles.alertMessage}>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorAlert; 