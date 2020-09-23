function discountChange1(name, rate, visibleRow) {
    var disName = document.getElementById(name).value;
    var disRate = document.getElementById(rate).value;
    if (!disName) {
        document.getElementById(rate).value = "0";
        alert("Please first provide discount details.")
    } else {
        if (disRate == 0) {
            alert("Discount cannot be zero")
            document.getElementById(name).value = "";
            document.getElementById(rate).value = "0";
            document.getElementById(visibleRow).style.display = "none";
        } else {
            document.getElementById(visibleRow).style.display = "block";
        }
    }


}