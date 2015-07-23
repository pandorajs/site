(function(){
  'use strict';

  function changeLang(){
    var lang = this.value;
    var canonical = this.dataset.canonical;


    location.href = '/' + canonical;
  }

  document.getElementById('mobile-lang-select').addEventListener('change', changeLang);
})();
