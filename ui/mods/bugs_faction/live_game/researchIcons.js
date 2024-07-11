model.bugsEnabled = ko.observable(false);

(function() {
	createFloatingFrame("research_icon_frame", 120, 200, {"offset": "leftCenter", "left": -20});
	
	


	$("#research_icon_frame_content").append(
		loadHtml("coui://ui/mods/bugs_faction/live_game/researchIcons.html")
		);
	
	if (localStorage["frames_research_icon_frame_lockStatus"] == "true") {
		$("#research_info_lock").attr("src", "coui://ui/mods/bugs_faction/live_game/icons/lock-icon.png");
	} else  {
		$("#research_info_lock").attr("src", "coui://ui/mods/bugs_faction/live_game/icons/unlock-icon.png");
	}

	$("#research_visible").attr("src", "coui://ui/mods/bugs_faction/live_game/icons/visible.png");

	
})();


var unlockUnits = [
	"/pa/units/research/unlocks/bug_grunt_big_unlock/bug_grunt_big_unlock.json",
	"/pa/units/research/unlocks/bug_ripper_stealth_unlock/bug_ripper_stealth_unlock.json",
	"/pa/units/research/unlocks/bug_combat_fab_cheap_unlock/bug_combat_fab_cheap_unlock.json",
	"/pa/units/research/unlocks/bug_needler_fast_unlock/bug_needler_fast_unlock.json",
	"/pa/units/research/unlocks/bug_boomer_mine_unlock/bug_boomer_mine_unlock.json",
	"/pa/units/research/unlocks/bug_crusher_unlock/bug_crusher_unlock.json",
	"/pa/units/research/unlocks/bug_hydra_unlock/bug_hydra_unlock.json",
	"/pa/units/research/unlocks/bug_chomper_unlock/bug_chomper_unlock.json",
	"/pa/units/research/unlocks/bug_orbital_battleship_unlock/bug_orbital_battleship_unlock.json",
	"/pa/units/research/unlocks/bug_orbital_laser_unlock/bug_orbital_laser_unlock.json",
	"/pa/units/research/unlocks/bug_advanced_orbital_radar_unlock/bug_advanced_orbital_radar_unlock.json",
	"/pa/units/research/unlocks/bug_orbital_fighter_vision_unlock/bug_orbital_fighter_vision_unlock.json"
]


model.researchExpanded = ko.observable(true);

model.researchLockEvent = function() {
	if (localStorage["frames_research_icon_frame_lockStatus"] == "true") {
		$("#research_info_lock").attr("src", "coui://ui/mods/bugs_faction/live_game/icons/unlock-icon.png");
		unlockFrame("research_icon_frame");
	} else  {
		$("#research_info_lock").attr("src", "coui://ui/mods/bugs_faction/live_game/icons/lock-icon.png");
		lockFrame("research_icon_frame");
	}
};

model.researchVisibleEvent = function() {
	model.researchExpanded(!model.researchExpanded())
	if (model.researchExpanded() == true) {
		$("#research_visible").attr("src", "coui://ui/mods/bugs_faction/live_game/icons/visible.png");
	} else  {
		$("#research_visible").attr("src", "coui://ui/mods/bugs_faction/live_game/icons/notVisible.png");
	   
	}
};

var unlocked_research = [];

handlers.unlockResearch = function(payload){
	unlockResearch(payload)
}

function unlockResearch(payload){
	for(var i = 0; i< unlockUnits.length;i++){
		if(unlockUnits[i] == payload){
			if(!_.contains(unlocked_research, payload)){unlocked_research.push(payload)}
			$(".research_icon").eq(i).css('opacity','1.0')
		}
	}
}


function dullResearch(){
	for(var i = 0; i< unlockUnits.length;i++){
		
		$(".research_icon").eq(i).css('opacity','0.5')
		unlockResearch(unlocked_research[i])
			
	}
	
}

function checkResearch(){
	for(var i = 0; i< unlocked_research.length;i++){
		
		unlockResearch(unlocked_research[i])
			
	}
	
}

handlers.bugsInTeam = function(payload){
	if(payload == true){
		model.bugsEnabled(true)
	}
	else{
		model.bugsEnabled(false)
	}
}

_.delay(dullResearch,500)
_.delay(checkResearch,1000)
//_.delay(function(){if(localStorage.bugsEnabled == "true"){model.bugsEnabled(true)}else{model.bugsEnabled(false)}},4000)
