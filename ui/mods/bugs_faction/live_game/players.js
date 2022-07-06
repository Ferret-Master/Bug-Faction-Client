//most code in this file was taken from legions live game players file

var bugsLiveGamePlayersLoaded;
var bugCommanders = [];
var legionCommanders = [];
if (!bugsLiveGamePlayersLoaded) {
  bugsLiveGamePlayersLoaded = true;
  function bugsLiveGamePlayers() {
    try {
      loadCSS("coui://ui/mods/bugs_faction/css/bug_players.css");
      var checkCommanders = function (commanders) {
        var legionCount = 0;
        var bugsCount = 0;
        var specsLength = 0;
        if (commanders !== undefined) {
          _.forOwn(commanders, function (value) {
            // eslint-disable-next-line no-undef
            if (_.includes(legionCommanders, value)) {
              legionCount++;
            }
            if (_.includes(bugCommanders, value)) {
                bugsCount++;
              }
            specsLength++;
          });
          if (legionCount === specsLength) {
            return "legion";
          } else if (legionCount > 0 && legionCount < specsLength) {
            return "mixed";
          }
        }
        return "vanilla";
      };

      var isLegionOrMixedOrVanilla = ko.computed(function () {
        var selectedSpecs = model.player().commanders;
        return checkCommanders(selectedSpecs);
      });

      model.isLegion = ko.computed(function () {
        return isLegionOrMixedOrVanilla() === "legion";
      });

      model.isMixed = ko.computed(function () {
        return isLegionOrMixedOrVanilla() === "mixed";
      });

      model.commanderImage = function (data) {
        var result = "";
        switch (checkCommanders(data.commanders)) {
          case "legion":
            result =
              "coui://ui/mods/com.pa.legion-expansion/img/icon_player_outline_l.png";
            break;
          case "mixed":
            result =
              "coui://ui/mods/com.pa.legion-expansion/img/icon_player_outline_m.png";
            break;
          default:
            result =
              "coui://ui/main/game/live_game/img/players_list_panel/icon_player_outline.png";
            break;
        }
        return result;
      };

      model.commanderImageMaskLeg = function (data) {
        return checkCommanders(data.commanders) === "legion";
      };

      model.commanderImageMaskMix = function (data) {
        return checkCommanders(data.commanders) === "mixed";
      };

      $(
        'img[src="img/players_list_panel/icon_player_outline.png"]'
      ).replaceWith(
        '<img data-bind="attr:{src: model.commanderImage($data)}" />'
      );
      $(".player_masked").attr(
        "data-bind",
        "style: { backgroundColor: color }, css: { legcom: model.commanderImageMaskLeg($data), mixcom: model.commanderImageMaskMix($data)}"
      );
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  bugsLiveGamePlayers();
}
