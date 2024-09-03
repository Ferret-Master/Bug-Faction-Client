
var tabMap = {
    "bug_utility":  "utility",
    "bug_factory": "factory",
    "bug_ammo":"ammo",
    "bug_combat":"combat",
    "bug_nuke_ammo":"ammo",
    "bug_orbital_structure":"orbital_structure",
    "bug_orbital":"orbital",
    "bug_ground":"vehicle",
    "bug_ground_2":"bot",
    "bug_air":"air",
    "b_naval":"naval"
}

function runHotkeySetup(){
    ko.computed(function () {
        var buildSet = model.buildSet();
        if (!buildSet) {
            return;
        }
        var hotkeys = model.hotkeys();

        setTimeout(function () {
        _.forEach(buildSet.tabs(), function (tab) {
            if(tab.group().startsWith("bug_") || tab.group().startsWith("b_")){
            var baseTab = tabMap[tab.group()];
         
            tab.hotkey(hotkeys["tab_" + baseTab] || "");

            tab.buildGroup = tab.buildGroup || ko.observable(baseTab);
            tab.buildGroup(baseTab);
        }
        });
        }, 0);
    });
    }
runHotkeySetup()