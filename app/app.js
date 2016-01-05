"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var ByteFormatPipe = (function () {
    function ByteFormatPipe() {
    }
    ByteFormatPipe.prototype.transform = function (bytes, args) {
        if (bytes == 0)
            return '0 Bytes';
        var k = 1000;
        var sizes = ['Bytes', 'KB', 'MB', 'GB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
    };
    ByteFormatPipe = __decorate([
        core_1.Pipe({ name: 'byteFormat' }), 
        __metadata('design:paramtypes', [])
    ], ByteFormatPipe);
    return ByteFormatPipe;
}());
var App = (function () {
    function App() {
        this.images = [];
    }
    App.prototype.handleDrop = function (e) {
        var files = e.dataTransfer.files;
        var self = this;
        Object.keys(files).forEach(function (key) {
            if (files[key].type === "image/png" || files[key].type === "image/jpeg") {
                self.images.push(files[key]);
            }
            else {
                alert("File must be a PNG or JPEG!");
            }
        });
        return false;
    };
    App.prototype.imageStats = function () {
        var sizes = [];
        var totalSize = 0;
        this
            .images
            .forEach(function (image) { return sizes.push(image.size); });
        sizes
            .forEach(function (size) { return totalSize += size; });
        return {
            size: totalSize,
            count: this.images.length
        };
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            pipes: [ByteFormatPipe],
            template: "\n    <h1>Total Images: {{ imageStats().count }}</h1>\n    <h1>Total Size: {{ imageStats().size | byteFormat }} bytes</h1>\n    <div\n      (dragover)=\"false\"\n      (dragend)=\"false\"\n      (drop)=\"handleDrop($event)\"\n      style=\"height: 300px; border: 5px dotted #ccc;\">\n      <p style=\"margin: 10px; text-align: center\">\n        <strong>Drop Your Images Here</strong>\n      </p>\n    </div>\n    <div class=\"media\" *ngFor=\"#image of images\">\n     <div class=\"media-left\">\n       <a href=\"#\">\n         <img class=\"media-object\" src=\"{{ image.path }}\" style=\"max-width:200px\">\n       </a>\n     </div>\n     <div class=\"media-body\">\n       <h4 class=\"media-heading\">{{ image.name }}</h4>\n       <p>{{ image.size | byteFormat}} bytes</p>\n     </div>\n   </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
browser_1.bootstrap(App);
//# sourceMappingURL=app.js.map