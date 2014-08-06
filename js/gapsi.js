function googleApiClientReady() {
    var apiKey = 'YOUR_API_KEY';
    var youtubeId;
    $('#input-youtube').keyup(function() {
        var username = $('input[name="channelname"]').val();
        gapi.client.setApiKey(apiKey);
        gapi.client.load('youtube', 'v3', function() {
            var request = gapi.client.youtube.channels.list({
                part: 'id',
                forUsername : username
            });
            request.execute(function(response) {
                if(response.pageInfo.totalResults != 0) {
                    youtubeId = response.result.items[0].id;
                    $('.id').text(youtubeId);
                } else {
                    $('.id').text(" ");
                }
            });
        }); 
    })
    .keyup();
}
