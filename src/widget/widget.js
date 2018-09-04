require('./widget.scss');

var feeds = [];

const QUERY = 'bitcoin';
const APIKEY = '04c7eabc064d41e88780607c1248f6dd';

angular.module('StarterApp', ['ngResource'])
  .controller('WidgetCtrl', function($scope, $http) {
    Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, onSettingsUpdate);
    /*
    * change data source HERE
    * newsapi.org is an api with many sources
    */
   $http.get('https://newsapi.org/v2/everything?sources=techcrunch&q=' + QUERY + '&apiKey=' + APIKEY)
    .then(function(response) {
    //get wix param for the number of article displayed
    Wix.Styles.getStyleParams( function(styleParams) {
      $scope.quantity = styleParams.numbers._nbArticle;
    });
      //Send api response sorted by date desc
      $scope.news = response.data.articles.sort(compare);
    });

    //used to show the change with the settings panel
    function onSettingsUpdate(update) {
      $scope.showBox = true;
      if (update.key === "_nbArticle") {
        $scope.quantity = update.value;
        $scope.$apply();
      }
    }
});

function compare(a,b) {
  if (a.publishedAt < b.publishedAt)
    return 1;
  if (a.publishedAt > b.publishedAt)
    return -1;
  return 0;
}
