/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


goog.provide('shaka.offline.SQLiteEngine');

goog.require('goog.asserts');
goog.require('shaka.log');
goog.require('shaka.offline.IStorageEngine');
goog.require('shaka.util.Error');
goog.require('shaka.util.Functional');
goog.require('shaka.util.PublicPromise');

shaka.offline.SQLiteEngine = function() {
  goog.asserts.assert(
    shaka.offline.SQLiteEngine.isSupported(),
    'SQLiteEnvine should not be called when SQLiteEngine is not supported');

  /** @private {IDBDatabase} */
  this.db_ = null;
}

/**
 * Determines if SQLite is supported.
 * @return {boolean}
 */
shaka.offline.SQLiteEngine.isSupported = function() {
  return window.sqlitePlugin != null;
}

/** @override */
shaka.offline.SQLiteEngine.prototype.initialized = function() {
  return this.db_ != null
}

/** @override */
shaka.offline.SQLiteEngine.prototype.init = function(storeMap) {
  goog.asserts.assert(!this.db_, 'Already initialized');

  // TODO: make this into promise
  this.db_ = this.createConnection()
  this.db_.transaction(function(tx) {
    var stores = Object.keys(storeMap);
    stores.forEach(function(store) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS ' + store + '(id integer)')
    }, function(error) {
      // handle error
    }, function() {
      // handle success
    })
  })
}

/** @override */
shaka.offline.SQLiteEngine.prototype.get = function() {
}

/** @override */
shaka.offline.SQLiteEngine.prototype.get = function() {
}

/** @override */
shaka.offline.SQLiteEngine.prototype.forEach = function() {
}

/** @override */
shaka.offline.SQLiteEngine.prototype.insert = function() {
}

/** @override */
shaka.offline.SQLiteEngine.prototype.remove = function() {
}

/** @override */
shaka.offline.SQLiteEngine.prototype.removeKeys = function() {
}

/** @override */
shaka.offline.SQLiteEngine.prototype.reserveId = function() {
}

shaka.offline.SQLiteEngine.prototype.createConnection_ = function() {
  return window.sqlitePlugin.openDatabase({ name: 'shaka.db', location: 'default' })
}
