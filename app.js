// Portuguese Newsletter Editor - Fixed JavaScript Implementation

class NewsletterEditor {
    constructor() {
        this.init();
        this.bindEvents();
        this.setupDragAndDrop();
        this.setupAutoSave();
        this.updatePreview();
        this.updateStats();
        this.setCurrentDate();
    }

    init() {
        // DOM elements
        this.editorContent = document.getElementById('editorContent');
        this.previewTitle = document.getElementById('previewTitle');
        this.previewDate = document.getElementById('previewDate');
        this.previewAuthor = document.getElementById('previewAuthor');
        this.previewBody = document.getElementById('previewBody');
        this.previewPanel = document.getElementById('previewPanel');
        
        // Form elements
        this.titleInput = document.getElementById('newsletterTitle');
        this.dateInput = document.getElementById('publishDate');
        this.authorInput = document.getElementById('author');
        this.subjectInput = document.getElementById('subject');
        this.categorySelect = document.getElementById('category');
        
        // Stats elements
        this.wordCountEl = document.getElementById('wordCount');
        this.readTimeEl = document.getElementById('readTime');
        this.readabilityEl = document.getElementById('readability');
        
        // Modals
        this.templateModal = document.getElementById('templateModal');
        this.publishModal = document.getElementById('publishModal');
        this.toastContainer = document.getElementById('toastContainer');
        
        // Editor state
        this.isDragging = false;
        this.draggedElement = null;
        this.currentTemplate = 'minimal';
        this.autoSaveInterval = null;
        this.editorHistory = [];
        this.historyIndex = -1;
        
        // Content blocks configuration
        this.blockTemplates = {
            heading: '<h2 contenteditable="true" class="content-block">Digite o seu título aqui</h2>',
            paragraph: '<p contenteditable="true" class="content-block">Digite o seu parágrafo aqui...</p>',
            image: '<div class="content-block"><img src="https://via.placeholder.com/600x300/4a90e2/ffffff?text=Clique+para+adicionar+imagem" alt="Imagem da newsletter" style="width: 100%; border-radius: 8px; cursor: pointer;"><p contenteditable="true" style="font-size: 0.9em; color: #666; margin-top: 8px; text-align: center;">Legenda da imagem</p></div>',
            quote: '<blockquote contenteditable="true" class="content-block">"Digite a sua citação aqui..."</blockquote>',
            list: '<ul class="content-block"><li contenteditable="true">Item da lista 1</li><li contenteditable="true">Item da lista 2</li><li contenteditable="true">Item da lista 3</li></ul>',
            separator: '<hr class="separator">',
            button: '<div class="content-block" style="text-align: center;"><a href="#" class="cta-button" contenteditable="true">Botão de Acção</a></div>'
        };
        
        // Templates
        this.templates = {
            minimal: {
                name: 'Minimalista',
                description: 'Design limpo e focado no conteúdo',
                content: `<h1 contenteditable="true" class="content-block">Título da Newsletter</h1>
                         <p contenteditable="true" class="content-block">Bem-vindos à nossa newsletter semanal. Este é um exemplo de texto introdutório que pode ser personalizado conforme as suas necessidades.</p>
                         <h2 contenteditable="true" class="content-block">Secção Principal</h2>
                         <p contenteditable="true" class="content-block">Aqui pode adicionar o conteúdo principal da sua newsletter. Use formatação rica para destacar informações importantes.</p>`
            },
            azulejo: {
                name: 'Azulejo',
                description: 'Inspirado nos azulejos portugueses',
                content: `<div style="background: linear-gradient(45deg, #1e3a8a 25%, transparent 25%), linear-gradient(-45deg, #1e3a8a 25%, transparent 25%); background-size: 20px 20px; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                         <h1 contenteditable="true" style="color: white; text-align: center;">Newsletter Portuguesa</h1>
                         </div>
                         <p contenteditable="true" class="content-block">Inspirada na tradição azulejar portuguesa, esta newsletter combina elegância e funcionalidade.</p>
                         <h2 contenteditable="true" class="content-block">Destaque da Semana</h2>
                         <p contenteditable="true" class="content-block">Conteúdo destacado com estilo português autêntico.</p>`
            },
            modern: {
                name: 'Moderno',
                description: 'Design contemporâneo e arrojado',
                content: `<h1 contenteditable="true" class="content-block" style="background: linear-gradient(135deg, #4a90e2, #d4744a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent; font-size: 2.5rem;">Newsletter Moderna</h1>
                         <p contenteditable="true" class="content-block" style="font-size: 1.1rem; color: #666;">Design contemporâneo para comunicação eficaz e impactante.</p>
                         <div class="content-block" style="background: linear-gradient(135deg, #f4e8d0, #e8d7c3); padding: 30px; border-radius: 15px; margin: 30px 0;">
                         <h2 contenteditable="true" style="color: #4a90e2;">Destaque Especial</h2>
                         <p contenteditable="true">Conteúdo em destaque com design moderno e apelativo.</p>
                         </div>`
            },
            classic: {
                name: 'Clássico',
                description: 'Elegância atemporal',
                content: `<div style="text-align: center; border-bottom: 3px solid #4a90e2; padding-bottom: 20px; margin-bottom: 30px;">
                         <h1 contenteditable="true" style="font-family: serif; color: #2c2c2c; font-size: 2.2rem;">Newsletter Clássica</h1>
                         <p contenteditable="true" style="font-style: italic; color: #666;">Elegância que transcende o tempo</p>
                         </div>
                         <p contenteditable="true" class="content-block">Um design clássico que nunca sai de moda, perfeito para conteúdo sofisticado e profissional.</p>
                         <blockquote contenteditable="true" class="content-block">"A elegância é a única beleza que jamais se desvanece." - Audrey Hepburn</blockquote>`
            }
        };
        
        // Initialize with first history entry
        this.editorHistory.push(this.editorContent.innerHTML);
        this.historyIndex = 0;
    }

