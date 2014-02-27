/**
 * Created by liyupeng on 14-2-26.
 */

var waterpipeinterval = 100;
var waterpipe = cc.Layer.extend({
    speed:50,
    boxUp : null,
    boxDown : null,
    sprites : null,
    curPos : null,
    center : null,
    isPass : false,
    boxRect:null,
    init:function (center) {
        this._super();

        this.center = center;
        this.speed = speedx;

        winSize = cc.Director.getInstance().getWinSize();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(res.shareTexture_plist);

        this.boxRect = new Array();

        this.boxRect.push(cc.rect(0,this.center.y + waterpipeinterval * 0.5
            ,52,winSize.height - (this.center.y + waterpipeinterval * 0.5)));

        this.boxRect.push(cc.rect(0,0
            ,52,this.center.y - waterpipeinterval * 0.5));

        var sp = new cc.Sprite();
        sp.initWithSpriteFrameName("pipe-down.png");
        sp.setAnchorPoint(0.5,0);
        var pos = cc.p(0,this.center.y + waterpipeinterval * 0.5);
        sp.setPosition(pos);
        this.addChild(sp, 0,0);

        sp = new cc.Sprite();
        sp.initWithSpriteFrameName("pipe.png");
        sp.setAnchorPoint(0.5,0);
        var pos = cc.p(0,this.center.y + waterpipeinterval * 0.5 + 26);
        sp.setPosition(pos);
        sp.setScale(1,10);
        this.addChild(sp, 0,0);

        sp = new cc.Sprite();
        sp.initWithSpriteFrameName("pipe-up.png");
        sp.setAnchorPoint(0.5,1);
        var pos = cc.p(0,this.center.y - waterpipeinterval * 0.5);
        sp.setPosition(pos);
        this.addChild(sp, 0,0);

        sp = new cc.Sprite();
        sp.initWithSpriteFrameName("pipe.png");
        sp.setAnchorPoint(0.5,1);
        var pos = cc.p(0,this.center.y - waterpipeinterval * 0.5 - 26);
        sp.setPosition(pos);
        sp.setScale(1,10);
        this.addChild(sp, 0,0);

        return true;
    },
});
waterpipe.create = function(center){
    var pipe = new waterpipe();
    if(pipe && pipe.init(center))
    {
        return pipe;
    }
    return null;
};
