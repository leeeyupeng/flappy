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

var menu = cc.Layer.extend({
    shareTexture : null,
    landSprite : null,

    init:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

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
        this.addChild(this.landSprite, 0, 0);
//        sp.setOffsetInPixels
        this.schedule(this.MoveLand,0.48);


        var playNormal = new cc.Sprite();
        playNormal.initWithSpriteFrameName("replay.png");
        playNormal.setAnchorPoint(0,0);

        var playPress = new cc.Sprite();
        playPress.initWithSpriteFrameName("replay.png");
        playNormal.setAnchorPoint(0,0);
        playPress.setScale(1.1,1.1);

        var playDisabled = new cc.Sprite();
        playDisabled.initWithSpriteFrameName("replay.png");
        playDisabled.setAnchorPoint(0,0);

        var playGame = cc.MenuItemSprite.create(playNormal,playPress,playDisabled,function(){
                this.onButtonPlay();
        }.bind(this)
        );

        var menu = cc.Menu.create(playGame);
        menu.alignItemsVerticallyWithPadding(10);
        this.addChild(menu, 1, 2);
        menu.setPosition(winSize.width / 2, winSize.height / 2 - 80);
        this.schedule(this.update, 0.1);


        return true;
    },
    onButtonPlay:function()
    {
        cc.LoaderScene.preload(g_maingame, function () {
            var scene = new mainScene();
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        }, this);
    },
    MoveLand:function(){
        this.landSprite.setPosition(cc.p(0,0));
        this.landSprite.runAction(cc.MoveTo.create(1,cc.p(-24 * 1.1,0)));
    },
    // a selector callback
    menuCloseCallback:function (sender) {
        cc.Director.getInstance().end();
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
    }
});

var menuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new menu();
        layer.init();
        this.addChild(layer,layer.getTag());
    }
});

