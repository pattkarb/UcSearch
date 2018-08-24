var token = false;
var x = document.getElementById("loginDiv");
var xUC = document.getElementById("UCDiv");


if (!localStorage.getItem("jwt_token")) {
    x.style.display = "block";
    xUC.style.display = "none";
} else {
    x.style.display = "none";
    xUC.style.display = "block";
    var idName = document.getElementById("myIDName");
    var mResponse = localStorage.getItem("jwt_token");
    var mICT = localStorage.getItem("jwt_name");
    var mICT1 = localStorage.getItem("jwt_job");
    idName.innerHTML = mICT + '(' + mICT1 + ')';
}

function gettoken() {
    var username = $("#email").val();
    var password = $("#pwd").val();
    // console.log(username, password);
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
        //console.log(response);
        localStorage.setItem("jwt_token", response.jwt_token);
        localStorage.setItem("jwt_name", response.user.name + ' ' + response.user.last_name);
        localStorage.setItem("jwt_job", response.user.job_position);
    });
};

function ucFind() {
    var u = document.getElementById("ucID");
    var myCid = $("#ucID").val();
    if(myCid.length ==13) {
      var myData = getPersonFromSmarthealth(myCid);
      //  console.log(myData)
    }
};

function ShowCID(cid) {
    var result;
    var mToken = localStorage.getItem('jwt_token');
    var settings = {
      "async": false,
      "url": "https://smarthealth.service.moph.go.th/phps/api/00031/009/01",
      "method": "POST",
      "headers": {
        "jwt-token": mToken,
        "Cache-Control": "no-cache",
        "Postman-Token": "936c0d78-c7b0-490d-a110-ad9ac869f63f"
      },
      "data": cid
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
      result = response;
    })
    return result
  };

  function getPersonFromSmarthealth(cid) {
    var result;
    var mtoken = localStorage.getItem('jwt_token');
    var settings = {
      "async": false, // # true -> false 1
      // "crossDomain": true, // ลบทิ้ง 2
      "url": "https://smarthealth.service.moph.go.th/phps/api/person/v2/findby/cid?cid="+cid, // #3
      "method": "GET",
      "headers": {
        "jwt-token": mtoken, // #4
        // "Cache-Control": "no-cache", // #5
        // "Postman-Token": "d837f56a-df1c-4109-9495-c629fe6b685b" //#6
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
      result = response; // #7
    });
    return result;
  }
//1659900343151