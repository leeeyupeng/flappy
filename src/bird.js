/**
 * Created by liyupeng on 14-2-26.
 */
var speedyjump = 30;
var speedyFace = -200;
var speedyFaceAngle = -20;
var speedyFaceDown = -400;
var speedyFaceDownAngle = 90;

var bird = cc.Sprite.extend({
    HP:1,
    box:null,
    speedy : 0,

    boxRect : null,

    animateFly : null,
    isdied : false,

    ctor:function () {
        this._super();

        this.setAnchorPoint(0.5,0.5);

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

        this.boxRect = cc.rect(0,0,24,24);

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
        if(this.isdied === false)
            this.speedy = 300;
    },
    died : function(){
        this.isdied = true;
        this.PlayFly(false);
    },
    PlayFly:function(flag){
        if(flag === true)
            this.runAction(animateFly);
        else
            this.stopAction(animateFly);
    },
    RotationFly:function(){
        var rot = 0;
        if(this.speedy > speedyFace)
        {
            rot = speedyFaceAngle;
            rot = speedyFaceAngle;
        }
        else if(this.speedy > speedyFaceDown)
        {
            rot = (this.speedy - speedyFace) / (speedyFaceDown - speedyFace) * (speedyFaceDownAngle - speedyFaceAngle);
        }
        else
        {
            rot = speedyFaceDownAngle;
        }
        this.setRotation(rot);
    },
    update:function (dt) {
//        alert("update");
        this.speedy += gravity * dt;
        var y = this.getPosition().y + this.speedy * dt;
        if(y < 112 + 12)
            y = 112 + 12;
        this.setPosition(this.getPosition().x , y);

        this.RotationFly();

        winSize = cc.Director.getInstance().getWinSize();
        if(this.getPosition().y <= 112 + 12)
        {
            if(this.isdied)
                main.GameOver();
            else
            {
                main.Died();
            }
        }

        if(this.getPosition().y >= winSize.height)
        {
            main.Died();
        }
//        console.log(this.getPosition().x);
    }
})

