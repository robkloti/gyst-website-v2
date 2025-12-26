// Retell Voice Widget - Standalone script for voice-agent-page.html
// This file is loaded after the Retell SDK and creates the voice call button

(function() {
    'use strict';

    const AGENT_ID = 'agent_9405019d9dce5375c8059a6639';
    let retellClient;
    let isCallActive = false;

    // SVG Icons
    const micIconSVG = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
        </svg>
    `;

    const stopIconSVG = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2"/>
        </svg>
    `;

    // Create floating voice call button
    const voiceButton = document.createElement('button');
    voiceButton.id = 'retell-voice-btn';
    voiceButton.setAttribute('aria-label', 'Start voice call with GYST AI');
    voiceButton.innerHTML = `${micIconSVG}<span class="voice-btn-text">Talk to GYST AI</span>`;

    voiceButton.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 24px;
        border-radius: 50px;
        background: linear-gradient(135deg, #FFB224 0%, #FFD573 100%);
        color: #000;
        border: none;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 4px 20px rgba(255, 178, 36, 0.4);
        z-index: 9999;
        transition: all 0.3s ease;
        cursor: pointer;
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-ring {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.3); opacity: 0; }
        }
        #retell-voice-btn::before {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50px;
            background: linear-gradient(135deg, #FFB224 0%, #FFD573 100%);
            opacity: 0.5;
            animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            z-index: -1;
        }
        #retell-voice-btn.active {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }
        #retell-voice-btn.active::before {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }
        @media (max-width: 640px) {
            #retell-voice-btn .voice-btn-text { display: none; }
            #retell-voice-btn {
                width: 64px;
                height: 64px;
                padding: 0;
                justify-content: center;
                border-radius: 50%;
            }
        }
    `;
    document.head.appendChild(style);

    // Hover effects
    voiceButton.addEventListener('mouseenter', () => {
        if (!isCallActive) {
            voiceButton.style.transform = 'scale(1.05) translateY(-2px)';
            voiceButton.style.boxShadow = '0 6px 30px rgba(255, 178, 36, 0.6)';
        }
    });

    voiceButton.addEventListener('mouseleave', () => {
        if (!isCallActive) {
            voiceButton.style.transform = 'scale(1) translateY(0)';
            voiceButton.style.boxShadow = '0 4px 20px rgba(255, 178, 36, 0.4)';
        }
    });

    // Initialize Retell client
    async function initializeRetellClient() {
        try {
            if (typeof window.RetellWebClient === 'undefined') {
                console.error('RetellWebClient is not loaded. Make sure the SDK script is loaded first.');
                return;
            }

            retellClient = new window.RetellWebClient();

            retellClient.on("call_started", () => {
                console.log("Call started");
                isCallActive = true;
                voiceButton.classList.add('active');
                voiceButton.innerHTML = `${stopIconSVG}<span class="voice-btn-text">End Call</span>`;
            });

            retellClient.on("call_ended", () => {
                console.log("Call ended");
                isCallActive = false;
                voiceButton.classList.remove('active');
                voiceButton.innerHTML = `${micIconSVG}<span class="voice-btn-text">Talk to GYST AI</span>`;
            });

            retellClient.on("error", (error) => {
                console.error("Retell error:", error);
                isCallActive = false;
                voiceButton.classList.remove('active');
                voiceButton.innerHTML = `${micIconSVG}<span class="voice-btn-text">Talk to GYST AI</span>`;
                alert("Voice call error. Please try again.");
            });

            console.log("Retell client initialized successfully");
        } catch (error) {
            console.error("Failed to initialize Retell client:", error);
        }
    }

    // Create web call - calls secure backend API
    async function createWebCall() {
        try {
            const response = await fetch('/api/create-retell-call', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ agent_id: AGENT_ID })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create web call');
            }

            return await response.json();
        } catch (error) {
            console.error("Failed to create web call:", error);
            throw error;
        }
    }

    // Button click handler
    voiceButton.onclick = async () => {
        if (isCallActive) {
            retellClient.stopCall();
        } else {
            try {
                voiceButton.disabled = true;
                voiceButton.style.opacity = '0.7';

                const callData = await createWebCall();

                await retellClient.startCall({
                    accessToken: callData.access_token,
                    sampleRate: callData.sample_rate || 24000
                });

                voiceButton.disabled = false;
                voiceButton.style.opacity = '1';
            } catch (error) {
                console.error("Failed to start call:", error);
                alert("Failed to start voice call. Please try again.");
                voiceButton.disabled = false;
                voiceButton.style.opacity = '1';
            }
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Initializing Retell voice button...');
            initializeRetellClient();
            document.body.appendChild(voiceButton);
            console.log('Voice button added to page');
        });
    } else {
        console.log('Initializing Retell voice button...');
        initializeRetellClient();
        document.body.appendChild(voiceButton);
        console.log('Voice button added to page');
    }
})();
