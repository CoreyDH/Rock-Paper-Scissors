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
    var numPlayers = 2;
    var local = [];
    var dbLength = 0;

    playerDB.on('child_changed', function(snapshot) {

      getFBArrayLength(function(len) {
        if(len === numPlayers) {
          $('.rps-join').hide();
        }
      });

    });

    playerDB.on('child_added', function(snapshot) {

      var player = snapshot.val();
      sessionStorage.setItem('name', player.name);
      sessionStorage.setItem('key', snapshot.key);
      fillSeat(player);

    }, function(e) {
      console.log('error '+ e);
    });

    playerDB.on('child_removed', function(snapshot) {
      console.log(snapshot.val());
      var player = snapshot.val();
      vacateSeat(player.id);

    }, function(e) {
      console.log('error '+ e);
    });

    $('.rps-join-game').on('click', function() {

      var name = $('#rps-name').val().trim();

      if(name) {
        getFBArrayLength(function(keyLength) {
          addPlayer(name, keyLength);
        });

        $('.rps-join').hide();
      }

    });

    function fillSeat(player) {
      $('#p'+ player.id +'-waiting').hide();
      $('#p' + player.id + '-display').text(player.name);
      $('#p' + player.id + '-table').show();
    }

    function vacateSeat(playerId) {

      var $container = $('#p' + playerId + '-wrapper').siblings('.rps-wrapper');

      $container.find('.rps-waiting').show();
      $container.find('.rps-display').text('');
      $container.find('.table').hide();

    }

    function addPlayer(name, index) {
      playerDB.push({
        name: name,
        id: index,
        choice: '',
        wins: 0,
        losses: 0,
        ready: false
      });
    }

    function getFBArrayLength(callback) {
      playerDB.once('value', function(snapshot) {

        var len = 0;

        if(snapshot.val()) {
          len = Object.keys(snapshot.val()).length;
        }

        len++;
        callback(len);

      });
    }

    // When user leaves
    window.onbeforeunload = function () {

      var key = sessionStorage.getItem('key', key);
      playerDB.child(key).remove();

    };

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
