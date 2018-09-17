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
  var mICT1 = localStorage.getItem("jwt_position");
  idName.innerHTML = mICT + '(' + mICT1 + ')';
}

$(document).ready(function () {
  $(".nav-tabs a").click(function () {
    $(this).tab('show');
  });
  $('.nav-tabs a').on('shown.bs.tab', function (event) {
    var x = $(event.target).text();         // active tab
    var y = $(event.relatedTarget).text();  // previous tab
    $(".act span").text("");
    $(".prev span").text("");
  });
});

function gettoken() {
  var username = $("#email").val();
  var password = $("#pwd").val();
  console.log(username + " " + password);
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
  };

  $.ajax(settings).done(function (response) {
    console.log(response);

    if (response.jwt_token == '') {
      $("#loginStatus").text(response.status + " : " + response.message);
      $("#email").val("");
      $("#pwd").val("");
    } else {
      $("#email").val("");
      $("#pwd").val("");
      $("#loginStatus").val("");
      localStorage.setItem("jwt_token", response.jwt_token);
      localStorage.setItem("jwt_name", response.user.name + " " + response.user.last_name);
      localStorage.setItem("jwt_position", response.user.job_position);
    }
  });
};


//-------------------------------------------------------------------------------------------------------------
// 3.2 อ่านข้อมูลทั่วไป page 15.
function findperson32() {
  // var u = document.getElementById("ucID");
  var myCid = $("#ucID").val();
  if (myCid.length == 13) {
    var myData = getPerson32(myCid);
    //console.log(myData);
    showPerson32(myData);
  } else {
    alert('กรอกข้อมูล เลข 13 หลัก');
  }
};

function getPerson32(cid) {
  var result;
  var settings = {
    "async": false, // # true -> false 1
    // "crossDomain": true, // ลบทิ้ง 2
    "url": "https://smarthealth.service.moph.go.th/phps/api/person/v2/findby/cid?cid=" + cid, // #3
    "method": "GET",
    "headers": {
      "jwt-token": localStorage.getItem("jwt_token"), // #4
      // "Cache-Control": "no-cache", // #5
      // "Postman-Token": "d837f56a-df1c-4109-9495-c629fe6b685b" //#6
    }
  }

  $.ajax(settings).done(function (response) {
    //console.log(response);
    result = response; // #7
  });
  return result;
};

function showPerson32(person) {
  //console.log(person);
  var table = document.getElementById('mytable32');

  $("#tbody32").children().remove();

  for (x in person) {
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML += x;
    cell2.innerHTML += person[x];
  }
}
//-------------------------------------------------------------------------------------------------------------
// 3.3 อ่านข้อมูลที่อยู่ page 17.  // cid = 1650200002689
function findperson33() {
  var myCid = $("#ucID").val();
  if (myCid.length == 13) {
    var myData = getPerson33(myCid);
    showPerson33(myData);

    myData = getPerson331(myCid);
    showPerson331(myData);
  } else {
    alert('กรอกข้อมูล เลข 13 หลัก');
  }
};

function getPerson33(cid) {
  var result;
  var settings = {
    "async": false,
    "url": "https://smarthealth.service.moph.go.th/phps/api/address/v1/find_by_cid?cid=" + cid,
    "method": "GET",
    "headers": {
      "jwt-token": localStorage.getItem("jwt_token"),
    }
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
    result = response;
  });
  return result;
};

function showPerson33(person) {
  //console.log(person);
  var table = document.getElementById('mytable33');

  $("#tbody33").children().remove();

  for (x in person) {
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML += x;
    cell2.innerHTML += person[x];
  }
}

function getPerson331(cid) {
  var result;
  var settings = {
    "async": false,
    "url": "https://smarthealth.service.moph.go.th/phps/api/address/v1/find_by_cid_and_addresstype?cid=" + cid + "&addresstype=1",
    "method": "GET",
    "headers": {
      "jwt-token": localStorage.getItem("jwt_token"),
    }
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
    result = response;
  });
  return result;
};

