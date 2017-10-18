"use strict";
/*
*
* Based on:
* https://medium.com/@OCombe/how-to-publish-a-library-for-angular-2-on-npm-5f48cdabf435
*
* Diract IT Copyright 2017
* Oscar Bout
*
* Usage: this code is 'base code' for Front Ends for the Diract IT Ceyenne 2020 suite
*
* to build/publish this repo:
* './build' in Powershell
*
* to set up this repo:
* 'npm install'
* followed by:
* 'tsc'
*
*/
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/*jshint esversion: 6 */
__export(require("./src/services/log/log.services"));
__export(require("./src/services/user/user.services"));
