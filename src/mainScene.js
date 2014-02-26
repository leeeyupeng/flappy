/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var pipetimeinterval = 3;
var gravity = -9.8 * 100;
var speedx = 70;

var main = cc.Layer.extend({
    shareTexture : null,
    landSprite : null,
    bird : null,
    pipes : new Array(),
    pipeInterval : 1,
    pipeNext : 2,
    isStart : false,
    readyNode : null,

    init:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.setMouseEnabled(true);

        winSize = cc.Director.getInstance().getWinSize();

        var layer = cc.LayerColor.create(cc.c4b(78, 192, 202, 255), winSize.width,winSize.height);
        layer.ignoreAnchorPointForPosition(false);
        layer.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(layer, -1, 0);



        cc.SpriteFrameCache.getInstance().addSpriteFrames(res.shareTexture_plist);

        var sp = new cc.Sprite();
//        sp.setTextureRect(cc.rect(0,0,320,109));
        sp.initWithSpriteFrameName("sky.png");
        sp.setAnchorPoint(0,0);
        sp.setScale(winSize.width/sp.getTextureRect().getWidth(),1);
        this.addChild(sp, 0,0);
        var pos = cc.p(0,112);
        sp.setPosition(pos);

        this.landSprite = new cc.Sprite();
        this.landSprite.initWithSpriteFrameName("land.png");
        this.landSprite.setAnchorPoint(0,0);
        this.landSprite.setScale(1.1,1);
        this.addChild(this.landSprite, 10, 0);

        this.schedule(this.MoveLand,24 * 1.1 / speedx);

        this.bird = new bird();
        this.bird.setPosition(cc.p(96,250));
        this.addChild(this.bird,1,0);

//        var pipe = waterpipe.create(cc.p(0,200));
//        pipe.setPosition(cc.p(100,0));
//        this.addChild(pipe,1,0);

        this.Ready();

//        this.schedule(this.update, 0.1);

        return true;
    },
    onButtonPlay:function()
    {
        alert("switch to battle");
    },
    MoveLand:function(){
        this.landSprite.setPosition(cc.p(0,0));
        this.landSprite.runAction(cc.MoveTo.create(1,cc.p(-24 * 1.1,0)));
    },
    // a selector callback
    menuCloseCallback:function (sender) {
        cc.Director.getInstance().end();
    },
    onMouseDown:function (event) {
        this._super();

        if(this.isStart === false)
        {
            this.StartGame();
        }
        if(this.isStart === true)
        {
            this.bird.jump();
        }
    },
    onTouchEnded:function (touch, event) {
        if(this.isStart === false)
        {
            this.StartGame();
        }
    },
    onTouchesBegan:function (touches, event) {
        this.isMouseDown = true;
    },
    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            if (touches) {
                //this.circle.setPosition(touches[0].getLocation().x, touches[0].getLocation().y);
            }
        }
    },
    onTouchesEnded:function (touches, event) {
        this.isMouseDown = false;
    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    },
    Ready:function(){
        cc.SpriteFrameCache.getInstance().addSpriteFrames(res.shareTexture_plist);
        var sp = new cc.Sprite();
//        sp.setTextureRect(cc.rect(0,0,320,109));
        sp.initWithSpriteFrameName("splash.png");
        sp.setAnchorPoint(0.5,0.5);
        this.addChild(sp, 8,0);
        var pos = cc.p(160,240);
        sp.setPosition(pos);

        this.readyNode = sp;
    },
    StartGame : function(){
        this.isStart = true;
        this.removeChild(this.readyNode);
        this.scheduleUpdate();
        this.bird.scheduleUpdate();
    },
    update:function (dt) {
        this.Pipeupdate(dt);
    },
    Pipeupdate:function(dt){
        this.pipeNext -= dt;
        if(this.pipeNext <= 0)
        {
            this.pipeNext = pipetimeinterval;
            this.PipeCreate();
        }

        for(i = 0;i < this.pipes.length;i ++)
        {
            this.pipes[i].setPosition(cc.p(this.pipes[i].getPosition().x - this.pipes[i].speed * dt,this.pipes[i].getPosition().y));
        }

        while(this.pipes.length > 0)
        {
            var pipe = this.pipes[0];
            if(pipe.getPosition().x < -30)
            {
                pipe = this.pipes.shift();
                this.removeChild(pipe);
            }
            else
            {
                break;
            }
        }
    },
    PipeCreate : function(){
        var pipe = waterpipe.create(cc.p(0,Math.random() * 200 + 200));
        pipe.setPosition(cc.p(350,0));
        this.addChild(pipe,1,0);

        this.pipes.push(pipe);
    }
});

var mainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new main();
        layer.init();
        this.addChild(layer,layer.getTag());
    }
});

