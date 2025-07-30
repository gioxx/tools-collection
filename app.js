// App initialization and management
class OnlineToolsApp {
    constructor() {
        this.currentTool = 'list-generator';
        this.init();
    }

    init() {
        console.log('Initializing Online Tools App');
        this.initTheme();
        this.initNavigation();
        this.initMobileMenu();
        this.initSearch();
        this.initTools();
        
        // Set initial tool
        this.switchTool(this.currentTool);
    }

    // Theme Management
    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // Detect system preference
        const getSystemTheme = () => {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        };
        
        // Get saved theme or use system preference
        let currentTheme = localStorage.getItem('theme') || getSystemTheme();
        
        const setTheme = (theme, savePreference = true) => {
            currentTheme = theme;
            document.documentElement.setAttribute('data-color-scheme', theme);
            themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
            
            if (savePreference) {
                localStorage.setItem('theme', theme);
            }
        };

        // Set initial theme
        setTheme(currentTheme, false);
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only update if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light', false);
            }
        });
        
        themeToggle.addEventListener('click', () => {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    // Navigation Management
    initNavigation() {
        console.log('Initializing navigation');
        const toolLinks = document.querySelectorAll('.tool-link');
        console.log('Found tool links:', toolLinks.length);

        toolLinks.forEach((link, index) => {
            const toolId = link.getAttribute('data-tool');
            console.log(`Tool link ${index}: ${toolId}`);
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Clicked tool: ${toolId}`);
                this.switchTool(toolId);
            });
        });
    }

    // Mobile Menu Management
    initMobileMenu() {
        const menuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (!menuToggle || !sidebar || !overlay) return;
        
        const toggleMenu = () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            menuToggle.textContent = sidebar.classList.contains('active') ? '✕' : '☰';
        };
        
        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on a tool link
        const toolLinks = document.querySelectorAll('.tool-link');
        toolLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    menuToggle.textContent = '☰';
                }
            });
        });
    }

    switchTool(toolId) {
        console.log(`Switching to tool: ${toolId}`);
        
        // Hide all tool containers
        const allContainers = document.querySelectorAll('.tool-container');
        console.log(`Found ${allContainers.length} tool containers`);
        
        allContainers.forEach(container => {
            container.classList.remove('active');
        });

        // Show selected tool
        const selectedTool = document.getElementById(toolId);
        if (selectedTool) {
            selectedTool.classList.add('active');
            console.log(`Activated tool: ${toolId}`);
        } else {
            console.error(`Tool container not found: ${toolId}`);
        }

        // Update navigation active state
        document.querySelectorAll('.tool-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-tool="${toolId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            console.log(`Set active link: ${toolId}`);
        }

        this.currentTool = toolId;
    }

    // Search Management
    initSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            this.filterTools(e.target.value);
        });
    }

    filterTools(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        document.querySelectorAll('.tool-link').forEach(link => {
            const toolName = link.textContent.toLowerCase();
            const isVisible = !term || toolName.includes(term);
            
            if (isVisible) {
                link.classList.remove('search-hidden');
                link.style.display = '';
            } else {
                link.classList.add('search-hidden');
                link.style.display = 'none';
            }
        });

        // Handle categories
        document.querySelectorAll('.tool-category').forEach(category => {
            const visibleLinks = category.querySelectorAll('.tool-link:not(.search-hidden)');
            if (visibleLinks.length === 0 && term) {
                category.style.display = 'none';
            } else {
                category.style.display = '';
            }
        });
    }

    // Initialize all tools
    initTools() {
        console.log('Initializing tools');
        this.initListGenerator();
        this.initPasswordGenerator();
        this.initUsernameGenerator();
        this.initAddTextToLines();
        this.initConvertCase();
        this.initCountDuplicates();
        this.initDomainExtractor();
        this.initRemoveDuplicates();
        this.initRemoveLineBreaks();
        this.initRemoveLinesContaining();
        this.initEmailExtractor();
        this.initCurlBurpConverter();
        this.initIocEscape();
        this.initEmojiConverter();
    }

    // Utility function for copying to clipboard
    copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.showMessage('Copiato negli appunti!', 'success');
            }).catch(() => {
                this.fallbackCopy(text);
            });
        } else {
            this.fallbackCopy(text);
        }
    }

    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            this.showMessage('Copiato negli appunti!', 'success');
        } catch (err) {
            this.showMessage('Errore durante la copia', 'error');
        }
        document.body.removeChild(textArea);
    }

    showMessage(message, type = 'success') {
        // Remove existing messages
        document.querySelectorAll('.success-message, .error-message').forEach(msg => msg.remove());
        
        const messageEl = document.createElement('div');
        messageEl.className = `${type}-message`;
        messageEl.textContent = message;
        
        // Add to the current active tool
        const activeTool = document.querySelector('.tool-container.active');
        if (activeTool) {
            activeTool.appendChild(messageEl);
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 3000);
        }
    }

    // 1. List Generator
    initListGenerator() {
        const container = document.getElementById('list-generator');
        if (!container) return;

        const input = container.querySelector('#listInput');
        const output = container.querySelector('#listOutput');
        const formatButtons = container.querySelectorAll('[data-format]');
        const copyBtn = container.querySelector('#copyListResult');

        if (!input || !output || !copyBtn) return;

        formatButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const format = btn.getAttribute('data-format');
                const lines = input.value.split('\n').filter(line => line.trim());
                let result = '';

                switch (format) {
                    case 'numbered':
                        result = lines.map((line, i) => `${i + 1}. ${line}`).join('\n');
                        break;
                    case 'bulleted':
                        result = lines.map(line => `• ${line}`).join('\n');
                        break;
                    case 'comma':
                        result = lines.join(', ');
                        break;
                    case 'pipe':
                        result = lines.join(' | ');
                        break;
                }

                output.value = result;
            });
        });

        copyBtn.addEventListener('click', () => {
            this.copyToClipboard(output.value);
        });
    }

    // 2. Password Generator
    initPasswordGenerator() {
        const container = document.getElementById('password-generator');
        if (!container) return;

        const lengthSlider = container.querySelector('#passwordLength');
        const lengthValue = container.querySelector('#lengthValue');
        const generateBtn = container.querySelector('#generatePassword');
        const passwordOutput = container.querySelector('#generatedPassword');
        const copyBtn = container.querySelector('#copyPassword');

        if (!lengthSlider || !generateBtn || !passwordOutput || !copyBtn) return;

        lengthSlider.addEventListener('input', () => {
            if (lengthValue) lengthValue.textContent = lengthSlider.value;
        });

        generateBtn.addEventListener('click', () => {
            const length = parseInt(lengthSlider.value);
            const includeUpper = container.querySelector('#includeUppercase')?.checked || false;
            const includeLower = container.querySelector('#includeLowercase')?.checked || true;
            const includeNumbers = container.querySelector('#includeNumbers')?.checked || false;
            const includeSymbols = container.querySelector('#includeSymbols')?.checked || false;

            let charset = '';
            if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
            if (includeNumbers) charset += '0123456789';
            if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

            if (!charset) {
                this.showMessage('Seleziona almeno un tipo di carattere!', 'error');
                return;
            }

            let password = '';
            for (let i = 0; i < length; i++) {
                password += charset.charAt(Math.floor(Math.random() * charset.length));
            }

            passwordOutput.value = password;
        });

        copyBtn.addEventListener('click', () => {
            this.copyToClipboard(passwordOutput.value);
        });
    }

    // 3. Username Generator
    initUsernameGenerator() {
        const container = document.getElementById('username-generator');
        if (!container) return;

        const generateBtn = container.querySelector('#generateUsernames');
        const resultsContainer = container.querySelector('#usernameResults');
        
        if (!generateBtn || !resultsContainer) return;

        const wordLists = {
            random: ['quick', 'lazy', 'happy', 'cool', 'smart', 'brave', 'calm', 'wild'],
            tech: ['cyber', 'digital', 'code', 'pixel', 'binary', 'matrix', 'data', 'cloud'],
            fantasy: ['dragon', 'wizard', 'magic', 'crystal', 'shadow', 'flame', 'storm', 'frost'],
            cool: ['ninja', 'phantom', 'thunder', 'lightning', 'steel', 'titan', 'cosmic', 'atomic']
        };

        generateBtn.addEventListener('click', () => {
            const style = container.querySelector('#usernameStyle')?.value || 'random';
            const count = parseInt(container.querySelector('#usernameCount')?.value || 5);
            const words = wordLists[style];
            
            resultsContainer.innerHTML = '';
            
            for (let i = 0; i < count; i++) {
                const word1 = words[Math.floor(Math.random() * words.length)];
                const word2 = words[Math.floor(Math.random() * words.length)];
                const number = Math.floor(Math.random() * 1000);
                const username = `${word1}${word2}${number}`;
                
                const usernameItem = document.createElement('div');
                usernameItem.className = 'username-item';
                usernameItem.innerHTML = `
                    <span class="username-text">${username}</span>
                    <button class="btn btn--sm copy-username">Copia</button>
                `;
                
                usernameItem.querySelector('.copy-username').addEventListener('click', () => {
                    this.copyToClipboard(username);
                });
                
                resultsContainer.appendChild(usernameItem);
            }
        });
    }

    // 4. Add Text to Lines
    initAddTextToLines() {
        const container = document.getElementById('add-text-lines');
        if (!container) return;

        const originalText = container.querySelector('#originalText');
        const textToAdd = container.querySelector('#textToAdd');
        const output = container.querySelector('#addTextOutput');
        const copyBtn = container.querySelector('#copyAddTextResult');

        if (!originalText || !textToAdd || !output || !copyBtn) return;

        const updateOutput = () => {
            const lines = originalText.value.split('\n');
            const addition = textToAdd.value;
            const position = container.querySelector('input[name="position"]:checked')?.value || 'start';
            
            let result;
            if (position === 'start') {
                result = lines.map(line => addition + line).join('\n');
            } else {
                result = lines.map(line => line + addition).join('\n');
            }
            
            output.value = result;
        };

        originalText.addEventListener('input', updateOutput);
        textToAdd.addEventListener('input', updateOutput);
        container.querySelectorAll('input[name="position"]').forEach(radio => {
            radio.addEventListener('change', updateOutput);
        });

        copyBtn.addEventListener('click', () => {
            this.copyToClipboard(output.value);
        });
    }

    // 5. Convert Case
    initConvertCase() {
        const container = document.getElementById('convert-case');
        if (!container) return;

        const input = container.querySelector('#caseInput');
        const output = container.querySelector('#caseOutput');
        const caseButtons = container.querySelectorAll('[data-case]');
        const copyBtn = container.querySelector('#copyCaseResult');

        if (!input || !output || !copyBtn) return;

        caseButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const caseType = btn.getAttribute('data-case');
                let result = input.value;

                switch (caseType) {
                    case 'upper':
                        result = result.toUpperCase();
                        break;
                    case 'lower':
                        result = result.toLowerCase();
                        break;
                    case 'title':
                        result = result.replace(/\w\S*/g, txt => 
                            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
                        break;
                    case 'camel':
                        result = result.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
                            index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');
                        break;
                    case 'snake':
                        result = result.toLowerCase().replace(/\s+/g, '_');
                        break;
                    case 'constant':
                        result = result.toUpperCase().replace(/\s+/g, '_');
                        break;
                }

                output.value = result;
            });
        });

        copyBtn.addEventListener('click', () => {
            this.copyToClipboard(output.value);
        });
    }

    // Additional tool implementations (simplified for space)
    initCountDuplicates() {
        const container = document.getElementById('count-duplicates');
        if (!container) return;
        // Implementation here
    }

    initDomainExtractor() {
        const container = document.getElementById('domain-extractor');
        if (!container) return;
        // Implementation here
    }

    initRemoveDuplicates() {
        const container = document.getElementById('remove-duplicates');
        if (!container) return;
        // Implementation here
    }

    initRemoveLineBreaks() {
        const container = document.getElementById('remove-line-breaks');
        if (!container) return;
        // Implementation here
    }

    initRemoveLinesContaining() {
        const container = document.getElementById('remove-lines-containing');
        if (!container) return;
        // Implementation here
    }

    initEmailExtractor() {
        const container = document.getElementById('email-extractor');
        if (!container) return;
        // Implementation here
    }

    initCurlBurpConverter() {
        const container = document.getElementById('curl-burp-converter');
        if (!container) return;
        // Implementation here
    }

    initIocEscape() {
        const container = document.getElementById('ioc-escape');
        if (!container) return;
        // Implementation here
    }

    initEmojiConverter() {
        const container = document.getElementById('emoji-converter');
        if (!container) return;
        // Implementation here
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app');
    window.toolsApp = new OnlineToolsApp();
});