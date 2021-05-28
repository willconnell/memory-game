$(document).ready (function () {
    var values = ['&#x1F30B;', '&#x1F30B;', '&#x1F353;', '&#x1F353;', '&#x1F36A;', '&#x1F36A;', '&#x1F438;', '&#x1F438;', '&#x1F98B;', '&#x1F98B;', '&#x1F3F5;', '&#x1F3F5;', '&#x1F965;', '&#x1F965;', '&#x1F980;', '&#x1F980;'];
    var tries = 0;
    var click1 = null;
    var click2 = null;
    var num_clicks = 0;

    // randomizes the value array
    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temporaryHolder = array[i];
            array[i] = array[j];
            array[j] = temporaryHolder;
        }
    }

    // converts value array to 4x4 2d array
    function convert4x4(array) {
        currentIndex = 0;
        var newArray = [[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]];
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                newArray[i][j] = array[currentIndex];
                currentIndex++;
            }
        }
        return newArray;
    }


    // determines if two items are a match
    function isMatch(click1_bid, click2_bid) {
        click1 = 'bt' + click1_bid;
        click2 = 'bt' + click2_bid;
        value1 = document.getElementById(click1).innerHTML;
        value2 = document.getElementById(click2).innerHTML;
        if (value1 == value2) {
            console.log('A MATCH!')
            document.getElementById(click1).className = 'guessed';
            document.getElementById(click2).className = 'guessed';
            $('#' + click1).fadeIn(0);
            $('#' + click2).fadeIn(0);
            // disable button
            $('#' + click1_bid).prop('disabled', true);
            $('#' + click2_bid).prop('disabled', true);
        }
    }

    
    // determines if game is over
    function isGameOver() {
        var over = true;
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                a_button = document.getElementById('bt' + i + j)
                if (a_button.className == 'unguessed') {
                    over = false;
                }
            }
        }
        if (over) {
            alert('You win! It took ' + tries + ' tries.')
        }
    }


    // shuffle values and convert to 2d array
    shuffle(values);
    values = convert4x4(values);
    console.log(values);

    // assign value for each button, and initially fadeOut values
    index = 0;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            var button_id = 'bt' + i + j;
            document.getElementById(button_id).innerHTML = values[i][j]
            index++;
            $('#' + button_id).fadeOut(0);
        }
    }

    // when button is clicked
    $("button").click(function() {
        this_id = 'bt' + $(this).attr('id');
        bid = $(this).attr('id');
            if (num_clicks < 2) {
                if (num_clicks == 0) {
                    click1 = this_id;
                    click1_bid = bid;
                    num_clicks++;
                    tries++;
                    document.getElementById('numTries').innerHTML = "Tries: " + tries;
                    // reset clicks to 0 after 3 second fadeOut()
                    $('#' + this_id).fadeIn(0).fadeOut(1500, function() {num_clicks = 0});
                } else {
                    click2 = this_id;
                    click2_bid = bid;
                    num_clicks++;
                    $('#' + this_id).fadeIn(0).fadeOut(1500);
                    isMatch(click1_bid, click2_bid);
                    isGameOver();
                }
            }
    })
});