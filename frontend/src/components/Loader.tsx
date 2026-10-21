import { memo } from "react";

export const LoadingView = memo(() => {
    return (
        <>
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
            <div style={styles.base}>
                <div style={styles.view} />
            </div>
        </>
    );
});

const styles = {
    base: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    view: {
        width: 40,
        height: 40,
        border: '4px solid #e5e7eb',
        borderTopColor: '#007AFF',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },
};