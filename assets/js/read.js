const url = 'https://sheet2api.com/v1/WlmGDOXaS8W7/db-question';
const options = {};
Sheet2API.read(url, options).then(function(result){
    for(var i =0; i < result.length; i++){
        $('#x').append('<div id="quest'+ i +'" class="font-bold bg-gray-200 rounded-2xl p-8 my-4 w-11/12 mx-auto"><div class="font-light">'+result[i].timestamp+"</div>"+result[i].question+'</div>')
    }
}, function(error){
    console.log(error);
});