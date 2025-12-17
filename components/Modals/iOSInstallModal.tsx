import React from 'react';

interface IOSInstallModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const IOSInstallModal: React.FC<IOSInstallModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
                <div className="bg-amber-50 p-6 text-center border-b border-amber-100">
                    <h3 className="text-xl font-bold text-amber-800 mb-2">Installa App</h3>
                    <p className="text-amber-700 text-sm">
                        Installa l'app sul tuo iPhone/iPad per un'esperienza a schermo intero.
                    </p>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex items-start space-x-4">
                        <div className="text-2xl">1️⃣</div>
                        <div>
                            <p className="text-gray-700 font-medium">Tocca il pulsante <span className="font-bold">Condividi</span></p>
                            <p className="text-xs text-gray-500">(L'icona col quadrato e la freccia in basso)</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="text-2xl">2️⃣</div>
                        <div>
                            <p className="text-gray-700 font-medium">Scorri e seleziona <span className="font-bold">"Aggiungi alla schermata Home"</span></p>
                            <p className="text-xs text-gray-500">(Potresti dover scorrere verso il basso o destra)</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
                    <button
                        onClick={onClose}
                        className="text-amber-600 font-bold py-2 px-6 rounded-full hover:bg-amber-50 transition"
                    >
                        Ho capito, chiudi
                    </button>
                </div>
            </div>
        </div>
    );
};
