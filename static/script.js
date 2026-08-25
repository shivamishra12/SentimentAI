document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const tabText = document.getElementById('tab-text');
    const tabFile = document.getElementById('tab-file');
    const textInputContainer = document.getElementById('text-input-container');
    const fileInputContainer = document.getElementById('file-input-container');
    const textArea = document.getElementById('review-text');
    const fileUpload = document.getElementById('file-upload');
    const fileDropArea = document.getElementById('file-drop-area');
    const fileNameDisplay = document.getElementById('file-name-display');
    
    const analyzeBtn = document.getElementById('analyze-btn');
    const btnText = analyzeBtn.querySelector('.btn-text');
    const spinner = analyzeBtn.querySelector('.spinner');
    
    const inputSection = document.querySelector('.input-section');
    const resultSection = document.getElementById('result-section');
    const sentimentBadge = document.getElementById('sentiment-badge');
    const badgeText = sentimentBadge.querySelector('.text');
    const textLengthSpan = document.getElementById('text-length');
    const resetBtn = document.getElementById('reset-btn');

    let currentText = '';

    // Tab Switching
    tabText.addEventListener('click', () => {
        tabText.classList.add('active');
        tabFile.classList.remove('active');
        textInputContainer.classList.remove('hidden');
        fileInputContainer.classList.add('hidden');
    });

    tabFile.addEventListener('click', () => {
        tabFile.classList.add('active');
        tabText.classList.remove('active');
        fileInputContainer.classList.remove('hidden');
        textInputContainer.classList.add('hidden');
    });

    // File Upload Handling
    fileUpload.addEventListener('change', handleFileSelect);

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileDropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileDropArea.addEventListener(eventName, () => {
            fileDropArea.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileDropArea.addEventListener(eventName, () => {
            fileDropArea.classList.remove('dragover');
        }, false);
    });

    fileDropArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length) {
            fileUpload.files = files;
            handleFileSelect({ target: fileUpload });
        }
    });

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (!file) return;

        fileNameDisplay.textContent = file.name;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            currentText = event.target.result;
            // Also put it in the textarea so user can see/edit if they switch tabs
            textArea.value = currentText; 
        };
        reader.readAsText(file);
    }

    // Input Handling
    textArea.addEventListener('input', (e) => {
        currentText = e.target.value;
    });

    // Analyze Button
    analyzeBtn.addEventListener('click', async () => {
        // If we are on text tab, grab from textarea. If file tab and file uploaded, it's in currentText.
        const textToAnalyze = tabText.classList.contains('active') ? textArea.value : currentText;
        
        if (!textToAnalyze.trim()) {
            alert('Please provide some text to analyze.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ review: textToAnalyze }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            showResult(data.sentiment, textToAnalyze.length);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while analyzing the text.');
        } finally {
            setLoading(false);
        }
    });

    // Reset Button
    resetBtn.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
        sentimentBadge.className = 'sentiment-badge'; // reset classes
    });

    // Helpers
    function setLoading(isLoading) {
        analyzeBtn.disabled = isLoading;
        if (isLoading) {
            btnText.classList.add('hidden');
            spinner.classList.remove('hidden');
        } else {
            btnText.classList.remove('hidden');
            spinner.classList.add('hidden');
        }
    }

    function showResult(sentiment, length) {
        inputSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        
        sentimentBadge.className = 'sentiment-badge ' + sentiment.toLowerCase();
        
        // Capitalize first letter
        badgeText.textContent = sentiment.charAt(0).toUpperCase() + sentiment.slice(1);
        textLengthSpan.textContent = length.toLocaleString();
    }
});
