// src/components/ProfileItem.tsx
import React from 'react';

interface ProfileItemProps {
    icon: React.ReactNode;
    label: string;
    value: string | number | undefined;
    tooltip?: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, label, value, tooltip }) => {
    return (
        <div
            className="flex items-center justify-between py-3 px-1 border-b border-border last:border-b-0"
            title={tooltip} // --- Used for Suggestion #4 (Tooltips) ---
        >
            <div className="flex items-center space-x-3">
                <span className="text-text-secondary">{icon}</span>
                <span className="text-sm font-medium text-text-secondary">{label}</span>
            </div>
            <span className="text-sm font-semibold text-text-primary text-right">
                {value || 'N/A'}
            </span>
        </div>
    );
};

export default ProfileItem;