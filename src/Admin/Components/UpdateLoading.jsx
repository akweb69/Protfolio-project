import React from 'react';

const UpdateLoading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
            <div className="flex flex-col items-center">
                {/* Spinner */}
                <div className="w-16 h-16 border-4 border-t-transparent border-accent rounded-full animate-spin shadow-[0_0_20px_rgba(255,255,255,0.6)]"></div>

                {/* Text */}
                <p className="mt-4 text-white text-lg font-semibold tracking-widest animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
};

export default UpdateLoading;
