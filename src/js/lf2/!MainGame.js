//當有要加關卡時, 可以使用addNewLevel
//第一個被加進來的Level就是啟動點, 所以一開始遊戲就進入MyMenu
'use strict';
{
    Framework.Game.addNewLevel({menu: new lf2.LaunchMenu()});
    Framework.Game.addNewLevel({control: new lf2.MySettingLevel()});
    Framework.Game.addNewLevel({loading: new lf2.LoadingLevel()});
    Framework.Game.addNewLevel({selection: new lf2.SelectionLevel()});
    Framework.Game.addNewLevel({fight: new lf2.FightLevel()});
    //Framework.Game.addNewLevel({level1: new lf2.MyGame()});

    //讓Game開始運行
    Framework.Game.start();
}
