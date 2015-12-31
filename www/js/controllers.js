var db =null;
angular.module('starter.controllers', [])


.controller('ConfigCtrl', function($scope, $ionicLoading, $cordovaSQLite, $location, $ionicHistory, $ionicPlatform, $state) {
  $ionicHistory.nextViewOptions({
    disableAnimate: true, 
    disableBack: true
    });
  $ionicPlatform.ready(function(){
    $ionicLoading.show({template:"Loading ..."});
    if(window.cordova){
      window.plugins.sqlDB.copy("listappdatabase.db", function(){
          db = $cordovaSQLite.openDB("listappdatabase.db");
          $ionicLoading.hide();
          $location.push("tab/lists");
      }, function(error){

          db = $cordovaSQLite.openDB("listappdatabase.db");
          $ionicLoading.hide();
          $location.push("tab/lists");

      });
    }else{

             db = openDatabase("websql.db", "1.0", "myDatabase", 2*1024*1024);         db = openDatabase("websql.db", "1.0", "myDatabase", 4*1024*1024);
      db.transaction(function(tx){          db.transaction(function(tx){
        console.log("FSDf");
         tx.executeSql("DROP TABLE IF EXISTS listCategories");             tx.executeSql("DROP TABLE IF EXISTS listCategories");
                tx.executeSql("CREATE TABLE IF NOT EXISTS createdLists (id integer primary key, category text, name text, description text)");                    tx.executeSql("CREATE TABLE IF NOT EXISTS createdLists (id integer primary key, category text, name text, description text)");
                tx.executeSql("CREATE TABLE IF NOT EXISTS listTricks (id integer primary key, , listId integer, trickId integer)");
                tx.executeSql("CREATE TABLE IF NOT EXISTS createdTricks (id integer primary key, list integer, name text, description text, link text)");                   tx.executeSql("CREATE TABLE IF NOT EXISTS createdTricks (id integer primary key, list integer, name text, description text, link text)");
                tx.executeSql("CREATE TABLE IF NOT EXISTS listCategories (id integer primary key, name text, thumbnailLocation text, description text)");                   tx.executeSql("CREATE TABLE IF NOT EXISTS listCategories (id integer primary key, name text, thumbnailLocation text, description text)");
                tx.executeSql("INSERT INTO listCategories (name,thumbnailLocation, description) VALUES (?,?,?)", ["SkateBoarding", "../img/snowboarding.png","This is a test"]);                    tx.executeSql("INSERT INTO listCategories (name,thumbnailLocation, description) VALUES (?,?,?)", ["SkateBoarding", "../img/snowboarding.png","This is a test"]);
                tx.executeSql("INSERT INTO listCategories (name,thumbnailLocation, description) VALUES (?,?,?)", ["SnowBoarding", "../img/snowboarding.png","This is anotherTest."]);                   tx.executeSql("INSERT INTO listCategories (name,thumbnailLocation, description) VALUES (?,?,?)", ["SnowBoarding", "../img/snowboarding.png","This is anotherTest."]);
                console.log("FSDf");
      });         });
      $ionicLoading.hide();         $ionicLoading.hide();
    // $location.push("tab-lists");       // $location.push("tab-lists");
    $state.go('tab.dash',{} ,{reload:true});
    }
    
  });
})

.controller('AddCtrl', function($scope, $ionicPlatform, $cordovaSQLite) {
  $scope.tricks = [];
  $ionicPlatform.ready(function(){
    var sql = "SELECT name, description, link FROM createdTricks";
    $cordovaSQLite.execute(db, sql, []).then(function(result){
      console.log(result);
      if (result.rows.length>0){
        for(var i=0; i<result.rows.length; i++){
          $scope.tricks.push({name: result.rows[i].name, description: result.rows[i].description,link: result.rows[i].link });
          console.log( result.rows[i].name);
          console.log( result.rows[i].description);
          console.log( result.rows[i].thumbnailLocation);

        }
      }


    }, function(error){

      console.error(error);
    
    });
  });
})
.controller('AddTrickCtrl', function($scope, $cordovaSQLite, $ionicPlatform, $state) {
  $scope.addTrick = function(name,description,link){
  if (link==null) link="NULL";
  var sql = "INSERT INTO createdTricks (name, description, link) VALUES (?,?,?)";
  var result = $cordovaSQLite.execute(db, sql, [name,description, link]);
  $state.go('tab.add');
  }
})

.controller('AddDeckCtrl', function($scope, $ionicPlatform, $cordovaSQLite) {
  $scope.decks = [];
  $ionicPlatform.ready(function(){
    var sql = "SELECT name FROM createdTricks";
    $cordovaSQLite.execute(db, sql, []).then(function(result){
      console.log(result);
      if (result.rows.length>0){
        for(var i=0; i<result.rows.length; i++){
          $scope.decks.push({name: result.rows[i].name});
          console.log( result.rows[i].name);
        }
      }


    }, function(error){

      console.error(error);
    
    });
  });
})

.controller('ListsCtrl', function($scope, $ionicPlatform,$cordovaSQLite) {
  $scope.categories = [];
  $ionicPlatform.ready(function(){
    var sql = "SELECT id, name, thumbnailLocation, description FROM listCategories";
    $cordovaSQLite.execute(db, sql, []).then(function(result){
      console.log(result);
      if (result.rows.length>0){
        for(var i=0; i<result.rows.length; i++){
          $scope.categories.push({name: result.rows[i].name, thumb: result.rows[i].thumbnailLocation,description: result.rows[i].description });
          console.log( result.rows[i].name);
          console.log( result.rows[i].description);
          console.log( result.rows[i].thumbnailLocation);

        }
      }


    }, function(error){

      console.error(error);
    
    });
  });
})
.controller('TricksCtrl', function($scope) {})
.controller('GlobalCtrl', function($scope) {
})
.controller('DashCtrl', function($scope) {});
