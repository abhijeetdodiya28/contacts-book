document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");

    searchButton.addEventListener("click", function() {
        const searchBar = document.getElementById("searchBar");
        const filter = searchBar.value.toLowerCase();
        const rows = document.querySelectorAll("#contactTable tbody tr");

        rows.forEach(row => {
            const nameCell = row.querySelector("td:first-child");
            if (nameCell && nameCell.innerText.toLowerCase().indexOf(filter) > -1) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
});
