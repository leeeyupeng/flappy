/**
 * Created by liyupeng on 14-2-28.
 */
cc.Shake = cc.ActionInterval.extend({
    _initial_x : 0,
    _initial_y : 0,
    _strength_x : 0,
    _strength_y : 0,
    ctor:function(){

    },
    startWithTarget:function(target){
        cc.ActionInterval.prototype.startWithTarget.call(this, target);

        this._initial_x = target.getPosition().x;
        this._initial_y = target.getPosition().y;
    },
    initWithDuration:function(d,strengthx,strengthy){
        this._super(d);
        this._strength_x = strengthx;
        this._strength_y = strengthy;
    },
    update:function(dt){
        console.log("0 :" + this._target.getPosition().x);
        var randx = Math.random() * this._strength_x * 2 - this._strength_x;
//        randx *= dt;
        var randy = Math.random() * this._strength_y * 2 - this._strength_y;
//        randy *= dt;
        console.log("rand : " + randx + "  " + randy);
        this._target.setPosition(cc.pAdd(cc.p(this._initial_x,this._initial_y),cc.p(randx,randy)));
        console.log(this._target.getPosition().x);
    },
    stop:function(){

        this._target.setPosition(cc.p(this._initial_x,this._initial_y));
        this._super();
    }
});

cc.Shake.create = function(d,stength){
    var action = new cc.Shake();
    action.initWithDuration(d,stength,stength);
    return action;
};