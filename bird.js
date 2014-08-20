

var HelloWorldLayer = cc.Layer.extend({
    screenSize:null,
    ctor:function ()
    {
        this._super();
        /*********游戏写在这这个区域里*********/

        //屏幕尺寸 screen size
        var screenSize = cc.director.getWinSize();

        //给游戏添加背景
        var sprite = cc.Sprite.create("res/bg.png");
        sprite.setPosition(cc.p(screenSize.width / 2,screenSize.height / 2));
        this.addChild(sprite, 0);

                //创建一个精灵角色
        var sprite = cc.Sprite.create("res/bird1.png");
        sprite.setPosition(cc.p(screenSize.width / 2,screenSize.height / 2));
        this.addChild(sprite, 0);

        //设置当前播放第几张动画
        var picIndex = 1;
        //开启一个计时器
        this.schedule
        (
            function ()//计时器时间到了要做的事儿
            {
                picIndex = picIndex+1;//播放下一张图片
                if(picIndex>2)//如果下一个序列的图片是不存在的，就切换到第一张图片
                {
                    picIndex = 1;
                }
                sprite.setTexture("res/bird"+picIndex+".png");//切换人物的图片
            },
            0.5,//倒计时0.5秒
            cc.REPEAT_FOREVER,//计时器一共有打开几次，
            0//延迟多少秒打开计时器
        );

        //add top and bottom piple
        var topSprite = cc.Sprite.create("res/PipeTop.png");
        topSprite.setAnchorPoint(1.0,1.0);
        this.addChild(topSprite, 0);

        var bottomSprite = cc.Sprite.create("res/PipeBottom.png");
        bottomSprite.setAnchorPoint(1.0,0.0);
        this.addChild(bottomSprite, 0);

        //piple move
        this.schedule
        (
            function ()
            {
                var aNum = Math.floor(Math.random()*3);
                switch (aNum)
                {
                    case 0:
                        topSprite.setPosition(screenSize.width, screenSize.height+screenSize.height/1.2);
                        bottomSprite.setPosition(screenSize.width, -screenSize.height/3.0);
                        break;
                    case 1:
                        topSprite.setPosition(screenSize.width, screenSize.height+screenSize.height/2.2);
                        bottomSprite.setPosition(screenSize.width, -screenSize.height/1.4);
                        break;

                    case 2:
                        topSprite.setPosition(screenSize.width, screenSize.height+screenSize.height/1.6);
                        bottomSprite.setPosition(screenSize.width, -screenSize.height/1.8);
                        break;
                    default :
                        break;

                }

                var topMoveToA = cc.MoveTo.create(5.0,cc.p(0,topSprite.getPositionY()));
                var bottomMoveToA = cc.MoveTo.create(5.0,cc.p(0,bottomSprite.getPositionY()));

                topSprite.runAction(topMoveToA);
                bottomSprite.runAction(bottomMoveToA);
            },
            3.0,
            cc.REPEAT_FOREVER,
            0
        );













        /*********游戏写在这这个区域里*********/
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

