let previousValue = null;

function getTimeASync () {
    $.ajax({
        url: "https://kst.tugab.bg/pis/gettimejson.php",
        type: "GET",
        success: function(response) {
            console.info(response);
            const currentValue = response.value;
            if (currentValue !== previousValue) {
                const [timeText, dateText] = response.value.split(", ");
                const [hours, minutes] = timeText.split(":");

                $("#time").text(`${hours}:${minutes}`);
                $("#date").text(dateText);
                previousValue = currentValue;

                setTimeout(getTimeASync, 1000);
            };
        },
        error: function(xhr, status, error) {
            console.error("Failed to fetch data. Status:", xhr.status, "Error:", error);

            setTimeout(getTimeASync, 5000);
        }
    });
}

getTimeASync();