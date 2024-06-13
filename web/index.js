window.onload = function () {
    window.resizeTo(1200, 900);

    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const windowWidth = 1200;
    const windowHeight = 900;
    const left = screenWidth / 2 - windowWidth / 2;
    const top = screenHeight / 2 - windowHeight / 2;

    window.moveTo(left, top);
};

function getPathToFile() {
    path = eel.open_file()((r) => console.log(r));
}

function clearTerminal() {
    eel.clear_terminal()();
}

function cheatSheet() {
    window.location.href = "CheatSheet.html";
}

function goBack() {
    window.location.href = "index.html";
}

document.getElementById("pslist-btn").addEventListener("click", () => {
    eel.run_pslist()((output) => {
        console.log(output);
        document.getElementById("file-output").innerHTML = output;
    });
});

document.getElementById("run-netscan-btn").addEventListener("click", () => {
    eel.run_netscan()((output) => {
        document.getElementById("file-output").innerHTML = output;
    });
});

document.getElementById("run-malfind-btn").addEventListener("click", () => {
    eel.run_malfind()((output) => {
        document.getElementById("file-output").innerHTML = output;
    });
});

function filterOutput() {
    let input = document.getElementById("command-search");
    let filter = input.value.toLowerCase();
    let output = document.getElementById("file-output");
    let rows = output.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");
        let match = false;
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toLowerCase().indexOf(filter) > -1) {
                match = true;
                break;
            }
        }
        if (match) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

function clearPlaceholder(input) {
    if (input.value === input.placeholder) {
        input.value = "";
    }
}

function restorePlaceholder(input, placeholder) {
    if (input.value === "") {
        input.value = placeholder;
    }
}
