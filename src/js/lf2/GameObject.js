"use strict";
var lf2 = (function (lf2) {

    /**
     * @class {lf2.BmpInfo}
     */
    const BmpInfo = lf2.BmpInfo;

    /**
     * @class {lf2.Frame}
     */
    const Frame = lf2.Frame;

    let soundPool = {};

    /**
     * GameObject
     *
     * @class lf2.GameObject
     */
    lf2.GameObject = class GameObject{
        /**
         *
         * @param {Object} fileInfo
         * @param {String} context
         */
        constructor(fileInfo, context) {
            this.fileInfo = fileInfo;
            this.sourceCode = context;

            this.id = intval(fileInfo.id);
            this.bmpInfo = new BmpInfo(context);
            this.frames = lf2.GameObject._parseFrames(context);
            this._audio = null;
            this._preLoadSound();
        }

        /**
         * Promise when all image loaded
         *
         * @returns {Promise.<*>}
         */
        done() {
            let arr = [].concat(this.bmpInfo._bmpLoad);
            return Promise.all(arr);
        }

        addPreloadResource(url){
            return this.bmpInfo.addPreloadResource(url);
        }

        /**
         * Parse frame block
         *
         * @param context
         * @returns {lf2.Frame[]}
         * @private
         */
        static _parseFrames(context) {
            const FRAME_START_TAG = '<frame>';
            const FRAME_END_TAG = '<frame_end>';
            let framesIndex = [], frameContent = [];

            for (
                let index = context.indexOf(FRAME_START_TAG);
                index !== -1;
                index = context.indexOf(FRAME_START_TAG, index + 1)
            ) {
                framesIndex.push(index);
            }
            framesIndex.forEach((i) => {
                let str = context.getStringBetween(FRAME_START_TAG, FRAME_END_TAG, i).trim();
                let frame = new Frame(str, this);

                frameContent[frame.id] = frame;
            });

            return frameContent;
        }

        /**
         *
         * @private
         */
        _preLoadSound() {
            this._audio = new Framework.Audio();
            this.frames.forEach(frame => {
                if (frame.soundPath !== undefined && !soundPool[frame.soundPath]) {
                    this.addPreloadResource(frame.soundPath).then(rep=>{
                        return rep.arrayBuffer();
                    }).then((buf)=>{
                        let obj = {};
                        obj[frame.soundPath] = buf;
                        this._audio.addSongs(obj);
                    });
                    soundPool[frame.soundPath] = true;
                }
            });

        }
    };


    return lf2;
})(lf2 || {});