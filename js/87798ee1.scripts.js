"use strict";!function(){for(var a,b=function(){},c=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],d=c.length,e=window.console=window.console||{};d--;)a=c[d],e[a]||(e[a]=b)}();var unitDb=function(){var a=function(a,b){var c=angular.module(a,["ngRoute","ngSanitize","angular-underscore","drahak.hotkeys"]);return c.config(["$routeProvider",function(a){a.when("/",{controller:"homeCtrl",templateUrl:"views/home.html"}).when("/by-class",{controller:"gdiCtrl",templateUrl:"views/by-class.html"}).when("/:ids",{controller:"compareCtrl",templateUrl:"views/compare.html"}).otherwise({templateUrl:"404.html"})}]),c.run(["$rootScope","$location",function(a,b){var c=localStorage.getItem("lastView");b.path(c),a.$on("$routeChangeStart",function(a,b){localStorage.setItem("lastView",b.originalPath)})}]),c.provider("data",unitDb.services.dataProvider),c.config(["dataProvider",function(a){if(!b)throw"need unit data!";a.setIndex(b)}]),angular.forEach(unitDb.filters,function(a,b){c.filter(b,a)}),angular.forEach(unitDb.directives,function(a,b){c.directive(b,a)}),angular.forEach(unitDb.controllers,function(a,b){c.controller(b,a)}),c.config(["$locationProvider",function(a){a.hashPrefix("")}]),c},b=function(b,c){var d=a(b,c);return angular.bootstrap(document,[b]),d};return{start:b}}();unitDb=unitDb||{},unitDb.DpsCalculator={next:null,canCalculate:function(){return!1},_dps:function(){},rateInverse:function(a){return Math.round(10/a.RateOfFire)/10},dps:function(a,b){return this.canCalculate(a)?this._dps(a,b):this.next&&this.next.dps?this.next.dps(a,b):void 0}},unitDb.DefaultDpsCalculator=angular.extend({},unitDb.DpsCalculator,{canCalculate:function(){return!0},_dps:function(a,b){return b.shots*a.Damage*b.dotPulse/b.cycle}}),unitDb.BeamDpsCalculator=angular.extend({},unitDb.DpsCalculator,{next:unitDb.DefaultDpsCalculator,canCalculate:function(a){return a.BeamLifetime},_dps:function(a,b){var c=0;switch(a.BeamLifetime){case 1:c=9*a.Damage*(1/b.cycle)*b.shots;break;case 0:c=a.Damage/(.1+a.BeamCollisionDelay);break;case a.BeamLifetime>1:c=a.Damage*(a.BeamLifetime/(.1+a.BeamCollisionDelay))/b.cycle;break;default:c=Math.round(a.BeamLifetime/(.1+a.BeamCollisionDelay))*a.Damage/b.cycle,c*=b.shots}var d=Math.pow(10,2);return c=Math.round((c||0)*d)/d}}),unitDb.ContinousBeamDpsCalculator=angular.extend({},unitDb.DpsCalculator,{next:unitDb.BeamDpsCalculator,canCalculate:function(a){return a.ContinuousBeam},_dps:function(a){return 10*a.Damage/(0===a.BeamCollisionDelay?1:2)}}),unitDb.DoTDpsCalculator=angular.extend({},unitDb.DpsCalculator,{next:unitDb.ContinousBeamDpsCalculator,canCalculate:function(a){return a.DoTPulses},_dps:function(a,b){var c=unitDb.DefaultDpsCalculator._dps(a,b);return(c+a.Damage*a.DoTPulses*a.MuzzleSalvoSize)/unitDb.DpsCalculator.rateInverse(a)}}),unitDb.dpsCalculator=unitDb.DoTDpsCalculator,unitDb=unitDb||{},unitDb.UnitDecorator=function(a){var b={RULEUC_Engineer:"Build",RULEUC_Commander:"Build",RULEUMT_Amphibious:"Land",RULEUC_MilitaryVehicle:"Land",RULEUC_MilitaryAircraft:"Air",RULEUC_MilitarySub:"Naval",RULEUC_MilitaryShip:"Naval",RULEUC_Weapon:"Base",RULEUC_Sensor:"Base",RULEUC_Factory:"Base",RULEUC_Resource:"Base",RULEUC_MiscSupport:"Base",RULEUC_CounterMeasure:"Base"},c={TECH1:"T1",TECH2:"T2",TECH3:"T3",EXPERIMENTAL:"EXP"},d={UEF:0,Cybran:1,Aeon:2,Seraphim:3},e={XEB0204:"T2 Engineering Station",UEL0401:"Direct Fire Experimental",UAL0401:"Direct Fire Experimental",XSL0401:"Direct Fire Experimental",URL0402:"Direct Fire Experimental",XRL0403:"Direct Fire Experimental",URA0401:"Air Experimental",XRL0401:"Air Experimental",UAA0310:"Air Experimental",XSA0402:"Air Experimental",UES0401:"Naval Experimental",UAS0401:"Naval Experimental",UEB2401:"Indirect Fire Experimental",URL0401:"Indirect Fire Experimental",XSB2401:"Indirect Fire Experimental",XAB2307:"Indirect Fire Experimental",XAB1401:"Other Experimental",XEA0002:"Other Experimental",XEB2402:"Other Experimental",UEA0003:"ACU Engineering Drone",UEL0201:"T1 Bot/Tank",URL0107:"T1 Bot/Tank",UAL0201:"T1 Bot/Tank",XSL0201:"T1 Bot/Tank",XSL0101:"T1 Land Scout",XSL0202:"T2 Bot",DRL0204:"T2 Bot",DEL0204:"T2 Bot",UEL0203:"T2 Amphibious/Hover Tank",URL0203:"T2 Amphibious/Hover Tank",XAL0203:"T2 Amphibious/Hover Tank",XSL0203:"T2 Amphibious/Hover Tank",XEL0305:"T3 Main Assault Bot/Tank",XRL0305:"T3 Main Assault Bot/Tank",UAL0303:"T3 Main Assault Bot/Tank",XSL0303:"T3 Main Assault Bot/Tank",UEL0303:"T3 Assault Bot",URL0303:"T3 Assault Bot",UEL0104:"T1 Mobile Anti-Air",URL0104:"T1 Mobile Anti-Air",UAL0104:"T1 Mobile Anti-Air",XSL0104:"T1 Mobile Anti-Air",XSB2104:"T1 Anti-Air Turret",URL0205:"T2 Mobile Anti-Air",UAL0205:"T2 Mobile Anti-Air",UEL0205:"T2 Mobile Anti-Air",XSL0205:"T2 Mobile Anti-Air",DELK002:"T3 Mobile Anti-Air",DSLK004:"T3 Mobile Anti-Air",DRLK001:"T3 Mobile Anti-Air",DALK003:"T3 Mobile Anti-Air",UAS0102:"T1 Anti-Air Boat",XRS0204:"T2 Submarine",XAS0204:"T2 Submarine",XSB5202:"T2 Air Staging Facility",XAA0305:"T3 Anti-Air Gunship",XSB2304:"T3 Anti-Air SAM Launcher",XSB3104:"T3 Omni Sensor Array"},f={"Construction - Buildpower":["T1 Engineer","T2 Engineer","T2 Field Engineer","T2 Engineering Station","T1 Engineering Drone","T3 Engineer","T3 Engineering Station","T3 Support Armored Command Unit","Armored Command Unit","ACU Engineering Drone"],Land:["T1 Bot/Tank","T1 Light Assault Bot","T1 Mobile Light Artillery","T1 Mobile Anti-Air","T1 Land Scout","T2 Heavy Tank","T2 Amphibious/Hover Tank","T2 Bot","T2 Mobile Missile Launcher","T2 Mobile Anti-Air","T2 Mobile Shield Generator","T2 Mobile Stealth Field System","T2 Mobile Bomb","T2 Crab Egg (Flak)","T3 Main Assault Bot/Tank","T3 Assault Bot","T3 Sniper Bot","T3 Mobile Heavy Artillery","T3 Mobile Missile Platform","T3 Mobile Anti-Air","T3 Mobile Shield Generator","T3 Shield Disruptor","T3 Crab Egg (Engineer)","T3 Crab Egg (Brick)","T3 Crab Egg (Artillery)"],Air:["T1 Interceptor","T1 Attack Bomber","T1 Light Gunship","T1 Air Scout","T1 Light Air Transport","T2 Combat Fighter","T2 Fighter/Bomber","T2 Gunship","T2 Torpedo Bomber","T2 Guided Missile","T2 Air Transport","T3 Air Superiority Fighter","T3 Strategic Bomber","T3 Heavy Gunship","T3 Anti-Air Gunship","T3 Torpedo Bomber","T3 Spy Plane","T3 Heavy Air Transport"],Naval:["T1 Attack Submarine","T1 Frigate","T1 Anti-Air Boat","T2 Submarine","T2 Destroyer","T2 Cruiser","T2 Torpedo Boat","T2 Shield Boat","T2 Counter-Intelligence Boat","T3 Submarine Hunter","T3 Battleship","T3 Strategic Missile Submarine","T3 Aircraft Carrier","T3 Battlecruiser","T3 Missile Ship"],Experimental:["Direct Fire Experimental","Air Experimental","Naval Experimental","Indirect Fire Experimental","Other Experimental"],"Structures - Weapons":["T1 Point Defense","T1 Anti-Air Turret","T1 Torpedo Launcher","T2 Point Defense","T2 Anti-Air Flak Artillery","T2 Torpedo Launcher","T2 Artillery Installation","T2 Tactical Missile Launcher","T2 Tactical Missile Defense","T3 Heavy Point Defense","T3 Anti-Air SAM Launcher","T3 Torpedo Ambushing System","T3 Heavy Artillery Installation","T3 Rapid-Fire Artillery Installation","T3 Strategic Missile Launcher","T3 Strategic Missile Defense"],"Structures - Support":["T1 Wall Section","T2 Air Staging Facility","T2 Shield Generator","T2 Shield Generator: ED2","T2 Shield Generator: ED3","T2 Shield Generator: ED4","T2 Shield Generator: ED5","T3 Heavy Shield Generator"],"Structures - Intelligence":["T1 Radar System","T1 Sonar System","T2 Radar System","T2 Sonar System","T2 Stealth Field Generator","T3 Omni Sensor Array","T3 Sonar Platform","T3 Perimeter Monitoring System","T3 Quantum Optics Facility"],"Structures - Economy":["T1 Mass Extractor","T1 Power Generator","T1 Hydrocarbon Power Plant","T1 Energy Storage","T1 Mass Storage","T2 Mass Extractor","T2 Power Generator","T2 Mass Fabricator","T3 Mass Extractor","T3 Power Generator","T3 Mass Fabricator"],"Structures - Factories":["T1 Land Factory","T1 Air Factory","T1 Naval Factory","T2 Land Factory HQ","T2 Land Factory","T2 Air Factory HQ","T2 Air Factory","T2 Naval Factory HQ","T2 Naval Factory","T3 Land Factory HQ","T3 Land Factory","T3 Air Factory HQ","T3 Air Factory","T3 Naval Factory HQ","T3 Naval Factory","T3 Quantum Gateway"]},g=function(a){var b=_.intersection(a.Categories,_.keys(c));return 1===b.length?c[b[0]]:""},h=function(a){return(a.name?a.name+": ":"")+("EXP"===a.tech?"":a.tech+" ")+a.description},i=function(a){var b=a.ManualFire?1:0,c=a.RateOfFire,d=1/c,e=a.ProjectilesPerOnFire?a.ProjectilesPerOnFire:1,f="undefined"!=typeof a.MuzzleSalvoSize?a.MuzzleSalvoSize:1,g="undefined"!=typeof a.MuzzleSalvoDelay?a.MuzzleSalvoDelay:1,h="undefined"!=typeof a.DoTPulses?a.DoTPulses:1,i=a.RackBones?a.RackBones.length:1,j=a.Damage*e*h,k={"/projectiles/TIFFragmentationSensorShell01/TIFFragmentationSensorShell01_proj.bp":5,"/projectiles/SIFThunthoArtilleryShell01/SIFThunthoArtilleryShell01_proj.bp":6,"/projectiles/AIFFragmentationSensorShell01/AIFFragmentationSensorShell01_proj.bp":36};g=0===g?0:g-.1;var l=Math.pow(10,1);if(d=Math.round((d||0)*l)/l,g=Math.round((g||0)*l)/l,f=Math.round((f||0)*l)/l,0===a.MuzzleSalvoDelay&&(b+=a.RackBones[0].MuzzleBones.length),("undefined"!=typeof a.ProjectileId||"undefined"!=typeof a.ProjectileLifetimeUsesMultiplier)&&"undefined"==typeof a.ForceSingleFire)if(0===g?(b=a.RackBones[0].MuzzleBones.length,a.RackFireTogether&&(b*=i)):(b=f,a.RackFireTogether&&(b*=i)),k[a.ProjectileId]&&(b=k[a.ProjectileId]),1!==a.RateOfFire)d="Kamikaze"===a.WeaponCategory?1:d;else if(0!==a.RackSalvoReloadTime){var m=0!==a.RackSalvoChargeTime?Math.floor(a.RackSalvoReloadTime/a.RackSalvoChargeTime):0,n=a.RackSalvoChargeTime>a.RackSalvoReloadTime?a.RackSalvoChargeTime:m+a.RackSalvoReloadTime;d=n+c+g*b}else d=a.RackSalvoChargeTime+a.RateOfFire;return{shots:b,cycle:d,damage:j,salvoDelay:g,salvoSize:f,dotPulse:h}},j=function(a){var b=i(a);switch(a.BeamLifetime){case 1:return b.shots+" beam(s) / "+b.cycle+"s, "+9*a.Damage*b.shots+" dmg total";case 0:return"continuous beam: "+a.Damage*b.shots}if(0!==b.salvoDelay){var c=b.shots,d=Math.pow(10,1),e=Math.round((b.cycle-(c-1)*b.salvoDelay||0)*d)/d;return c+" times 1 projectile / "+b.salvoDelay+" sec + "+e+" sec reload = "+b.cycle+" sec total, "+a.Damage*c+" dmg total"}return b.shots+" shot"+(b.shots>1?"s":"")+" / "+(1===b.cycle?"":Math.round(10*b.cycle)/10)+" sec<br/>"+a.Damage*b.shots+" total dmg"},k=function(a){if(a.BeamCollisionDelay>.1){var b=Math.round(a.BeamLifetime/(.1+a.BeamCollisionDelay)),c="";return b>1&&(c="/ "+a.BeamCollisionDelay+"0.1 sec "),b+" times "+a.Damage+" dmg "+c+a.Damage*b+" dmg total"}return 1===a.BeamLifetime?"9 times / 0.1 sec "+a.Damage+" dmg = "+9*a.Damage+" dmg total, 0.8 sec total":a.DoTPulses?a.DoTPulses+" times "+a.Damage+" dmg / "+a.DoTTime/10+" sec = "+a.damage*a.DoTPulses+" total "+(a.DoTTime/10*a.DoTPulses-.1)+" sec total":a.Damage+" dmg"},l=function(a){var b=i(a);return a.ForceSingleFire?null:unitDb.dpsCalculator.dps(a,b)},m=function(a){return!!a.ForceSingleFire},n=function(a){var b=e[a.Id];if(b)return b;var c=g(a);return("EXP"===c?"T4 ":""===c?"":c+" ")+a.Description},o=function(a){var b=n(a),c=0;for(var d in f){c++;var e=f[d],g=e.indexOf(b);if(g>-1)return[d,c,g]}return["Unknown",0,0]},p=function(a){var b=o(a);return b[0]},q=function(a){var b=o(a);return 100*b[1]+b[2]},r={id:a.Id,name:a.General.UnitName,description:a.Description,faction:a.General.FactionName,factionId:d[a.General.FactionName],classification:b[a.General.Classification],gdiClassification:n(a),gdiBaseClassification:p(a),gdiOrder:q(a),tech:g(a),strategicIcon:a.StrategicIconName,icon:a.General.Icon||"",order:a.BuildIconSortPriority||1e3,fireCycle:j,beamCycle:k};r.fullName=h(r);for(var s in a.Weapon)_.extend(a.Weapon[s],{dps:l(a.Weapon[s]),isTML:m(a.Weapon[s])});return _.extend(r,a)},unitDb.services={dataProvider:function(){var a=[],b=[];this.setIndex=function(b){a=b},this.$get=["$hotkey","$location",function(c,d){return c.bind("Ctrl + C",function(){d.path("/"+b.join(","))}),{items:_.map(a,function(a){return unitDb.UnitDecorator(a)}),selectedFilterFractions:[],selectedFilterKinds:[],selectedFilterTech:[],contenders:b}}]}},unitDb.filters={unsafe:["$sce",function(a){return function(b){return a.trustAsHtml(b)}}],if:function(){return function(a,b){if(b)return a}},flatten:function(){return function(a){var b="<br/> ";return angular.isArray(a)?a.join(b):angular.isObject(a)?_.map(a,function(a,b){if(!angular.isObject(a))return b+(a===!0?"":": "+a)}).join(b):a}},time:function(){return function(a){function b(a){return("00"+a).slice(-2)}return Math.floor(a%3600/60)+":"+b(Math.floor(a%3600%60))}},round:function(){return function(a,b){var c=Math.pow(10,b||0);return Math.round((a||0)*c)/c}},shorten:function(){return function(a){return a>1e9-1?a/1e9+"G":a>1e6-1?a/1e6+"M":a>999?a/1e3+"k":a}}},unitDb.directives={thumb:[function(){return{restrict:"E",replace:!0,templateUrl:"views/thumb.html"}}],unit:[function(){return{restrict:"E",replace:!0,templateUrl:"views/unit.html",scope:{item:"=content"}}}],filters:[function(){return{restrict:"E",replace:!0,templateUrl:"views/filters.html"}}],appFooter:[function(){return{restrict:"E",replace:!0,templateUrl:"views/app-footer.html"}}]},unitDb.controllers={homeCtrl:["$scope","$window","$location","$hotkey","data",function(a,b,c,d,e){a.factions=[],a.kinds=[],a.tech=[],a.index=e.items,a.contenders=e.contenders;var f=function(a,b){var c=a.indexOf(b);c>=0?a=a.splice(c,1):a.push(b)},g=function(a,b){return a.indexOf(b)>=0};a.toggleFaction=function(b){f(a.factions,b)},a.factionSelected=function(b){return g(a.factions,b)},a.toggleKind=function(b){f(a.kinds,b)},a.kindSelected=function(b){return g(a.kinds,b)},a.toggleTech=function(b){f(a.tech,b)},a.techSelected=function(b){return g(a.tech,b)},a.compare=function(b){b.selected=!b.selected;var c=a.contenders.indexOf(b.id);c===-1?a.contenders.push(b.id):a.contenders.splice(c,1)},a.clear=function(){for(var b in a.index)a.index[b].selected&&(a.index[b].selected=!1);a.contenders.length=0},a.strain=function(b){return(0===a.factions.length||g(a.factions,b.faction))&&(0===a.kinds.length||g(a.kinds,b.classification))&&(0===a.tech.length||g(a.tech,b.tech))};var h=0,i=null,j=500;a.unitClick=function(d,e){if(e.ctrlKey)b.open("#/"+d.id,"_blank");else{var f=(new Date).getTime();if(i===d&&f-h<j){d.selected||a.compare(d);var g="/"+a.contenders.join(",");a.$apply(c.path(g))}else i=d,h=f,a.compare(d)}},d.bind("Ctrl + X",a.clear),d.bind("Ctrl + Z",function(){angular.element("#filter").focus()})}],gdiCtrl:["$scope","$window","$location","$hotkey","data",function(a,b,c,d,e){a.compact="true"===localStorage.getItem("compact"),a.factions=e.selectedFilterFractions,a.kinds=e.selectedFilterKinds,a.tech=e.selectedFilterTech,a.index=e.items,a.visibleIndex=e.visibleIndex,a.contenders=e.contenders;var f=function(a,b){var c=a.indexOf(b);c>=0?a=a.splice(c,1):a.push(b)},g=function(a,b){return a.indexOf(b)>=0};a.toggleFaction=function(b){f(a.factions,b)},a.factionSelected=function(b){return g(a.factions,b)},a.toggleKind=function(b){f(a.kinds,b)},a.kindSelected=function(b){return g(a.kinds,b)},a.toggleTech=function(b){f(a.tech,b)},a.techSelected=function(b){return g(a.tech,b)},a.toggleBpSelected=function(b){b.selected=!b.selected;var c=a.contenders.indexOf(b.id);c===-1?a.contenders.push(b.id):a.contenders.splice(c,1)},a.setBpSelected=function(b,c){b.selected=c;var d=a.contenders.indexOf(b.id);d===-1&&c?a.contenders.push(b.id):c||a.contenders.splice(d,1)},a.toggleBpSelectedByGdiClass=function(b){var c=_.sortBy(_.filter(a.index,function(c){return b===c.gdiClassification&&a.strain(c)}),function(a){return a.factionId+a.id.substr(-4)}),d=!0;c.length>0&&(d=!c[0].selected);for(var e in c)a.setBpSelected(c[e],d)},a.clear=function(){for(var b in a.index)a.index[b].selected&&(a.index[b].selected=!1);a.contenders.splice(a.contenders.len)},a.strain=function(b){return(0===a.factions.length||g(a.factions,b.faction))&&(0===a.kinds.length||g(a.kinds,b.classification))&&(0===a.tech.length||g(a.tech,b.tech))},a.uniqGdiClass=function(b,c){if(0===c||b.gdiClassification!==a.lastDisplayedGdiClassification)return a.lastDisplayedGdiClassification=b.gdiClassification,b.gdiClassification},a.uniqGdiBaseClass=function(b,c){if(0===c||b.gdiBaseClassification!==a.lastDisplayedGdiBaseClassification)return a.lastDisplayedGdiBaseClassification=b.gdiBaseClassification,b.gdiBaseClassification},a.compare=function(b){b.selected=!b.selected;var c=a.contenders.indexOf(b.id);c===-1?a.contenders.push(b.id):a.contenders.splice(c,1)};var h=0,i=null,j=500;a.unitClick=function(d,e){if(e.ctrlKey)b.open("#/"+d.id,"_blank");else{var f=(new Date).getTime();if(i===d&&f-h<j){d.selected||a.compare(d);var g="/"+a.contenders.join(",");a.$apply(c.path(g))}else i=d,h=f,a.compare(d)}},a.toggleCompact=function(){a.compact=!a.compact,localStorage.setItem("compact",a.compact)},d.bind("Ctrl + X",a.clear),d.bind("Ctrl + Z",function(){angular.element("#filter").focus()})}],compareCtrl:["$scope","$routeParams","data",function(a,b,c){var d=b.ids.split(",");a.contenders=_.sortBy(_.filter(c.items,function(a){return _.contains(d,a.id)}),function(a){return d.indexOf(a.id)})}]};