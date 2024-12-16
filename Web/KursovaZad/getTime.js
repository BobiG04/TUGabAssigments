$(document).ready(function() {
    function fetchTime() {
        $.ajax({
            url: "http://kst.tugab.bg/pis/gettimejson.php",
            method: "GET",
            dataType: "json",
            success: function(data) {
                var fullValue = data.value.split(", ");
                var time = fullValue[0];

                $("#timeDisplay").text("Time: " + time);
            },
            error: function(error) {
                console.error("Error fetching time:", error);
            }
        });
    }

    function fetchDate() {
        $.ajax({
            url: "http://kst.tugab.bg/pis/gettimejson.php",
            method: "GET",
            dataType: "json",
            success: function(data) {
                var fullValue = data.value.split(", "); 
                var date = fullValue[1]; 

                $("#dateDisplay").text("Date: " + date);
            },
            error: function(error) {
                console.error("Error fetching date:", error);
            }
        });
    }

    fetchTime();
    fetchDate();

    setInterval(fetchTime, 1000);

    setInterval(fetchDate, 86400000);
});