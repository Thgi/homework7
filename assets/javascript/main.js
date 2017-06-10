
 var config = {
    apiKey: "AIzaSyCkTyC8BmHZh1F0-IujKShCtNiL0bmut0Q",
    authDomain: "train-scheduler-c2835.firebaseapp.com",
    databaseURL: "https://train-scheduler-c2835.firebaseio.com",
    projectId: "train-scheduler-c2835",
    storageBucket: "train-scheduler-c2835.appspot.com",
    messagingSenderId: "426973834012"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  // 5)Set a variable to access the database values directly instead of having to type out firebase.database()
  var ref = firebase.database().ref('train1/');

  //3) Initialize the train variables which are referenced only in the Javascript
  var trainName = '';
  var trainDest = '';
  var trainTime = '';
  var trainFreq = '';

  // 10)function runs whenever the Firebase server has a value ref.on(.....)
  ref.on("value", function(snapshot) {
    //11) create value variable takes a snapshot of what's currently inside the Firebase server
    var value = snapshot.val();
    // 12)Gets the keys of the database. This determines how many entries are currently in the database.
    // create key with object.key value
    //check to changing value
    var keys = Object.keys(value);
    console.log(keys); // view the keys in console to confirm keys are showing up
    // 13)clears the current info in the HTML table so it can be repopulated. Otherwise, info will be repeated.
    $("#tableInfo").html('');
    // 14)runs a loop to repopulate the table on the html with the info in the Firebase database.
    for (var j=0; j < keys.length; j++){
      var k = keys[j];
      var tName = value[k].name;
      var tDest = value[k].destination;
      var tFreq = value[k].deptFreq;
      var tTime = value[k].deptTime;
      createRowEntry(tName,tDest,tFreq,tTime);
    }

  }, function (error) {
     console.log("Error: " + error.code); // 14)reports error code if input doesn't work correctly.
  });

  //1)function which runs when the submit button is clicked

  $("#submit-train").on("click", function(event) {
  //2) prevent form from trying to move to another page when button is pressed
  event.preventDefault();
  //) 4)assigns the train variables with the value inside the input boxes from the HTML id's
  trainName = $('#name').val().trim();
  trainDest = $('#dest').val().trim();
  trainTime = $('#time').val().trim();
  trainFreq = $('#freq').val().trim();
  // 6)ref.push pushes the info inside the train variables into the Firebase database.
  ref.push({
      name: trainName,
      destination: trainDest,
      deptTime: trainTime,
      deptFreq: trainFreq
});

  // 7)clears .val the info in the input boxes so you can put in new information
  $('#name').val('');
  $('#dest').val('');
  $('#time').val('');
  $('#freq').val('');

})
// 8)function which creates the specific row in the table that populates the 4 table entries based on input provided
function createRowEntry(one,two,three,four) {
  //9)places the code inside of the tbody of the html
  $("#tableInfo").prepend("<tr>" +
    "<td>" + one + "</td>" +
    "<td>" + two + "</td>" +
    "<td>" + three + "</td>" +
    "<td>" + four + "</td>" +
    "</tr>");
}

//movent.js