function showPerson331(person) {
  //console.log(person);
  var table = document.getElementById('mytable331');

  $("#tbody331").children().remove();

  for (x in person) {
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML += x;
    cell2.innerHTML += person[x];
  }
}

//-------------------------------------------------------------------------------------------------------------
// 3.4 อ่านข้อมูลการแพ้ยา page 19. cid= 1650300068126
function findperson34() {
  // var u = document.getElementById("ucID");
  var myCid = $("#ucID").val();
  if (myCid.length == 13) {
    var myData = getPerson34(myCid);
    //console.log(myData);
    showPerson34(myData);
  } else {
    alert('กรอกข้อมูล เลข 13 หลัก');
  }
};

function getPerson34(cid) {
  //console.log(cid);
  var result;
  var settings = {
    "async": false,
    "url": "https://smarthealth.service.moph.go.th/phps/api/drugallergy/v1/find_by_cid?cid=" + cid,
    "method": "GET",
    "headers": {
      "jwt-token": localStorage.getItem("jwt_token"), // #4
    }
  }

  $.ajax(settings).done(function (response) {
    //console.log(response.data);
    result = response; // #7
  });
  return result;
};

function showPerson34(person) {
  //console.log(person);
  var table = document.getElementById('mytable34');

  $("#tbody34").children().remove();

  for (x in person.data) {
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.className = "table-danger";
    var cell1 = row.insertCell(0);
    cell1.innerHTML += "ยาตัวที่ : " + (Number(x) + 1);
    cell1.colSpan = 2


    for (y in person.data[x]) {
      var rowCount = table.rows.length;
      var row = table.insertRow(rowCount);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML += y;
      cell2.innerHTML += person.data[x][y];
    }

  }
}
//-------------------------------------------------------------------------------------------------------------
// 3.5 ข้อมูลสิทธิการรักษา จาก สปสช. (ต้องใช้ smctoken ที่ได้จาก UCAuthentication 4.x ของ สปสช.)

function findperson35() {
  var smc_code = localStorage.getItem("smc_token");

  if (smc_code == null) {
    getSMCToken()
  }

  var myCid = $("#ucID").val();
  if (myCid.length == 13) {
    var myData = getPerson35(myCid, smc_code);
    showPerson35(myData);
  } else {
    alert('กรอกข้อมูล เลข 13 หลัก');
  }
};

function getPerson35(cid, smc_token) {
  //console.log(cid);
  var result;
  var res = smc_token.split("#");
  var settings = {
    "async": false,
    "url": "https://smarthealth.service.moph.go.th/phps/api/nhsodata/v1/search_by_pid?userPersonId=" + res[0] +
      "&smctoken=" + res[1] + "&personId=" + cid,
    "method": "GET",
    "headers": {
      "jwt-token": localStorage.getItem("jwt_token"), // #4
    }
  }

  $.ajax(settings).done(function (response) {
    //console.log(response.data);
    result = response; // #7
  });
  return result;
};

function showPerson35(person) {
  //console.log(person);
  var table = document.getElementById('mytable35');

  $("#tbody35").children().remove();

  for (x in person) {
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML += x;
    cell2.innerHTML += person[x];
  }
}

function readTextFile(file) {
  var result;
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        result = allText;
      }
    }
  }
  rawFile.send(null);
  return result;
}

function getSMCToken() {
  var txtFile = readTextFile('/NHSOAuthen4.2018/nhso_token.txt');
  if (txtFile.length > 0) {
    localStorage.setItem("smc_token", txtFile);
  }
}

//-------------------------------------------------------------------------------------------------------------//
// ค้นหาข้อมูลทำเบียนราษฎร์ จากกรมการปกครอง ต้องใช้ SmartCardAgent ของ มหาดไทย

function findperson36() {

  var myCid = $("#ucID").val();
  if (myCid.length == 13) {
    var myData = getPerson36(myCid);
    showPerson36(myData);
  } else {
    alert('กรอกข้อมูล เลข 13 หลัก');
  }
};

