let selectedElement = null;
let undoStack = [];
let redoStack = [];

document.getElementById('addTextBtn').addEventListener('click', () => {
    const textBox = document.createElement('div');
    textBox.className = 'text-box';
    textBox.contentEditable = true;
    textBox.style.fontSize = '16px';
    textBox.textContent = 'New Text';
    document.getElementById('canvas').appendChild(textBox);
    makeDraggable(textBox);
    saveState();
});

document.getElementById('undoBtn').addEventListener('click', () => {
    if (undoStack.length > 0) {
        redoStack.push(document.getElementById('canvas').innerHTML);
        document.getElementById('canvas').innerHTML = undoStack.pop();
    }
});

document.getElementById('redoBtn').addEventListener('click', () => {
    if (redoStack.length > 0) {
        undoStack.push(document.getElementById('canvas').innerHTML);
        document.getElementById('canvas').innerHTML = redoStack.pop();
    }
});

document.getElementById('fontSelect').addEventListener('change', (e) => {
    if (selectedElement) {
        selectedElement.style.fontFamily = e.target.value;
        saveState();
    }
});

document.getElementById('fontSizeInput').addEventListener('input', (e) => {
    if (selectedElement) {
        selectedElement.style.fontSize = e.target.value + 'px';
        saveState();
    }
});

document.getElementById('boldBtn').addEventListener('click', () => {
    if (selectedElement) {
        selectedElement.style.fontWeight = selectedElement.style.fontWeight === 'bold' ? 'normal' : 'bold';
        saveState();
    }
});

document.getElementById('italicBtn').addEventListener('click', () => {
    if (selectedElement) {
        selectedElement.style.fontStyle = selectedElement.style.fontStyle === 'italic' ? 'normal' : 'italic';
        saveState();
    }
});

function makeDraggable(element) {
    element.addEventListener('mousedown', (e) => {
        selectedElement = element;
        let offsetX = e.clientX - element.getBoundingClientRect().left;
        let offsetY = e.clientY - element.getBoundingClientRect().top;

        function mouseMoveHandler(e) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }

        function mouseUpHandler() {
            saveState();
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });

    element.addEventListener('click', () => {
        selectedElement = element;
    });
}

function saveState() {
    redoStack = [];
    undoStack.push(document.getElementById('canvas').innerHTML);
}

// Initialize the existing text box
makeDraggable(document.querySelector('.text-box'));
saveState();
