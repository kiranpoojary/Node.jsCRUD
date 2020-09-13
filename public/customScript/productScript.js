function showMe(id) {
    var source = document.getElementById(id).src;
    document.getElementById("mainGrid").src = source;
}

function zoomMe() {
    //alert("hello")
    document.getElementById('mainGrid').className = "product-zoom";
}

function zoomOutMe() {
    document.getElementById('mainGrid').className = "product-gallery-featured";

}