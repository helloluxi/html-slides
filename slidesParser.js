export class MarkdownSlidesParser {
    constructor() {
        this.slides = [];
        this.currentSlide = null;
        this.currentContent = '';
        this.citeIdx = 0;
    }

    parseMarkdown(text) {
        // Reset state
        this.slides = [];
        this.currentSlide = null;
        this.currentContent = '';
        this.citeIdx = 0;
        
        text = this.preprocessText(text);
        const paras = text.split(/\r?\n(\r?\n)+/);
        for (let para of paras) {
            this.processParagraph(para);
        }
        this.closeCurrentSlide();
        return this.slides;
    }

    preprocessText(text) {
        return text
            // Handle \quote{text}{author}
            .replace(/\\quote\{([^}]*)\}\{([^}]*)\}/g, (match, text, author) => {
                return `<div class="quote-container"><p class="quote-text">${text}</p><p class="quote-author">- ${author}</p></div>`;
            })
            // Handle \centertitle{...}
            .replace(/\\centertitle\{([^}]*)\}/g, (match, content) => {
                return `<h1 style="font-size: 6rem; color: #3498db; text-align: center;">${content}</h1>`;
            })
            // Handle \subtitle{...}
            .replace(/\\subtitle\{([^}]*)\}/g, (match, content) => {
                content = content.replace(/\\\\/g, '<br>');
                return `<p class="subtitle">${content}</p>`;
            })
            // Handle \subsubtitle{...}
            .replace(/\\subsubtitle\{([^}]*)\}/g, (match, content) => {
                content = content.replace(/\\\\/g, '<br>');
                return `<p class="subsubtitle">${content}</p>`;
            })
            // Handle \today
            .replace(/\\today/g, () => {
                return `<p id="current-date" style="font-size: 2rem;"></p>`;
            })
            .replace(/\\figure\[([^\]]*)\]\{([^}]*)\}\{([^}]*)\}/g, (match, ratio, src, caption) => {
                return `<div class="figure"><img src="${src}" alt="${caption}" style="width: ${ratio * 100}%; height: auto;"><div class="figure-caption">${caption}</div></div>`;
            })
            .replace(/\\qrcode\{([^}]*)\}\{([^}]*)\}/g, (match, message, caption) => {
                try {
                    const qrId = 'qr-' + Math.random().toString(36).substr(2, 9);
                    return `<div class="figure"><div class="qr-box"><div class="qr-container" id="${qrId}" data-message="${message}"></div><div class="figure-caption">${caption}</div></div></div>`;
                } catch (error) {
                    console.error('Error generating QR code:', error);
                    return `<div class="figure"><div class="qr-box"><div class="qr-error">Error generating QR code</div><div class="figure-caption">${caption}</div></div></div>`;
                }
            });
    }

    processParagraph(para) {
        let lastListLevel = -1;
        let cachedLines = [];
        let codeBlockOpen = false;
        let codeLanguage = '';

        const closeList = () => {
            if (lastListLevel >= 0) {
                for (let i = 0; i <= lastListLevel; i++) {
                    this.currentContent += `</ul>`;
                }
                lastListLevel = -1;
            }
        };
        
        const renderCachedLines = () => {
            const joinedLines = cachedLines.join(' ').trim();
            if (joinedLines.startsWith('<') && joinedLines.endsWith('>')) {
                // Treat as raw HTML
                this.currentContent += joinedLines;
            } else if (joinedLines.length > 0) {
                this.currentContent += `<p>${joinedLines}</p>`;
            }
            cachedLines = [];
        };
        
        for (let line of para.split(/\r?\n/)) {
            let trimmedLine = line.trim();
            
            // Handle headings (slide creation)
            if (line.startsWith('# ')) {
                renderCachedLines();
                closeList();
                this.closeCurrentSlide();
                this.createTitleSlide(line.substring(2).trim());
                continue;
            } else if (line.startsWith('## ')) {
                renderCachedLines();
                closeList();
                this.closeCurrentSlide();
                this.createSlide(line.substring(3).trim());
                continue;
            } else if (line.startsWith('### ')) {
                renderCachedLines();
                closeList();
                this.currentContent += `<h3>${line.substring(4).trim()}</h3>`;
                continue;
            } else if (line.startsWith('#### ')) {
                renderCachedLines();
                closeList();
                this.currentContent += `<h4>${line.substring(5).trim()}</h4>`;
                continue;
            } else if (trimmedLine.startsWith('\\compares*')) {
                renderCachedLines();
                closeList();
                this.currentContent += `<div class="compare-table"><div class="compare-item highlight">`;
                continue;
            } else if (trimmedLine.startsWith('\\compares')) {
                renderCachedLines();
                closeList();
                this.currentContent += `<div class="compare-table"><div class="compare-item">`;
                continue;
            } else if (trimmedLine.startsWith('\\compare*')) {
                renderCachedLines();
                closeList();
                this.currentContent += `</div><div class="compare-item highlight">`;
                continue;
            } else if (trimmedLine.startsWith('\\compare')) {
                renderCachedLines();
                closeList();
                this.currentContent += `</div><div class="compare-item">`;
                continue;
            } else if (trimmedLine.match(/^\\columns(?:\[([^\]]*)\])?/)) {
                renderCachedLines();
                closeList();
                const match = trimmedLine.match(/^\\columns(?:\[([^\]]*)\])?/);
                const weights = match[1];
                if (weights) {
                    this.currentContent += `<div class="columns" data-weights="${weights}"><div class="column">`;
                } else {
                    this.currentContent += `<div class="columns"><div class="column">`;
                }
                continue;
            } else if (trimmedLine.startsWith('\\column')) {
                renderCachedLines();
                closeList();
                this.currentContent += `</div><div class="column">`;
                continue;
            } else if (trimmedLine.startsWith('\\beginrow')) {
                renderCachedLines();
                closeList();
                this.currentContent += `<div class="figure-row">`;
                continue;
            } else if (trimmedLine.startsWith('\\endrow')) {
                renderCachedLines();
                closeList();
                this.currentContent += `</div>`;
                continue;
            } else if (trimmedLine.startsWith('\\end')) {
                renderCachedLines();
                closeList();
                this.currentContent += `</div></div>`;
                continue;
            }

            // Handle lists
            if (trimmedLine.startsWith('+ ') || trimmedLine.startsWith('- ')) {
                renderCachedLines();
                let thisListLevel = Math.floor((line.match(/^ */)[0].length) / 4);
                
                if (thisListLevel < lastListLevel) {
                    for (let i = 0; i < lastListLevel - thisListLevel; i++) {
                        this.currentContent += `</ul>`;
                    }
                }
                
                if (thisListLevel > lastListLevel) {
                    for (let i = 0; i < thisListLevel - lastListLevel; i++) {
                        this.currentContent += `<ul class="itemize">`;
                    }
                }
                
                this.currentContent += `<li>${trimmedLine.substring(2)}</li>`;
                lastListLevel = thisListLevel;
                continue;
            }
            
            closeList();
            
            // Handle code blocks
            if (line.startsWith('```')) {
                renderCachedLines();
                if (codeBlockOpen) {
                    this.currentContent += `<button class="copy-button">Copy</button></code></pre>`;
                    codeBlockOpen = false;
                    codeLanguage = '';
                } else {
                    codeLanguage = trimmedLine.substring(3).trim();
                    this.currentContent += '<pre>';
                    if (codeLanguage) {
                        this.currentContent += `<div class="markdown-code-lang">${codeLanguage}</div>`;
                    }
                    this.currentContent += '<code>';
                    codeBlockOpen = true;
                }
                continue;
            }
            
            // Handle code block content
            if (codeBlockOpen) {
                this.currentContent += this.escapeHtml(line) + '\n';
                continue;
            }
            
            // Cache regular lines
            if (trimmedLine.length > 0) {
                cachedLines.push(line);
            }
        }
        
        closeList();
        renderCachedLines();
    }

    escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    createTitleSlide(title) {
        if (typeof document !== 'undefined') {
            document.title = title.trim();
        }
        
        this.currentSlide = {
            type: 'title',
            className: 'slide title-slide',
            title: title,
            content: ''
        };
        this.currentContent = '';
    }

    createSlide(title = '') {
        this.currentSlide = {
            type: 'regular',
            className: 'slide',
            title: title,
            content: ''
        };
        this.currentContent = '';
    }

    closeCurrentSlide() {
        if (this.currentSlide) {
            this.currentSlide.content = this.currentContent;
            this.slides.push(this.currentSlide);
            this.currentSlide = null;
            this.currentContent = '';
        }
    }

    initializeQRCodes(container) {
        if (typeof QRCode === 'undefined') {
            console.warn('QRCode library not loaded');
            return;
        }

        container.querySelectorAll('.qr-container').forEach(qrContainer => {
            const message = qrContainer.getAttribute('data-message');
            if (message && !qrContainer.querySelector('canvas, img')) {
                try {
                    new QRCode(qrContainer, {
                        text: message.trim(),
                        width: 300,
                        height: 300,
                        colorDark: '#000000',
                        colorLight: '#ffffff',
                        correctLevel: QRCode.CorrectLevel.H
                    });
                } catch (error) {
                    console.error('Error generating QR code:', error);
                    qrContainer.innerHTML = '<div class="qr-error">Error generating QR code</div>';
                }
            }
        });
    }

    renderToContainer(container) {
        container.innerHTML = '';
        
        this.slides.forEach(slide => {
            const slideElement = document.createElement('div');
            slideElement.className = slide.className;
            
            if (slide.type === 'title') {
                slideElement.innerHTML = `
                    <div class="slide-content">
                        <h1>${slide.title}</h1>
                        ${slide.content}
                    </div>
                `;
            } else {
                const headerHtml = slide.title ? `<div class="slide-header"><h2>${slide.title}</h2></div>` : '';
                slideElement.innerHTML = `
                    ${headerHtml}
                    <div class="slide-content">
                        ${slide.content}
                    </div>
                `;
            }
            
            container.appendChild(slideElement);
        });
        
        // Process special elements after rendering
        this.processAllSlideSpecialElements(container);
        
        return container.querySelectorAll('.slide');
    }

    processAllSlideSpecialElements(container) {
        // Process equations
        container.querySelectorAll('.equation').forEach(equation => {
            const content = equation.textContent.trim();
            if (!content.startsWith('$') && !content.endsWith('$')) {
                equation.textContent = `$${content}$`;
            }
        });

        // Process footnotes for each slide
        container.querySelectorAll('.slide').forEach(slide => {
            this.processSlideFootnotes(slide);
        });

        // Setup copy buttons
        this.setupCopyButtons(container);

        // Initialize QR codes
        this.initializeQRCodes(container);

        // Setup columns
        this.setupColumns(container);
    }

    processSlideFootnotes(slide) {
        const footnoteCites = slide.querySelectorAll('.footnote-cite');
        if (footnoteCites.length > 0) {
            let footnoteContainer = slide.querySelector('.footnote');
            if (!footnoteContainer) {
                footnoteContainer = document.createElement('div');
                footnoteContainer.className = 'footnote';
                const footnoteParagraph = document.createElement('p');
                footnoteContainer.appendChild(footnoteParagraph);
                slide.querySelector('.slide-content').appendChild(footnoteContainer);
            }

            const footnoteParagraph = footnoteContainer.querySelector('p');
            footnoteCites.forEach((cite, index) => {
                this.citeIdx++;
                const footnoteText = `[${this.citeIdx}] ${cite.textContent.trim()}`;
                cite.textContent = `[${this.citeIdx}]`;
                if (index > 0) {
                    footnoteParagraph.appendChild(document.createTextNode(' '));
                }
                footnoteParagraph.appendChild(document.createTextNode(footnoteText));
            });
        }
    }

    setupCopyButtons(container) {
        container.querySelectorAll('.copy-button').forEach(button => {
            button.addEventListener('click', async () => {
                const codeBlock = button.previousElementSibling;
                const code = codeBlock.textContent;
                
                try {
                    await navigator.clipboard.writeText(code);
                    button.textContent = 'Copied!';
                    button.classList.add('copied');
                    
                    setTimeout(() => {
                        button.textContent = 'Copy';
                        button.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy code:', err);
                    button.textContent = 'Error!';
                    
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                }
            });
        });
    }

    setupColumns(container) {
        container.querySelectorAll('.columns').forEach(columns => {
            if (columns.hasAttribute('data-weights')) {
                const weights = columns.getAttribute('data-weights').split(' ');
                columns.style.setProperty('--col-weights', weights.map(w => w).join(' '));
            } else {
                const columnCount = columns.querySelectorAll('.column').length;
                if (columnCount > 0) {
                    const weights = Array(columnCount).fill('1fr').join(' ');
                    columns.style.setProperty('--col-weights', weights);
                }
            }
        });
    }

    getSlideCount() {
        return this.slides.length;
    }

    getSlide(index) {
        return this.slides[index] || null;
    }
}

export default MarkdownSlidesParser;