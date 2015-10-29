'use strict';
/**
  * стартовый модуль для загрузки через require
  * есть урл корневой папки
  * и список основных модулей для подключения
  */
requirejs.config({
  baseUrl: 'js'
});

define([
  'reviews',
  'gallery',
  'form',
  'game_demo'

], function() {

});
