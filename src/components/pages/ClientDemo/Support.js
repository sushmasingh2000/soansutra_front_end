import { useState } from 'react';
import { FaGift, FaHome, FaPhone, FaPhoneAlt, FaTimes, FaVideo, FaWhatsapp } from 'react-icons/fa';
import VideoCallModal from './VideoCall';

const FloatingSupportMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleMenuClick = (text) => {
        if (text === 'Live Video Call') {
            setShowVideoModal(true);
        }
        // handle others here...
    };

    const menuItems = [
        // { icon: <FaPhoneAlt color="#ec4899" />, text: 'Talk to our Experts' },
        { icon: <FaVideo color="#000" />, text: 'Live Video Call' },
        // { icon: <FaGift color="#dc2626" />, text: 'Find The Perfect Gift' },
        // { icon: <FaHome color="#6366f1" />, text: 'Book Try At Home' },
        // { icon: <FaWhatsapp color="#22c55e" />, text: 'Chat on Whatsapp' },
    ];

    return (
        <div style={styles.container}>
            {isOpen && (
                <div style={styles.menu}>
                    {menuItems.map((item, index) => (
                        <div key={index} style={styles.menuItem}
                         onClick={() => handleMenuClick(item.text)}>
                            <span style={{ marginRight: '10px' }}>{item.icon}</span>
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            )}

            <button onClick={toggleMenu} style={styles.fab}>
                {isOpen ? <FaTimes color="#a855f7" /> : <FaPhone style={styles.icon} />}
            </button>
             <VideoCallModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} />
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    fab: {
        backgroundColor: '#3b0a55',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: "white",
        width: '22px',
        height: '22px',
    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px',
        gap: '10px',
        animation: 'fadeIn 0.3s ease-in-out',
    },
    menuItem: {
        backgroundColor: '#fff',
        color: '#333',
        padding: '10px 16px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    },

};

export default FloatingSupportMenu;
