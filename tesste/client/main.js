import angular from 'angular';
import angularMeteor from 'angular-meteor';
import Meteor from 'meteor/meteor';


angular.module('socially', [
    angularMeteor
  ])
  .controller('PartiesListCtrl', ['$scope', function($scope) {

  	if(Meteor.isServer){
  		console.log('oh')
  	}else{
  		console.log('mag',Meteor);
  		// init();
  	}

  	$scope.teste = teste;
    var lamp = 1;

  	function init(){

  	}

   

    function teste(){
    	var message;
      if(lamp == 1){
        message = '0';
        lamp = 0;
      }
      else{
        message = '1';
        lamp = 1;
      }
    	// Meteor.Meteor.call("publishMessage",'123','123');
       Meteor.Meteor.call("publishMessage", 'topic1', message, function() {
          
       });

    }



  }]);

