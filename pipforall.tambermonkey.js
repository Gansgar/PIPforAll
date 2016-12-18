// ==UserScript==
// @name         PIP for all
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Create for every "video" element on the webpage a pip button
// @author       Georg A. Friedrich
// @match        *://*/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==

// fixes conflict issue, thanks to this post:
// http://stackoverflow.com/questions/28264871/require-jquery-to-a-safe-variable-in-tampermonkey-script-and-console/29363547#29363547
(function ($, undefined) {
  (function() {
    'use strict';

    function addPIP(video) {
        var $newDiv = $("<div></div>");
        $newDiv.append("<span>PIP</span>");

        $newDiv.css({
            backgroundColor: "rgba(0,0,0,0.4)",
            position: "absolute",
            width: 30,
            textAlign: "center",
            padding: 3,
            top: $(video).offset().top,
            left: $(video).offset().left + $(video).width() - 30 - 3*2,
            color: "#FFF",
            cursor: "pointer",
            fontFamily: "Arial",
            fontSize: "13",
            fontWeight: "bold",
            zIndex: 10000
        });

        $newDiv.attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
        $("body").append($newDiv);
        $newDiv.click(function(event) {
            console.log("pressed");
            if (video.webkitSupportsPresentationMode && typeof video.webkitSetPresentationMode === "function") {
                video.webkitSetPresentationMode( video.webkitPresentationMode === "picture-in-picture" ? "inline" : "picture-in-picture");
            }
        });
    }

    var vids = $("video");
    vids.each(function(index, video) {
        //document.getElementById("absatz").innerHTML += "<BR>" + index + ":" + video.id;
        addPIP(video);
        console.log(index + ":" + video);
    });

    $("body").on('DOMNodeInserted', "video", function(event) {
        addPIP(event.target);
        console.log(event);
    });
})();
})(window.jQuery.noConflict(true));


