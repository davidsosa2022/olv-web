var express = require('express');
var router = express.Router();
const database = require('../../../database');
const comPostGen = require('../../../util/CommunityPostGen');
const processHeaders = require('../../../util/authentication');

/* GET post titles. */
router.get('/', function (req, res) {
    res.send(
        '<!DOCTYPE html>\n' +
        '<html>\n' +
        '<style>\n' +
        '    table,th,td {\n' +
        '        border : 1px solid black;\n' +
        '        border-collapse: collapse;\n' +
        '    }\n' +
        '    th,td {\n' +
        '        padding: 5px;\n' +
        '    }\n' +
        '</style>\n' +
        '<body>\n' +
        '<h1>Pretendo Miiverse Demo</h1>\n' +
        '\n' +
        '<form action="" id="communitySelection">\n' +
        '</form>\n' +
        '<br>\n' +
        '<div id="Posts"></div>\n' +
        '\n' +
        '<script>\n' +
        'if (typeof wiiuBrowser !== \'undefined\' && typeof wiiuBrowser.endStartUp !== \'undefined\') {\n' +
        'wiiuBrowser.endStartUp();\n' +
        '}\n' +
        '    function getCommunities() {\n' +
        '        var xhttp;\n' +
        '        xhttp = new XMLHttpRequest();\n' +
        '        xhttp.onreadystatechange = function() {\n' +
        '            if (this.readyState === 4 && this.status === 200) {\n' +
        '                document.getElementById("communitySelection").innerHTML = this.responseText;\n' +
        '            }\n' +
        '        };\n' +
        '        xhttp.open("GET", "/v1/communities/list", true);\n' +
        '        xhttp.send();\n' +
        '    }\n' +
        '    function getPosts(str) {\n' +
        '        var xhttp;\n' +
        '        if (str === "") {\n' +
        '            document.getElementById("Posts").innerHTML = "";\n' +
        '            return;\n' +
        '        }\n' +
        '       if (str === -1) {\n' +
        '            var a = document.getElementById(\'communities\');\n' +
        '            str = a.options[a.selectedIndex].value;' +
        '            console.log(str);' +
        '        }\n' +
        '        xhttp = new XMLHttpRequest();\n' +
        '        xhttp.onreadystatechange = function() {\n' +
        '            if (this.readyState === 4 && this.status === 200) {\n' +
        '                document.getElementById("Posts").innerHTML = this.responseText;\n' +
        '            }\n' +
        '        };\n' +
        '        xhttp.open("GET", "/v1/posts?community_id=" + str + "&limit=100&format=0", true);\n' +
        '        xhttp.send();\n' +
        '    }\n' +
        'getCommunities()' +
        '</script>\n' +
        '\n' +
        '</body>\n' +
        '</html>\n'
    )
});

router.get('/admin/communities/new', function (req, res) {
    res.send(
        '<!DOCTYPE html>\n' +
        '<html>\n' +
        '<body>\n' +
        '\n' +
        '<h2>New Community Form</h2>\n' +
        '\n' +
        '<p>Fill out all the information below. Title ID\'s must be in the decimal value form, not the hex form</p>\n' +
        '\n' +
        '<form action="/v1/communities/new" enctype="multipart/form-data" target="_blank" method="post">\n' +
        '  <label for="name">Community Name:</label><br>\n' +
        '  <input type="text" id="name" name="name"><br>\n' +
        '  \n' +
        '  <label for="description">Description:</label><br>\n' +
        '  <input type="text" id="description" name="description"><br>\n' +
        '  \n' +
        '  <label for="title_ids">Title ID 1:</label><br>\n' +
        '  <input type="text" id="title_ids" name="title_ids[]"><br>\n' +
        '  \n' +
        '  <label for="title_ids">Title ID 2:</label><br>\n' +
        '  <input type="text" id="title_ids" name="title_ids[]"><br>\n' +
        '  \n' +
        '  <label for="title_ids">Title ID 3:</label><br>\n' +
        '  <input type="text" id="title_ids" name="title_ids[]"><br>\n' +
        '  \n' +
        '  <label for="icon">System Icon (B64 TGA):</label><br>\n' +
        '  <input type="text" id="icon" name="icon"><br>\n' +
        '  \n' +
        'Browser Icon<br>\n' +
        '<input type="file" id="browserIcon" accept="image/png" name="browserIcon"><br>\n' +
        '  \n' +
        '3DS Browser Banner<br>\n' +
        '<input type="file" id="CTRbrowserHeader" accept="image/png" name="CTRbrowserHeader"><br>\n' +
        'Wii U Browser Banner<br>\n' +
        '<input type="file" id="WiiUbrowserHeader" accept="image/png" name="WiiUbrowserHeader"><br>\n' +
        '  Is Recommended?\n' +
        '  <input type="radio" id="isRecomended" name="is_recommended" value="1">\n' +
        '  <label for="isRecomended">True</label>\n' +
        '  <input type="radio" id="isNotRecomended" name="is_recommended" value="0">\n' +
        '  <label for="isNotRecomended">False</label><br>\n' +
        '  \n' +
        '  Has Shop Page?  \n' +
        '  <input type="radio" id="hasShopPage" name="has_shop_page" value="1">\n' +
        '  <label for="hasShopPage">True</label>\n' +
        '  <input type="radio" id="noShopPage" name="has_shop_page" value="0">\n' +
        '  <label for="noShopPage">False</label><br>\n' +
        '  \n' +
        '  Platform  \n' +
        '  <input type="radio" id="WiiU" name="platform_ID" value="0">\n' +
        '  <label for="platform_ID">Wii U</label>\n' +
        '  <input type="radio" id="3DS" name="platform_ID" value="1">\n' +
        '  <label for="platform_ID">3DS</label>\n' +
        '  <input type="radio" id="Both" name="platform_ID" value="2">\n' +
        '  <label for="platform_ID">Both</label><br>\n' +
        '  \n' +
        '  <input type="submit" value="Submit">\n' +
        '</form>\n' +
        '\n' +
        '</body>\n' +
        '</html>\n'
    )
});

module.exports = router;