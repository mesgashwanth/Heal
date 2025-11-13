// components/Layout.tsx
import React, { ReactNode } from 'react';
import { ICONS } from '../constants.tsx';
import type { Page } from '../types.ts';

const Layout: React.FC<{ page: Page, setPage: (page: Page) => void, children: ReactNode }> = ({ page, setPage, children }) => {

    // --- NavLink Sub-component ---
    const NavLink: React.FC<{
        label: string;
        icon: ReactNode;
        targetPage: Page;
    }> = ({ label, icon, targetPage }) => {
        const isActive = page === targetPage;
        return (
            <button
                onClick={() => setPage(targetPage)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors duration-150 text-lg
          ${isActive
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                    }
        `}
            >
                {icon}
                <span>{label}</span>
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
            {/* --- Header --- */}
            <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-30">
                <nav className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        {/* Logo and Title */}
                        <div className="flex items-center space-x-4">
                            {/* ⭐️ FIXED: White background for logo */}
                            <div className="p-3 bg-white rounded-full shadow-lg border border-gray-200">
                                <div className="text-indigo-600 text-2xl">
                                    {ICONS.logo}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-3xl font-bold text-indigo-600 leading-tight">
                                    HealthGest Maternity Tracker
                                </span>
                                <div className="text-base text-gray-900 font-medium mt-1">
                                    Compassionate Care for Every Mother and Child
                                </div>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex items-center space-x-2 sm:space-x-3 font-medium mt-1">
                            <NavLink label="Home" icon={ICONS.home} targetPage="HOME" />
                            <NavLink label="Patient Details" icon={ICONS.users} targetPage="PATIENT_DETAILS" />
                            <NavLink label="Ongoing Visits" icon={ICONS.clipboard} targetPage="ONGOING_PATIENTS" />
                        </div>
                    </div>
                </nav>
            </header>

            {/* --- Page Content --- */}
            <main className="flex-grow">
                {page === 'PATIENT_DETAILS' || page === 'ONGOING_PATIENTS' ? (
                    <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </div>
                ) : (
                    children // Home page has its own padding/layout
                )}
            </main>

            {/* --- Footer --- */}
            <footer className="bg-gray-900 text-gray-300 py-8">
                <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-lg font-semibold">© {new Date().getFullYear()} HealthGest Maternity Tracker | All Rights Reserved</p>
                    <p className="mt-2 text-base">Contact: +91-98765-43210 | info@healthgestmt.com</p>
                    <p className="mt-3 text-sm text-gray-400">
                        Providing compassionate care for every mother and child
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;