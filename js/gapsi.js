function googleApiClientReady() {
    var apiKey = 'YOUR_API_KEY',
        isLoad = false,
        username = "",
        oldUsername = "",
        youtubeId,
        request;
    gapi.client.setApiKey(apiKey);
    gapi.client.load('youtube', 'v3', function() {
        isLoad = true;
    }); 
    $('#input-youtube').keyup(function() {
        username = $('input[name="channelname"]').val();
        //call API only if input changed and API loaded
        if (isLoad && (username !== oldUsername)) {
            oldUsername = username;
            $('#thumbnail-channel').addClass("empty");
            request = gapi.client.youtube.channels.list({
                part: 'id,snippet',
                forUsername : username
            });
            request.execute(function(response) {
                if(response.pageInfo.totalResults != 0) {
                    youtubeId = response.result.items[0].id;
                    $('.id').text(youtubeId);
                    $('#thumbnail-channel').attr("src", response.result.items[0].snippet.thumbnails.default.url);
                    $('#thumbnail-channel').removeClass("empty");
                } else {
                    $('.id').text(" ");
                    $('#thumbnail-channel').attr("src", " ");
                }
            });
        }
    })
    .keyup();
}
