// Function to get the file path from the Python function
function getPathToFile() {
    path = eel.open_file()((r) => console.log(r));
}

function clearTerminal() {
    eel.clear_terminal()();
}

// Function to navigate to the CheatSheet page
function cheatSheet() {
    window.location.href = "CheatSheet.html";
}

// Function to navigate back to the index page
function goBack() {
    window.location.href = "index.html";
}

// Add event listener for the "Run Pslist" button
document.getElementById("pslist-btn").addEventListener("click", () => {
    // Call the Python function and display the output
    eel.run_pslist()((output) => {
        console.log(output);
        document.getElementById("file-output").innerHTML = output;
    });
});

// Add event listener for the "Run Netscan" button
document.getElementById("run-netscan-btn").addEventListener("click", () => {
    eel.run_netscan()((output) => {
        document.getElementById("file-output").innerHTML = output;
    });
});

// Add event listener for the "Run Malfind" button
document.getElementById("run-malfind-btn").addEventListener("click", () => {
    eel.run_malfind()((output) => {
        document.getElementById("file-output").innerHTML = output;
    });
});

// Function to filter table output
function filterOutput() {
    let input = document.getElementById("command-search");
    let filter = input.value.toLowerCase();
    let output = document.getElementById("file-output");
    let rows = output.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        // Start from 1 to skip header row
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
