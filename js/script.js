/* Author: 

*/

// revealing module pattern
var anchorChange4 = function () {

    // this will be a private property
    var config = {
        colors: ["#F63", "#CC0", "#CFF"]
    }

    // this will be a public method
    var init = function () {
        var self = this; // assign reference to current object to "self"

        // get all links on the page
        var anchors = document.getElementsByTagName("a");
        var size = anchors.length;

        for (var i = 0; i < size; i++) {
            anchors[i].color = config.colors[i];

            anchors[i].onclick = function () {
                self.changeColor(this, this.color); // this is bound to the anchor object
                return false;
            };
        }
    }

    // this will be a public method
    var changeColor = function (linkObj, newColor) {
        linkObj.style.backgroundColor = newColor;
    }

    return {
        // declare which properties and methods are supposed to be public
        init: init,
        changeColor: changeColor
    }
}();


$(function () {
    anchorChange4.init();
});























