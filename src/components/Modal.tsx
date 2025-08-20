import React, {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    className?: string;
    overlayClassName?: string;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
}

const Modal: React.FC<ModalProps> = ({
                                         isOpen,
                                         onClose,
                                         children,
                                         className = '',
                                         overlayClassName = '',
                                         closeOnOverlayClick = true,
                                         closeOnEscape = true,
                                     }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Закрытие по Escape
    useEffect(() => {
        if (!closeOnEscape) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose, closeOnEscape]);

    // Блокировка скролла body
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Фокус на модальном окне
    useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.focus();
        }
    }, [isOpen]);

    // Закрытие по клику на overlay
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 rounded-2xl ${overlayClassName}`}
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            onClick={handleOverlayClick}
        >
            <div
                ref={modalRef}
                className={`relative rounded-lg shadow-lg max-w-lg w-full max-h-[90vh]  ${className}`}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );

    // Рендерим в portal
    return createPortal(modalContent, document.body);
};

export {Modal}