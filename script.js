const nameInput = document.getElementById('nameInput');
const groupCount = document.getElementById('groupCount');
const generateBtn = document.getElementById('generateBtn');
const exportBtn = document.getElementById('exportBtn');
const groupList = document.getElementById('groupList');
const errorMessage = document.getElementById('errorMessage');

generateBtn.addEventListener('click', generateGroups);
exportBtn.addEventListener('click', exportToCsv);

function generateGroups() {
    const names = nameInput.value.split(',').map(name => name.trim());
    const numGroups = parseInt(groupCount.value);

    // Input validation
    if (names.length < numGroups) {
        showError('The number of names should be greater than or equal to the number of groups.');
        return;
    }

    const groups = [];

    // Shuffle the names array
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }

    // Distribute names into groups
    for (let i = 0; i < names.length; i++) {
        const groupIndex = i % numGroups;
        if (!groups[groupIndex]) {
            groups[groupIndex] = [];
        }
        groups[groupIndex].push(names[i]);
    }

    // Display the groups
    groupList.innerHTML = '';
    groups.forEach((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.textContent = `Group ${index + 1}: ${group.join(', ')}`;
        groupList.appendChild(groupDiv);
    });

    hideError();
}

// function exportToTxt() {
//     const groups = groupList.children;
//     let txt = '';

//     for (let i = 0; i < groups.length; i++) {
//         txt += groups[i].textContent + '\n';
//     }

//     const blob = new Blob([txt], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'groups.txt';
//     a.click();
//     URL.revokeObjectURL(url);
// }

function exportToCsv() {
    const groups = groupList.children;
    let csv = '';

    for (let i = 0; i < groups.length; i++) {
        const group = groups[i].textContent.split(': ')[1];
        const names = group.split(', ');

        csv += `Group ${i + 1}\n`;

        for (let j = 0; j < names.length; j++) {
            csv += `${names[j]}\n`;
        }

        csv += '\n';
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'groups.txt';
    a.click();
    URL.revokeObjectURL(url);
}


function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}