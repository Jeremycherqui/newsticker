require('./widget.scss');

var feeds = [];

const QUERY = 'hightech';
const APIKEY = 'c261cfe00a4848b2b9f84fcf211f10a4';

angular.module('StarterApp', ['ngResource'])
  .controller('WidgetCtrl', function($scope, $http) {
    Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, onSettingsUpdate);
    /*
    * change data source HERE
    * newsapi.org is an api with many sources
    * $http.get('https://newsapi.org/v2/everything?sources=techcrunch&q=' + QUERY + '&apiKey=' + APIKEY)
    */
   $http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + APIKEY)
    .then(function(response) {
    //get wix param for the number of article displayed
    Wix.Styles.getStyleParams( function(styleParams) {
      $scope.quantity = styleParams.numbers._nbArticle;
    });
      articles = response.data.articles;

      articles.forEach(article => {
        if (! urlExists(article.urlToImage)) {
          article.urlToImage = "https://fr.seaicons.com/wp-content/uploads/2015/06/news-icon1.png"
        }
      });
      //Send api response sorted by date desc
      $scope.news = articles.sort(compare);
    });

    //used to show the change with the settings panel
    function onSettingsUpdate(update) {
      if (update.key === "_nbArticle") {
        $scope.quantity = update.value;
      }
      $scope.$apply();
    }
});

function compare(a,b) {
  if (a.publishedAt < b.publishedAt)
    return 1;
  if (a.publishedAt > b.publishedAt)
    return -1;
  return 0;
}

function urlExists(url) {
  var request = false;
  if (window.XMLHttpRequest) {
          request = new XMLHttpRequest;
  } else if (window.ActiveXObject) {
          request = new ActiveXObject("Microsoft.XMLHttp");
  }

  if (request) {
          request.open("GET", url);
          if (request.status == 0) { return true; }
          else return false;
  }

  return false;
}