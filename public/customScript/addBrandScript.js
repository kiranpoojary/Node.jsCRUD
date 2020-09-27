
function createBrand() {
    var e = document.getElementById("brand");
    var selectedBrand = e.options[e.selectedIndex].text;
    if (selectedBrand == "Add New Brand") {
        document.getElementById("newBrand").value = ""
        document.getElementById("newBrand").style.display = "block"
        document.getElementById("confirmed").checked = false
    } else {
        document.getElementById("newBrand").value = selectedBrand
        document.getElementById("newBrand").style.display = "none"
        document.getElementById("confirmed").checked = false
    }
}

function inputChecker() {
    var e = document.getElementById("brand");
    var selectedBrand = e.options[e.selectedIndex].text;
    var model = document.getElementById("modelName").value;
    var newBrand = document.getElementById("newBrand").value;
    if ((selectedBrand == "Select existing Brand/add New")) {
        alert("Choose a Brand")
        document.getElementById("confirmed").checked = false
    } else {

        if ((!model) || (selectedBrand == "Add New Brand") && (!newBrand)) {
            alert("Fill all fields")
            document.getElementById("confirmed").checked = false
        }
    }
}
