var token = false;
//var jwt_token = localStorage.getItem('jwt_token');
//console.log(jwt_token);



function doLogin() {
    var username = $("#email").val();
    var password = $("#pwd").val();
    console.log(username, password);
    var settings = {
        "async": false,
        "url": "https://smarthealth.service.moph.go.th/phps/public/api/v3/gettoken",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Postman-Token": "e3c7615b-41b9-4e3b-b2e3-8f3e8eb28194"
        },
        "data": JSON.stringify({
            "username": username,
            "password": password
        })
    }

    $.ajax(settings).done(function (response) {
       console.log(response);
        localStorage.setItem("jwt_token", response - JSON);

    });

}