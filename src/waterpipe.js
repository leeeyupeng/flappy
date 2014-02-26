/**
 * Created by liyupeng on 14-2-26.
 */
var waterpipeinterval = 100;
var waterpipe = cc.Node.extend({
    speed:24,
    boxUp : null,
    boxDown : null,
    sprites : null,
    curPos : null,
    center : null,
    init:function (center) {
        this._super();

        cc.SpriteFrameCache.getInstance().addSpriteFrames(res.shareTexture_plist);

        var sp = new cc.Sprite();
//        sp.setTextureRect(cc.rect(0,0,320,109));
        sp.initWithSpriteFrameName("sky.png");
        sp.setAnchorPoint(26,0);
        this.addChild(sp, 0,0);
        var pos = cc.p(0,112);
        sp.setPosition(pos);
    }
});
waterpipe.create = function(center){

}
