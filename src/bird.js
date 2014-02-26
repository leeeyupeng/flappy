/**
 * Created by liyupeng on 14-2-26.
 */
var bird = cc.Sprite.extend({
    HP:1,
    box:null,
    speedy : 0,

    animateFly : null,

    ctor:function () {
        this._super();

        var frame = cc.SpriteFrame.create(res.bird,cc.rect(0,0,34,24));
        this.initWithTexture(frame.getTexture(),frame.getRect());

        var frame0 = cc.SpriteFrame.create(res.bird,cc.rect(0,0,34,24));
        var frame1 = cc.SpriteFrame.create(res.bird,cc.rect(0,24,34,24));
        var frame2 = cc.SpriteFrame.create(res.bird,cc.rect(0,24 * 2,34,24));
        var frame3 = cc.SpriteFrame.create(res.bird,cc.rect(0,24 * 3,34,24));

        var animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);
        animFrames.push(frame2);
        animFrames.push(frame3);

        var animation = cc.Animation.create(animFrames, 0.1);
        var animate = cc.Animate.create(animation);
        animateFly = cc.RepeatForever.create(animate);

        animateFly.retain(); //release 还没有添加

        this.PlayFly(true);
    },
    onExit:function(){
        this._super();

        this.animateFly.release();
    },
    jump:function(){
        this.speedy = 300;
    },
    PlayFly:function(flag){
        if(flag === true)
            this.runAction(animateFly);
        else
            this.removeAction(animateFly);
    },
    update:function (dt) {
//        alert("update");
        this.speedy += gravity * dt;
        this.setPosition(this.getPosition().x , this.getPosition().y + this.speedy * dt);
    }
})