function getPerson36(cid) {
  var result;
  var settings = {
    "async": false,
    "url": "https://smarthealth.service.moph.go.th/phps/api/00023/027/01",
    "method": "POST",
    "headers": {
      "jwt-token": localStorage.getItem("jwt_token"),
      "Cache-Control": "no-cache",
      "Postman-Token": "bdbb19f8-9914-4a3c-b9eb-dbb083871e47"
    },
    "data": cid
  }

  $.ajax(settings).done(function (response) {
    // console.log(response);
    result = response;

  });
  return result;
};

function showPerson36(person) {
  //console.log(person);
  var table = document.getElementById('mytable36');

  $("#tbody36").children().remove();

  for (y in person.data) {
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML += y;
    cell2.innerHTML += person.data[y];
  }

}

//---------------------------------------------------------------------------------------------
// ทะเบียนราษฎร์ Service 02

function findperson37() {

  var myCid = $("#ucID").val();
  if (myCid.length == 13) {
    var myData = getPerson37(myCid);
    //showPerson36(myData);
  } else {
    alert('กรอกข้อมูล เลข 13 หลัก');
  }
};

function getPerson37(cid) {
  var result;
  var settings = {
    "async": false,
    "url": "https://smarthealth.service.moph.go.th/phps/api/00023/027/03",
    "method": "POST",
    "headers": {
      "jwt-token": localStorage.getItem("jwt_token"),
      "Cache-Control": "no-cache",
      "Postman-Token": "bdbb19f8-9914-4a3c-b9eb-dbb083871e47"
    },
    "data": cid
  }
  
  $.ajax(settings).done(function (response) {
    // console.log(response);
    result = response;

  });
  return result;
};

//---------------------------------------------------------------------------------------------

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
    "url": "https://smarthealth.service.moph.go.th/phps/api/person/v2/findby/cid?cid=" + cid, // #3
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
// อ่านข้อมูลจากบัตรสมาทการ์ด
var readSmartcardBtn = $("#readSmartcardBtn");

readSmartcardBtn.click(function (event) {
  var smartcardData = readSmartcardData();
  // console.log(smartcardData);
  showSmartcardData(JSON.parse(smartcardData));
});

function readSmartcardData() {
  var result;
  var settings = {
    "async": false,
    "url": "http://localhost:8084/smartcard/data/",
    "method": "GET",
  }

  $.ajax(settings).done(function (response) {
    // console.log(response);
    result = response;
  });
  return result;
};

function showSmartcardData(smartcardData) {
  var mPic = "/JSmartCardReader1.0/picture/" + smartcardData.cid + ".jpg";
  var mAdd = smartcardData.address;
  mAdd = mAdd.split(/#/i).join(' ');
  var dThai = smartcardData.dob;

  $("#smName").text(smartcardData.prename + smartcardData.fname + ' ' + smartcardData.lname);
  $("#smDOB").text(DateThai(dThai));
  $("#smCID").text(ThaiCID(smartcardData.cid));
  $("#smAddress").text(mAdd);
  document.getElementById("smPIC").src = mPic;
  $("#ucID").val(smartcardData.cid);   // ** text use vale
};

function DateThai(strDate) {
  now = new Date();
  var thday = new Array("อาทิตย์", "จันทร์",
    "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์");
  var thmonth = new Array("มกราคม", "กุมภาพันธ์", "มีนาคม",
    "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
    "ตุลาคม", "พฤศจิกายน", "ธันวาคม");
  // return now.getDate()+ " " + thmonth[now.getMonth()]+ " " +  (0+now.getYear()+543);
  return strDate.substr(6, 2) + " " + thmonth[Number(strDate.substr(4, 2)) - 1] + " " + strDate.substr(0, 4)
};

function ThaiCID(cid) {
  return cid.substr(0, 1) + "-" + cid.substr(1, 4) + "-" + cid.substr(5, 5) + "-" + cid.substr(10, 2) + "-" + cid.substr(12, 1)
}