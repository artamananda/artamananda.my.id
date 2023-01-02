function isValid(inputField){
    if(inputField == ""){
        return false;
    }else{
        const url = 'https://sheet2api.com/v1/WlmGDOXaS8W7/db-question';
        const newRowData = {"question": inputField};
        const options = {};
        Sheet2API.write(url, options, newRowData).then(function(result){
            console.log(result);
        }, function(error){
            console.log(error);
        });
    }
    return true;
} 