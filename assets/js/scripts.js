(function($) {
  $(function() {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBEnGoZ9YzHpaCyrbRoVnRSc6sA_0V1W1g",
      authDomain: "rock-paper-scissors-c6514.firebaseapp.com",
      databaseURL: "https://rock-paper-scissors-c6514.firebaseio.com",
      storageBucket: "rock-paper-scissors-c6514.appspot.com",
    };

    firebase.initializeApp(config);

    var fb = firebase.database().ref();
    var playerDB = firebase.database().ref('players');
    var playerArrKeys = [];
    var uid;

    firebase.auth().signInAnonymously().then(function(user) {

      uid = user.uid;
      console.log(uid);
      localStorage.setItem('uid', uid);

    });

    playerDB.on('value', function(snapshot) {

      console.log('player event hit');
      var dataObj = snapshot.val();

      if(dataObj === null) {
        addPlayers('players');
      }

      if(playerArrKeys.length !== Object.keys(dataObj).length) {
        playerArrKeys = Object.keys(dataObj);
      }

      checkSeating(dataObj);

    });

    playerDB.on('child_changed', function(snapshot) {

      console.log('player-child event hit');

      var player = snapshot.val();


    }, function(e) {
      console.log('error '+ e);
    });

    function checkSeating(player) {

      for(var i=0; i < Object.keys(player).length; i++) {

        var playa = player[playerArrKeys[i]];

        

        // if(playa.seated) {
        //
        //   // console.log(playa)
        //   $('.rps-join').eq(playa.id - 1).hide();
        //
        //   $('#p' + playa.id + '-display').text(playa.name);
        //
        //   $('#p' + playa.id + '-table').show();
        //
        // } else {
        //
        //   $('#p' + playa.id + '-join').val('').show();
        //   $('#p'+ playa.id +'-table').hide();
        //
        // }
      }
    }

    function addPlayers(ref) {

      for(var i = 1; i <= 2; i++) {

        fb.ref(ref).push({

          name: '',
          id: i,
          wins: 0,
          losses: 0,
          seated: false,
          ready: 0

        });

      }

    }

    $('.rps-join-game').on('click', function(event) {

      var name = $(event.target).siblings('input').val().trim();

      if(name) {
        playerDB.child(playerArrKeys[id]).update({ name: name, seated: true });
      }

    });

    // var rps = {
    //
    //   init: function() {
    //
    //
    //
    //   }
    //
    // };

  });
})(jQuery);
