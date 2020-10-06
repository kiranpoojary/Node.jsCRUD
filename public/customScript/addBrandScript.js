
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
    var c = document.getElementById("cat");
    var selectedCat = c.options[c.selectedIndex].text;
    if (selectedCat != "Select A Category") {
        var e = document.getElementById("brand");
        var selectedBrand = e.options[e.selectedIndex].text;
        if ((selectedBrand != "Select existing Brand/add New")) {
            var model = document.getElementById("modelName").value;
            var newBrand = document.getElementById("newBrand").value;
            if ((!model) || (selectedBrand == "Add New Brand") && (!newBrand)) {
                alert("brand/model field is empty")
                document.getElementById("confirmed").checked = false
            }
        } else {
            document.getElementById("confirmed").checked = false
            alert("Select A Brand")
        }
    } else {
        document.getElementById("confirmed").checked = false
        alert("Select A Category")
    }


}
