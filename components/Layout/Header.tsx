'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePWA } from '@/hooks/usePWA';
import { IOSInstallModal } from '@/components/Modals/iOSInstallModal';

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [midiStatus, setMidiStatus] = useState<'off' | 'connecting' | 'on'>('off');
    const [midiAccess, setMidiAccess] = useState<any>(null);

    // PWA Hook
    const { canInstall, installApp, isIOS } = usePWA();
    const [showIOSModal, setShowIOSModal] = useState(false);

    const handleInstallClick = () => {
        if (isIOS) {
            setShowIOSModal(true);
        } else {
            installApp();
        }
    };

    // Auto-check MIDI permissions on mount
    useEffect(() => {
        if (typeof window !== 'undefined' && navigator.permissions) {
            navigator.permissions.query({ name: 'midi' as any }).then((result) => {
                if (result.state === 'granted') {
                    handleMIDIConnect(); // Auto-connect if allowed
                }
            });
        }
    }, []);

    const handleMIDIConnect = async () => {
        setMidiStatus('connecting');
        try {
            const access = await navigator.requestMIDIAccess();
            setMidiAccess(access);

            if (access.inputs.size > 0) {
                setMidiStatus('on');
            } else {
                setMidiStatus('on'); // Still ON if access granted
            }

            access.onstatechange = (e) => {
                // optional: update status on plug/unplug
            };
        } catch (err) {
            console.error('MIDI Access Failed', err);
            setMidiStatus('off');
        }
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <IOSInstallModal isOpen={showIOSModal} onClose={() => setShowIOSModal(false)} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Left: Logo & Nav */}
                    <div className="flex items-center gap-4 md:gap-8">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-3">
                            <Link href="/">
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500 cursor-pointer">
                                    Solfeggio
                                </span>
                            </Link>

                            {/* MOBILE ONLY: Install Button in Top Bar (Right of Logo) */}
                            {canInstall && (
                                <button
                                    onClick={handleInstallClick}
                                    className="md:hidden bg-amber-100 text-amber-700 hover:bg-amber-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors animate-pulse-slow"
                                >
                                    <span>↓ App</span>
                                </button>
                            )}
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex space-x-1">
                            {[
                                { name: 'Solfeggio Ritmico', href: '/' },
                                { name: 'Lettura Musicale', href: '/sight-reading' },
                                { name: 'Solfeggio Melodico', href: '/melodic-solfege' },
                                { name: 'Challenge', href: '/challenge' }
                            ].map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === link.href
                                        ? 'text-amber-600 bg-amber-50'
                                        : 'text-gray-600 hover:text-amber-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Right: MIDI & Mobile Menu Button */}
                    <div className="flex items-center gap-4">

                        {/* DESKTOP ONLY: Install Button (Left of MIDI) */}
                        {canInstall && (
                            <button
                                onClick={handleInstallClick}
                                className="hidden md:flex bg-amber-600 hover:bg-amber-700 text-white px-4 py-1.5 rounded-full text-sm font-bold items-center gap-2 shadow-sm transition-transform hover:scale-105"
                            >
                                <span>Scarica l'App</span>
                            </button>
                        )}

                        {/* MIDI Status Indicator */}
                        <button
                            onClick={handleMIDIConnect}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${midiStatus === 'on'
                                ? 'bg-green-50 border-green-200 text-green-700'
                                : midiStatus === 'connecting'
                                    ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
                                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <span className={`w-2 h-2 rounded-full ${midiStatus === 'on' ? 'bg-green-500' : midiStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' : 'bg-gray-400'
                                }`} />
                            {midiStatus === 'on' ? 'MIDI ON' : midiStatus === 'connecting' ? 'CONNECTING...' : 'MIDI OFF'}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-md text-gray-600 hover:text-amber-600 hover:bg-gray-100 focus:outline-none"
                        >
                            <span className="sr-only">Open menu</span>
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 shadow-lg animate-slideDown">
                    <div className="flex flex-col space-y-2">
                        {[
                            { name: 'Solfeggio Ritmico', href: '/' },
                            { name: 'Lettura Musicale', href: '/sight-reading' },
                            { name: 'Solfeggio Melodico', href: '/melodic-solfege' },
                            { name: 'Challenge', href: '/challenge' }
                        ].map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-4 py-3 rounded-lg text-base font-medium ${pathname === link.href
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* MOBILE MENU: Install Button Option */}
                        {canInstall && (
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    handleInstallClick();
                                }}
                                className="w-full text-left px-4 py-3 rounded-lg text-base font-bold bg-amber-600 text-white hover:bg-amber-700 flex items-center gap-2 mt-4 shadow-md"
                            >
                                <span>📥 Scarica l'App</span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};