    bindEvents() {
        // Toolbar events
        document.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleToolbarAction(e);
            });
        });

        // Header navigation
        document.getElementById('templateBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.showTemplateModal();
        });
        
        document.getElementById('previewBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.togglePreview();
        });
        
        document.getElementById('publishBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.showPublishModal();
        });

        // Modal events
        document.querySelectorAll('.modal-close').forEach(close => {
            close.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal(e.target.closest('.modal'));
            });
        });

        // Template selection
        document.querySelectorAll('.template-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectTemplate(e.currentTarget.dataset.template);
            });
        });

        // Preview device controls
        document.querySelectorAll('.preview-device').forEach(device => {
            device.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchPreviewDevice(e.target.dataset.device);
            });
        });

        // Form inputs for real-time updates
        this.titleInput.addEventListener('input', () => this.updatePreview());
        this.dateInput.addEventListener('input', () => this.updatePreview());
        this.authorInput.addEventListener('input', () => this.updatePreview());
        this.subjectInput.addEventListener('input', () => this.updatePreview());
        this.categorySelect.addEventListener('change', () => this.updatePreview());

        // Editor content changes
        this.editorContent.addEventListener('input', () => {
            this.updatePreview();
            this.updateStats();
            this.saveToHistory();
        });

        this.editorContent.addEventListener('paste', (e) => this.handlePaste(e));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Click outside modals to close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target);
            }
        });

        // Publish options
        document.querySelectorAll('.publish-option .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handlePublish(e.target.closest('.publish-option'));
            });
        });

        // Image click to upload
        this.editorContent.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                this.handleImageUpload(e.target);
            }
        });
    }

    setupDragAndDrop() {
        // Make content blocks draggable
        document.querySelectorAll('.block-item').forEach(block => {
            block.addEventListener('dragstart', (e) => this.handleDragStart(e));
            block.addEventListener('dragend', (e) => this.handleDragEnd(e));
        });

        // Setup drop zones
        this.editorContent.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.editorContent.addEventListener('drop', (e) => this.handleDrop(e));
        this.editorContent.addEventListener('dragenter', (e) => this.handleDragEnter(e));
        this.editorContent.addEventListener('dragleave', (e) => this.handleDragLeave(e));
    }

    setupAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            this.autoSave();
        }, 30000); // Auto-save every 30 seconds

        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.autoSave();
        });
    }

    setCurrentDate() {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        this.dateInput.value = formattedDate;
        this.updatePreview();
    }

    // Drag and Drop Handlers
    handleDragStart(e) {
        this.isDragging = true;
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', e.target.dataset.type);
    }

    handleDragEnd(e) {
        this.isDragging = false;
        e.target.classList.remove('dragging');
        this.draggedElement = null;
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    handleDragEnter(e) {
        e.preventDefault();
        this.editorContent.classList.add('drag-over');
    }

    handleDragLeave(e) {
        if (!this.editorContent.contains(e.relatedTarget)) {
            this.editorContent.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        this.editorContent.classList.remove('drag-over');
        
        const blockType = e.dataTransfer.getData('text/plain');
        if (blockType && this.blockTemplates[blockType]) {
            // Remove placeholder if it exists
            const placeholder = this.editorContent.querySelector('.drop-zone');
            if (placeholder) {
                placeholder.remove();
            }
            
            // Create new element
            const newElement = document.createElement('div');
            newElement.innerHTML = this.blockTemplates[blockType];
            
            // Insert at the end of editor content
            this.editorContent.appendChild(newElement.firstChild);
            
            this.updatePreview();
            this.updateStats();
            this.saveToHistory();
            this.showToast('Bloco adicionado com sucesso!', 'success');
        }
    }

    // Toolbar Actions
    handleToolbarAction(e) {
        const action = e.target.closest('.toolbar-btn').dataset.action;
        
        switch(action) {
            case 'bold':
                document.execCommand('bold', false, null);
                break;
            case 'italic':
                document.execCommand('italic', false, null);
                break;
            case 'underline':
                document.execCommand('underline', false, null);
                break;
            case 'undo':
                this.undo();
                break;
            case 'redo':
                this.redo();
                break;
            case 'paste':
                this.handlePasteAction();
                break;
            case 'clear':
                this.clearFormatting();
                break;
        }
        
        this.updatePreview();
        this.updateStats();
    }

    handlePasteAction() {
        // Focus on editor and simulate paste
        this.editorContent.focus();
        document.execCommand('paste');
    }

    handlePaste(e) {
        e.preventDefault();
        const clipboardData = e.clipboardData || window.clipboardData;
        const htmlData = clipboardData.getData('text/html');
        const textData = clipboardData.getData('text/plain');
        
        if (htmlData) {
            // Smart formatting for HTML content
            const formattedHtml = this.formatPastedHtml(htmlData);
            document.execCommand('insertHTML', false, formattedHtml);
        } else if (textData) {
            // Smart formatting for plain text
            const formattedText = this.formatPastedText(textData);
            document.execCommand('insertHTML', false, formattedText);
        }
        
        this.updatePreview();
        this.updateStats();
        this.saveToHistory();
        this.showToast('Conteúdo colado e formatado automaticamente!', 'success');
    }

    formatPastedHtml(html) {
        // Remove unwanted tags and attributes
        const cleanHtml = html
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
            .replace(/style="[^"]*"/g, '')
            .replace(/class="[^"]*"/g, '')
            .replace(/<span[^>]*>/g, '')
            .replace(/<\/span>/g, '');
        
        return `<div class="content-block">${cleanHtml}</div>`;
    }

    formatPastedText(text) {
        // Remove placeholder first
        const placeholder = this.editorContent.querySelector('.drop-zone');
        if (placeholder) {
            placeholder.remove();
        }
        
        // Auto-format plain text
        const lines = text.split('\n').filter(line => line.trim());
        let formattedText = '';
        
        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed) {
                // Check if it looks like a title (all caps, short, etc.)
                if (trimmed.length < 60 && (trimmed === trimmed.toUpperCase() || /^[A-Z]/.test(trimmed))) {
                    formattedText += `<h2 contenteditable="true" class="content-block">${trimmed}</h2>`;
                } else if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
                    formattedText += `<li contenteditable="true">${trimmed.substring(1).trim()}</li>`;
                } else {
                    formattedText += `<p contenteditable="true" class="content-block">${trimmed}</p>`;
                }
            }
        });
        
        // Wrap list items
        formattedText = formattedText.replace(/(<li[^>]*>.*?<\/li>)/g, '<ul class="content-block">$1</ul>');
        
        return formattedText;
    }

    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'b':
                    e.preventDefault();
                    document.execCommand('bold', false, null);
                    this.updatePreview();
                    break;
                case 'i':
                    e.preventDefault();
                    document.execCommand('italic', false, null);
                    this.updatePreview();
                    break;
                case 'u':
                    e.preventDefault();
                    document.execCommand('underline', false, null);
                    this.updatePreview();
                    break;
                case 'z':
                    e.preventDefault();
                    this.undo();
                    break;
                case 'y':
                    e.preventDefault();
                    this.redo();
                    break;
                case 's':
                    e.preventDefault();
                    this.autoSave();
                    this.showToast('Newsletter guardada!', 'success');
                    break;
            }
        }
    }

    // History Management
    saveToHistory() {
        const currentContent = this.editorContent.innerHTML;
        this.editorHistory = this.editorHistory.slice(0, this.historyIndex + 1);
        this.editorHistory.push(currentContent);
        this.historyIndex++;
        
        // Limit history size
        if (this.editorHistory.length > 50) {
            this.editorHistory.shift();
            this.historyIndex--;
        }
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.editorContent.innerHTML = this.editorHistory[this.historyIndex];
            this.updatePreview();
            this.updateStats();
            this.showToast('Desfeito!', 'info');
        }
    }

    redo() {
        if (this.historyIndex < this.editorHistory.length - 1) {
            this.historyIndex++;
            this.editorContent.innerHTML = this.editorHistory[this.historyIndex];
            this.updatePreview();
            this.updateStats();
            this.showToast('Refeito!', 'info');
        }
    }

    // Preview Management
    updatePreview() {
        const title = this.titleInput.value || 'Título da Newsletter';
        const date = this.dateInput.value ? this.formatDate(this.dateInput.value) : 'Hoje';
        const author = this.authorInput.value || 'Autor';
        const content = this.editorContent.innerHTML;
        
        this.previewTitle.textContent = title;
        this.previewDate.textContent = date;
        this.previewAuthor.textContent = author;
        
        // Update preview body
        if (content.includes('drop-zone') || content.trim() === '') {
            this.previewBody.innerHTML = '<p class="preview-placeholder">O conteúdo aparecerá aqui conforme edita...</p>';
        } else {
            this.previewBody.innerHTML = content;
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('pt-PT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    togglePreview() {
        const isHidden = this.previewPanel.style.display === 'none';
        this.previewPanel.style.display = isHidden ? 'block' : 'none';
        this.showToast(`Preview ${isHidden ? 'mostrado' : 'ocultado'}!`, 'info');
    }

    switchPreviewDevice(device) {
        document.querySelectorAll('.preview-device').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        const previewContent = document.getElementById('previewContent');
        previewContent.className = `preview-content ${device}`;
        this.showToast(`Visualização em ${device}`, 'info');
    }

    // Statistics
    updateStats() {
        const content = this.editorContent.innerText || this.editorContent.textContent || '';
        const words = content.trim().split(/\s+/).filter(word => word.length > 0).length;
        const readingTime = Math.max(1, Math.ceil(words / 200)); // 200 words per minute average
        
        this.wordCountEl.textContent = words;
        this.readTimeEl.textContent = `${readingTime} min`;
        
        // Simple readability assessment
        const avgWordsPerSentence = this.calculateAvgWordsPerSentence(content);
        const readability = this.assessReadability(avgWordsPerSentence);
        this.readabilityEl.textContent = readability;
    }

    calculateAvgWordsPerSentence(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        return sentences.length > 0 ? words / sentences.length : 0;
    }

    assessReadability(avgWordsPerSentence) {
        if (avgWordsPerSentence < 15) return 'Excelente';
        if (avgWordsPerSentence < 20) return 'Boa';
        if (avgWordsPerSentence < 25) return 'Razoável';
        return 'Difícil';
    }

    // Template Management
    showTemplateModal() {
        this.templateModal.classList.add('active');
    }

    selectTemplate(templateId) {
        if (this.templates[templateId]) {
            this.editorContent.innerHTML = this.templates[templateId].content;
            this.currentTemplate = templateId;
            this.updatePreview();
            this.updateStats();
            this.saveToHistory();
            this.closeModal(this.templateModal);
            this.showToast(`Template "${this.templates[templateId].name}" aplicado!`, 'success');
        }
    }

    // Modal Management
    showPublishModal() {
        this.publishModal.classList.add('active');
    }

    closeModal(modal) {
        modal.classList.remove('active');
    }

    // Publishing
    handlePublish(option) {
        const optionTitle = option.querySelector('h4').textContent;
        
        if (optionTitle.includes('Email')) {
            this.exportToEmail();
        } else if (optionTitle.includes('Web')) {
            this.generateWebVersion();
        } else if (optionTitle.includes('PDF')) {
            this.downloadPDF();
        }
        
        this.closeModal(this.publishModal);
    }

    exportToEmail() {
        const htmlContent = this.generateEmailHTML();
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter-${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showToast('HTML exportado com sucesso!', 'success');
    }

    generateWebVersion() {
        const webContent = this.generateWebHTML();
        const blob = new Blob([webContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        this.showToast('Versão web gerada!', 'success');
    }

    downloadPDF() {
        this.showToast('Funcionalidade PDF em desenvolvimento', 'info');
    }

    generateEmailHTML() {
        const title = this.titleInput.value || 'Newsletter';
        const content = this.editorContent.innerHTML;
        
        return `
<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 2px solid #4a90e2; padding-bottom: 20px; margin-bottom: 30px; }
        .content { margin-bottom: 30px; }
        .footer { text-align: center; font-size: 12px; color: #666; padding-top: 20px; border-top: 1px solid #eee; }
        h1 { color: #4a90e2; font-size: 28px; margin-bottom: 10px; }
        h2 { color: #4a90e2; font-size: 22px; margin-bottom: 15px; }
        p { margin-bottom: 15px; }
        .cta-button { background: #4a90e2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
        blockquote { border-left: 4px solid #4a90e2; padding: 15px; margin: 20px 0; background: #f9f9f9; font-style: italic; }
        img { max-width: 100%; height: auto; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${title}</h1>
            <p><strong>Data:</strong> ${this.formatDate(this.dateInput.value || new Date().toISOString().split('T')[0])}</p>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>NewsletterPT • Criado com elegância portuguesa</p>
        </div>
    </div>
</body>
</html>
        `;
    }

    generateWebHTML() {
        const title = this.titleInput.value || 'Newsletter';
        const content = this.editorContent.innerHTML;
        
        return `
<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #2c2c2c; background: #f4e8d0; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 15px; padding: 40px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 3px solid #4a90e2; padding-bottom: 30px; margin-bottom: 40px; }
        .content { margin-bottom: 40px; }
        .footer { text-align: center; font-size: 14px; color: #666; padding-top: 30px; border-top: 1px solid #eee; }
        h1 { color: #4a90e2; font-size: 2.2rem; margin-bottom: 15px; font-weight: 700; }
        h2 { color: #4a90e2; font-size: 1.8rem; margin-bottom: 20px; font-weight: 600; }
        p { margin-bottom: 20px; font-size: 1.1rem; }
        .cta-button { background: #4a90e2; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; transition: all 0.3s ease; }
        .cta-button:hover { background: #2e5a87; transform: translateY(-2px); }
        blockquote { border-left: 4px solid #4a90e2; padding: 20px; margin: 30px 0; background: #f4e8d0; border-radius: 8px; font-style: italic; }
        img { max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${title}</h1>
            <p><strong>Data:</strong> ${this.formatDate(this.dateInput.value || new Date().toISOString().split('T')[0])} • <strong>Autor:</strong> ${this.authorInput.value || 'Autor'}</p>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>NewsletterPT • Criado com elegância portuguesa</p>
        </div>
    </div>
</body>
</html>
        `;
    }

    // Image Upload
    handleImageUpload(imgElement) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    imgElement.src = event.target.result;
                    imgElement.alt = file.name;
                    this.updatePreview();
                    this.showToast('Imagem carregada com sucesso!', 'success');
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    }

    // Auto-save
    autoSave() {
        const newsletterData = {
            title: this.titleInput.value,
            date: this.dateInput.value,
            author: this.authorInput.value,
            subject: this.subjectInput.value,
            category: this.categorySelect.value,
            content: this.editorContent.innerHTML,
            template: this.currentTemplate,
            timestamp: new Date().toISOString()
        };
        
        // Note: LocalStorage is not used as per instructions
        console.log('Newsletter auto-saved:', newsletterData);
    }

    // Utility Methods
    clearFormatting() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            document.execCommand('removeFormat', false, null);
            this.updatePreview();
            this.showToast('Formatação removida!', 'info');
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span>${this.getToastIcon(type)}</span>
                <span>${message}</span>
            </div>
        `;
        
        this.toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    getToastIcon(type) {
        switch(type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return 'ℹ️';
        }
    }

    // Smart content suggestions
    suggestTitle() {
        const content = this.editorContent.innerText || '';
        const words = content.split(' ').slice(0, 20);
        const commonWords = ['a', 'o', 'de', 'da', 'do', 'e', 'em', 'para', 'com', 'que', 'é', 'um', 'uma'];
        const significantWords = words.filter(word => !commonWords.includes(word.toLowerCase()));
        
        if (significantWords.length > 0) {
            const suggestion = significantWords.slice(0, 3).join(' ');
            return suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
        }
        
        return 'Newsletter ' + new Date().toLocaleDateString('pt-PT');
    }

    generateExcerpt() {
        const content = this.editorContent.innerText || '';
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
        return sentences.length > 0 ? sentences[0].trim() + '...' : '';
    }
}

// Initialize the editor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const editor = new NewsletterEditor();
    
    // Add smart suggestions
    setInterval(() => {
        if (!editor.titleInput.value) {
            const suggestion = editor.suggestTitle();
            editor.titleInput.placeholder = `Sugestão: ${suggestion}`;
        }
    }, 5000);
    
    // Add title suggestion on double-click
    editor.titleInput.addEventListener('dblclick', () => {
        if (!editor.titleInput.value) {
            editor.titleInput.value = editor.suggestTitle();
            editor.updatePreview();
        }
    });
    
    // Add excerpt generation
    editor.subjectInput.addEventListener('dblclick', () => {
        if (!editor.subjectInput.value) {
            editor.subjectInput.value = editor.generateExcerpt();
        }
    });
    
    // Make editor available globally for debugging
    window.editor = editor;
});

// Additional CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Export for potential external use
window.NewsletterEditor = NewsletterEditor;