// filepath: d:\GitHub\TUGabAssigments\ПМП\Дигитален часовник\alarm.js
/* Vanilla JS alarm clock with Spotify integration */
(function () {
    'use strict';

    // IMPORTANT: Replace with your own Spotify Client ID
    // You can get one from the Spotify Developer Dashboard: https://developer.spotify.com/dashboard/
    const SPOTIFY_CLIENT_ID = 'f804e0be27a443c4a0c16ef737221902';
    
    // IMPORTANT: Make sure this URI is added to your application's settings in the Spotify Developer Dashboard.
    // This is a dummy URL used to capture the auth code.
    const REDIRECT_URI = 'my-alarm-app://callback';

    /*
     * For Monaca/Cordova, you need to configure your project to handle the custom URL scheme
     * and allow navigation to Spotify. This requires two plugins:
     * - cordova-plugin-inappbrowser
     * - cordova-plugin-customurlscheme
     *
     * Add the following to your config.xml:
     *
     * 1. Add navigation access to Spotify (at the root level of config.xml):
     * <allow-navigation href="https://accounts.spotify.com/*" />
     *
     * 2. For Android (inside <platform name="android">):
     * <edit-config file="AndroidManifest.xml" target="/manifest/application/activity[@android:name='MainActivity']" mode="merge">
     *     <intent-filter>
     *         <action android:name="android.intent.action.VIEW" />
     *         <category android:name="android.intent.category.DEFAULT" />
     *         <category android:name="android.intent.category.BROWSABLE" />
     *         <data android:scheme="my-alarm-app" />
     *     </intent-filter>
     * </edit-config>
     *
     * 3. For iOS (inside <platform name="ios">):
     * <config-file parent="CFBundleURLTypes" target="*-Info.plist">
     *     <array>
     *         <dict>
     *             <key>CFBundleURLSchemes</key>
     *             <array>
     *                 <string>my-alarm-app</string>
     *             </array>
     *         </dict>
     *     </array>
     * </config-file>
     */

    let alarmTime = null;
    let alarmActive = false;
    let alarmRinging = false;
    let audio = new Audio();
    let spotifyAccessToken = null;
    let spotifyPlaybackDeviceId = null;

    function pad2(n) { return String(n).padStart(2, '0'); }

    function updateTime() {
        const now = new Date();
        const hours = pad2(now.getHours());
        const minutes = pad2(now.getMinutes());
        const seconds = pad2(now.getSeconds());

        const timeEl = document.getElementById('current-time');
        if (timeEl) timeEl.textContent = `${hours}:${minutes}:${seconds}`;

        if (alarmActive && alarmTime && !alarmRinging) {
            const currentHM = `${hours}:${minutes}`;
            if (currentHM === alarmTime) {
                triggerAlarm();
            }
        }
    }

    function showStatus(text, isError) {
        const status = document.getElementById('alarm-status');
        if (status) {
            status.textContent = text;
            status.className = isError ? 'status error' : 'status';
        } else {
            alert(text);
        }
    }

    window.setAlarm = function () {
        const inputEl = document.getElementById('alarm-time');
        if (!inputEl) return showStatus('Поле за аларма липсва', true);

        const input = inputEl.value;
        if (!input) return showStatus('Моля, въведи време', true);
        if (!/^\d{2}:\d{2}$/.test(input)) return showStatus('Невалиден формат (HH:MM)', true);

        const soundEl = document.getElementById('alarm-sound');
        const selectedSound = soundEl.value;

        if (selectedSound === 'spotify') {
            if (SPOTIFY_CLIENT_ID === 'SPOTIFY_CLIENT_ID') {
                return showStatus('Please set your own Spotify Client ID in alarm.js', true);
            }
            if (!spotifyAccessToken) {
                return showStatus('Please log in to Spotify first', true);
            }
        } else {
            audio.src = selectedSound;
            audio.load();
        }

        alarmTime = input;
        alarmActive = true;
        showStatus(`Аларма зададена за ${alarmTime}`);
    };

    window.cancelAlarm = function () {
        alarmActive = false;
        alarmTime = null;
        if (alarmRinging) stopAlarm();
        showStatus('Алармата е отменена');
    };

    function triggerAlarm() {
        alarmRinging = true;
        alarmActive = false;
        const selectedSound = document.getElementById('alarm-sound').value;

        if (selectedSound === 'spotify' && spotifyAccessToken) {
            playSpotifyMusic();
        } else {
            audio.loop = true;
            audio.play().catch(() => fallbackBeep());
        }

        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([500, 200, 500, 200, 500]);
        }

        showStatus('⏰ АЛАРМА! Натисни Стоп за да спреш', false);
        const stopBtn = document.getElementById('stop-alarm');
        if (stopBtn) stopBtn.style.display = 'inline-block';
    }

    function stopAlarm() {
        alarmRinging = false;
        const selectedSound = document.getElementById('alarm-sound').value;

        if (selectedSound === 'spotify' && spotifyAccessToken) {
            pauseSpotifyMusic();
        } else {
            try { audio.pause(); audio.currentTime = 0; } catch (e) {}
        }
        
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try { navigator.vibrate(0); } catch (e) {}
        }
        showStatus('Алармата е спряна');
        const stopBtn = document.getElementById('stop-alarm');
        if (stopBtn) stopBtn.style.display = 'none';
    }

    // --- Spotify Integration (Authorization Code Flow with PKCE for Cordova/Web) ---

    function generateRandomString(length) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    async function generateCodeChallenge(codeVerifier) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }
    
    async function exchangeCodeForToken(code) {
        const codeVerifier = localStorage.getItem('spotify_code_verifier');
        if (!codeVerifier) {
            showStatus('Error: code_verifier not found. Please try logging in again.', true);
            return;
        }

        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: SPOTIFY_CLIENT_ID,
            code_verifier: codeVerifier
        });

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body
            });

            if (!response.ok) {
                throw new Error('HTTP status ' + response.status + ' ' + await response.text());
            }

            const data = await response.json();
            spotifyAccessToken = data.access_token;
            
            showStatus('Logged in to Spotify successfully!');
            const spotifyLoginBtn = document.getElementById('spotify-login');
            if(spotifyLoginBtn) spotifyLoginBtn.style.display = 'none';
            
            // Clean the URL of auth params if in web context
            if (window.history && window.history.pushState) {
                window.history.pushState("", document.title, window.location.pathname);
            }
            
            getSpotifyDevices();

        } catch (error) {
            showStatus('Error getting access token from Spotify.', true);
            console.error('Error getting access token:', error);
        }
    }

    // This function handles the page load and checks for an auth code in the URL.
    // This is for the web browser fallback flow.
    function handleWebCallback() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            exchangeCodeForToken(code);
        } else {
            const error = params.get('error');
            if (error) {
                showStatus(`Spotify login error: ${error}`, true);
                if (window.history && window.history.pushState) {
                    window.history.pushState("", document.title, window.location.pathname);
                }
            }
        }
    }

    async function loginToSpotify() {
        const codeVerifier = generateRandomString(128);
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        localStorage.setItem('spotify_code_verifier', codeVerifier);

        const scopes = 'streaming user-modify-playback-state user-read-playback-state';
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

        if (window.cordova && window.cordova.InAppBrowser) {
            // Using InAppBrowser to open in system browser
            const browser = cordova.InAppBrowser.open(authUrl, '_system');
        } else {
            // Fallback for a standard web browser
            window.location = authUrl;
        }
    }
    
    async function getSpotifyDevices() {
        if (!spotifyAccessToken) return;
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
                headers: { 'Authorization': `Bearer ${spotifyAccessToken}` }
            });
            const data = await response.json();
            if (data.devices && data.devices.length > 0) {
                const activeDevice = data.devices.find(d => d.is_active);
                spotifyPlaybackDeviceId = activeDevice ? activeDevice.id : data.devices[0].id;
                showStatus(`Spotify ready. Active device: ${activeDevice ? activeDevice.name : data.devices[0].name}`);
            } else {
                showStatus('No active Spotify device found. Please open Spotify on one of your devices.', true);
            }
        } catch (e) {
            showStatus('Error getting Spotify devices.', true);
        }
    }

    async function playSpotifyMusic() {
        if (!spotifyPlaybackDeviceId) {
            await getSpotifyDevices(); // try to get it again
            if (!spotifyPlaybackDeviceId) {
                 return showStatus('Could not find a Spotify device to play on.', true);
            }
        }
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${spotifyPlaybackDeviceId}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${spotifyAccessToken}` }
        }).catch(e => showStatus('Error playing Spotify music.', true));
    }

    function pauseSpotifyMusic() {
         fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${spotifyPlaybackDeviceId}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${spotifyAccessToken}` }
        }).catch(e => {}); // Fail silently on stop
    }

    function fallbackBeep() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.type = 'sine';
            o.frequency.value = 880;
            g.gain.value = 0.1;
            o.connect(g);
            g.connect(ctx.destination);
            o.start();
            setTimeout(() => { o.stop(); try { ctx.close(); } catch (e) {} }, 2000);
        } catch (e) {}
    }

    // --- DOM Initialization ---
    document.addEventListener('DOMContentLoaded', function () {
        // This handles the redirect for the web browser case
        if (!window.cordova) {
            handleWebCallback();
        }

        const setBtn = document.getElementById('set-alarm');
        const cancelBtn = document.getElementById('cancel-alarm');
        const stopBtn = document.getElementById('stop-alarm');
        const soundSelect = document.getElementById('alarm-sound');
        const spotifyLoginBtn = document.getElementById('spotify-login');

        if (setBtn) setBtn.addEventListener('click', setAlarm);
        if (cancelBtn) cancelBtn.addEventListener('click', cancelAlarm);
        if (stopBtn) stopBtn.addEventListener('click', stopAlarm);
        if (spotifyLoginBtn) spotifyLoginBtn.addEventListener('click', loginToSpotify);

        if (soundSelect) {
            soundSelect.addEventListener('change', () => {
                const spotifyLoginBtn = document.getElementById('spotify-login');
                if (soundSelect.value === 'spotify' && !spotifyAccessToken) {
                    if (spotifyLoginBtn) spotifyLoginBtn.style.display = 'block';
                } else {
                    if (spotifyLoginBtn) spotifyLoginBtn.style.display = 'none';
                }
            });
        }
        
        function ready() {
            updateTime();
            setInterval(updateTime, 1000);

            // This function is called when the app is opened by a custom URL
            window.handleOpenURL = function(url) {
                if (url.startsWith(REDIRECT_URI)) {
                    try {
                        // In some cases, the URL might be wrapped in quotes, so we clean it
                        const cleanUrl = url.replace(/["']/g, "");
                        const urlObject = new URL(cleanUrl);
                        const code = urlObject.searchParams.get('code');
                        if (code) {
                            exchangeCodeForToken(code);
                        } else {
                            const error = urlObject.searchParams.get('error');
                            if (error) {
                                showStatus(`Spotify login error: ${error}`, true);
                            }
                        }
                    } catch (e) {
                        showStatus('Error handling callback URL: ' + e.message, true);
                    }
                }
            };
        }

        if (window.cordova) {
            document.addEventListener('deviceready', ready, false);
        } else {
            ready();
        }
    });
})();