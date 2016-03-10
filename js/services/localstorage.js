/**
The MIT License (MIT)

Copyright (c) 2015 Jozef Butko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * Service for complex localStorage functionality
 *
 * @category  factory
 * @author    Jozef Butko
 * @example   Inject LocalStorage as the dependency and then use it like this:
 *
 * var data = { property: 'name'};
 * // set, get, remove, removeAll and list localStorage values
 * LocalStorage.set('obj', data);
 * LocalStorage.get('obj');
 * LocalStorage.update('obj', data);
 * LocalStorage.remove('obj');
 * LocalStorage.removeAll();
 * LocalStorage.list();
 *
 * @version   1.0
 *
 */

angular
      .module('scroller')
      .factory('LocalStorage', [
        '$window', '$rootScope', LocalStorageService
      ]);

function LocalStorageService($window, $rootScope) {

  /**
   * Test browser if it supports localStorage
   */
  var storage = (typeof window.localStorage === 'undefined') ? undefined : window.localStorage,
      supported = !(typeof storage === undefined || typeof window.JSON === undefined);

    /*
    * whenever localStorage gets updated trigger
    * $digest cicle so all values are refreshed in the view
     */
    angular.element($window).on('storage', function(event, name) {
      if (event.key === name) {
        $rootScope.$apply();
      }
    });


    return {
      set: set,
      get: get,
      update: update,
      remove: remove,
      removeAll: removeAll,
      list: list
    };


    //////////////// function definitions


    /**
     * Set localStorage value and check if it already do not exists
     *
     * @param {string} name Name of localStorage value
     * @param {object} val  Return stored value
     */
     function set(name, val) {
       if (!supported) {
           console.log('localStorage not supported, make sure you have the $cookies supported.');
         }

       // in case we already have localStorage with same name alert error msg
       if (window.localStorage.getItem(name) !== null) {
         console.warn('localStorage with the name ' + name + ' already exists. Please pick another name.');
       } else {
           if($window.localStorage && $window.sessionStorage) {
               $window.sessionStorage.setItem(name, angular.toJson(val));
               return $window.localStorage.setItem(name, angular.toJson(val));
           }
       }
     }


     /**
      * getData from localStorage
      *
      * @param  {string} name Name of localStorage value
      * @return {*}           Stored value
      */
     function get(name) {
       if (!supported) {
           console.log('localStorage not supported, make sure you have the $cookies supported.');
         }

       return $window.localStorage && angular.fromJson($window.localStorage.getItem(name));
     }


     /**
      * Update already stored data
      *
      * @param  {string}  name Name of localStorage value
      * @param {object}   val  Return stored value
      */
     function update(name, val) {
       if (!supported) {
           console.log('localStorage not supported, make sure you have the $cookies supported.');
         }
         if($window.localStorage && $window.sessionStorage) {
             $window.sessionStorage.setItem(name, angular.toJson(val));
            return $window.localStorage.setItem(name, angular.toJson(val));
         }
     }



     /**
      * Remove localStorage value
      *
      * @param  {string} name Name of localStorage value
      * @return {boolean}     True/false if the value is removed
      */
     function remove(name) {
       if (!supported) {
           console.log('localStorage not supported, make sure you have the $cookies supported.');
       }

         if($window.localStorage && $window.sessionStorage) {
             $window.sessionStorage.removeItem(name);
             return $window.localStorage.removeItem(name);
         }
     }


     /**
      * Remove all localStorage values
      *
      * @return {boolean}     True/false if the value is removed
      */
     function removeAll() {
       if (!supported) {
           console.log('localStorage not supported, make sure you have the $cookies supported.');
       }

         if($window.localStorage && $window.sessionStorage) {
             $window.sessionStorage.clear()
             return $window.localStorage.clear()
         }
     }


     /**
      * Return object of all values that are stored on localStorage
      *
      * @return {object}    Object with all data stored on localStorage
      */
     function list() {
       return $window.localStorage;
     }

}