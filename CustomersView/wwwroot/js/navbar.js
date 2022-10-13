const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");

searchBtn.onclick = () => {
    if (document.querySelector(".input-search").value.length == 0) {
        document.querySelector(".input-search").focus();
    }
    else {
        document.querySelector(".input-search").value = "";
        // do search request here
    }
}
