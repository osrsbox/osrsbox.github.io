rewards = {
    15851: false,
    15848: false,
    15849: false,
    15850: false,
    15852: false,
    15846: false,
    15843: false,
    15844: false,
    15845: false,
    15847: false,
    15856: false,
    15853: false,
    15854: false,
    15855: false,
    15857: false,
    15861: false,
    15858: false,
    15859: false,
    15860: false,
    15862: false,
    20195: false,
    20186: false,
    20189: false,
    20192: false,
    20198: false,
    20180: false,
    20171: false,
    20174: false,
    20177: false,
    20183: false,
    15762: false,
    15759: false,
    15760: false,
    15761: false,
    15763: false,
    15767: false,
    15764: false,
    15765: false,
    15766: false,
    15768: false,
    16065: false,
    16066: false,
    16067: false,
    16068: false,
    16069: false,
    16016: false,
    16019: false,
    16022: false,
    16025: false,
    16028: false,
    16114: false,
    16115: false,
    16124: false,
    16125: false,
    16116: false,
    16117: false,
    16126: false,
    16127: false,
    16112: false,
    16113: false,
    16122: false,
    16123: false,
    16048: false,
    16046: false,
    16044: false,
    16047: false,
    16045: false,
    16043: false,
    15976: false,
    15974: false,
    15972: false,
    15975: false,
    15973: false,
    15971: false,
    16032: false,
    16034: false,
    16031: false,
    16033: false,
    20219: false,
    20216: false,
    20213: false,
    16141: false,
    16139: false,
    16140: false,
    15837: false,
    15873: false,
    15867: false,
    16143: false,
    16142: false,
    16144: false,
    15838: false,
    15874: false,
    15868: false,
    15781: false,
    15780: false,
    15782: false,
    15864: false,
    15779: false,
    15863: false,
    16070: false,
    16071: false,
    16072: false,
    16073: false,
    16074: false,
    16106: false,
    16107: false,
    16108: false,
    16109: false,
    15865: false,
    15866: false,
    15928: false,
    16093: false,
    15889: false,
    20168: false,
    20207: false,
    20210: false,
    20201: false,
    20204: false,
    20165: false
}

$( document ).ready(function() {
    // Build all HTML content on page load
    var easy_clue_rewards = "";
    easy_clue_rewards += '<div class="container-fluid mx-auto text-center">'
    easy_clue_rewards += '<div class="row">'
    for (var item in rewards) {
        easy_clue_rewards += '<div class="col py-2">'
        easy_clue_rewards += '<span class="osrstooltip" id="' + item + '" title="Please wait ..."><img id="' + item + '-img" class="tt-notselected" src="https://www.osrsbox.com/osrsbox-db/items-icons/' + item + '.png" alt="alt text" onclick="javascript:update_rewards(' + "'" + item + "-img')" + '"></span>';
        easy_clue_rewards += '</div>'
    }
    easy_clue_rewards += '</div>'
    easy_clue_rewards += '</div>'
    $('#easy_clue_rewards').html( easy_clue_rewards );
});


// OLD SOLUTION BELOW, USING CATEGORIES
// rewards = {
//     1 : {
//     15851: false,
//     15848: false,
//     15849: false,
//     15850: false,
//     15852: false,
//     15846: false,
//     15843: false,
//     15844: false,
//     15845: false,
//     15847: false},
//     2 : {
//     15856: false,
//     15853: false,
//     15854: false,
//     15855: false,
//     15857: false,
//     15861: false,
//     15858: false,
//     15859: false,
//     15860: false,
//     15862: false},
//     3 : {
//     20195: false,
//     20186: false,
//     20189: false,
//     20192: false,
//     20198: false,
//     20180: false,
//     20171: false,
//     20174: false,
//     20177: false,
//     20183: false},
//     4 : {
//     15762: false,
//     15759: false,
//     15760: false,
//     15761: false,
//     15763: false,
//     15767: false,
//     15764: false,
//     15765: false,
//     15766: false,
//     15768: false},
//     5: {
//     16065: false,
//     16066: false,
//     16067: false,
//     16068: false,
//     16069: false,
//     16016: false,
//     16019: false,
//     16022: false,
//     16025: false,
//     16028: false},
//     6: {
//     16114: false,
//     16115: false,
//     16124: false,
//     16125: false,
//     16116: false,
//     16117: false,
//     16126: false,
//     16127: false,
//     16112: false,
//     16113: false,
//     16122: false,
//     16123: false},
//     7: {
//     16048: false,
//     16046: false,
//     16044: false,
//     16047: false,
//     16045: false,
//     16043: false},
//     8 : {
//     15976: false,
//     15974: false,
//     15972: false,
//     15975: false,
//     15973: false,
//     15971: false},
//     9 : {
//     16032: false,
//     16034: false,
//     16031: false,
//     16033: false,
//     20219: false,
//     20216: false,
//     20213: false},
//     10 : {
//     16141: false,
//     16139: false,
//     16140: false,
//     15837: false,
//     15873: false,
//     15867: false},
//     11 : {
//     16143: false,
//     16142: false,
//     16144: false,
//     15838: false,
//     15874: false,
//     15868: false},
//     12 : {
//     15781: false,
//     15780: false,
//     15782: false,
//     15864: false,
//     15779: false,
//     15863: false},
//     13 : {
//     16070: false,
//     16071: false,
//     16072: false,
//     16073: false,
//     16074: false},
//     14 : {
//     16106: false,
//     16107: false,
//     16108: false,
//     16109: false,
//     15865: false,
//     15866: false,
//     15928: false,
//     16093: false,
//     15889: false},
//     15 : {
//     20168: false,
//     20207: false,
//     20210: false,
//     20201: false,
//     20204: false,
//     20165: false}
// }

// $( document ).ready(function() {
//     // Build all HTML content on page load
//     var theHTML = "";
//     theHTML += '<div class="container-fluid mx-auto">'
//     for (var key in rewards) {
//         console.log(key)
//         var theBlock = ""; // Reset var for each key loop
//         theBlock += '<div class="text-center">';
//         for (var item in rewards[key]) {
//             console.log(item)
//             theBlock += '<span title="Please wait ..."><img id="' + item + '-img" class="tt-notselected" src="https://www.osrsbox.com/osrsbox-db/items-icons/' + item + '.png" alt="alt text" onclick="javascript:update_rewards(' + "'" + item + "-img'," + "'" + key + "'" + ')"></span>';
//         }
//         theBlock += '</div>'
//         console.log(theBlock)
//         theHTML += theBlock;
//     }
//     theHTML += '</div>'
//     console.log(theHTML)
//     $('#theStuff').html( theHTML );
// });