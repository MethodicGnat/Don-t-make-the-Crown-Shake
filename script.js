/*
anti-crownie rage simulator
bad ending = bro explodes
good ending = bro is the funniest guy you'll ever meet
true ending = unlock freakmasta
*/

const image = document.getElementById("image");
const caption = document.getElementById("caption");
const heading = document.querySelector("h1");
const choices_container = document.getElementById("choices-container");
const restartBttn = document.getElementById("restartBttn");
const skipBttn = document.getElementById("skipBttn");

//story constants
const JNG_OUTCOMES = ["STOLE", "MISSED"];

//vars
let current_scene; 
let path = []; 
let jngOutcome;
let treeNodes = new Map();
let nodeIdx = 0;

//node initiaization

//only binary choices are allowed
// a certain sequence of choices allows a true ending

//individual scenes
let introRoom = {
    image : "images\\pexels-ekrulila-2810775.jpg",
    text : "You have a 4-hour scrim session with Crownshake, but since you're a close teammate," +
    "you can call him Crownie.<br>" +
    "he's a nice guy, but there is a rule everyone and their mama should uphold around him:<br>" +
    "Don't make him rage.",
    choices : ["START!"]
};

let startingRoom = {
    image : "images\\pexels-ekrulila-2810775.jpg",
    text : "You're in game and your team has a dramatic lead.<br>How will you continue your performance?",
    choices : ["Troll", "Stop assisting Crownie"]
};

let trollRoute1 = {
    image : "images\\pexels-octoptimist-3150918.jpg",
    text : "You gave up your tempo and now your enemy has an advantage! They are now fighting a pivotal boss.<br>",
    choices : ["Move forward"]
};

let trollRoute2 = {
    image : "images\\pexels-octoptimist-3150918.jpg",
    text : "The objective is almost complete",
    choices : ["..."]
};

let trollRoute3 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text: "If your team doesn't get this, the odds are completely flipped in the enemy teams favor<br>" +
    "What will you do?",
    choices : ["Try stealing it", "Give it up and pray"]
};

let neglectRoute1 = {
    image : "images\\pexels-octoptimist-7042390.jpg",
    text : "You continue playing the game, except you're pretending Crownie doesn't exist.<br>" +
    "Thank goodness you were already playing well",
    choices : ["Move forward"]
};

let neglectRoute2 = {
    image : "images\\pexels-octoptimist-7042390.jpg",
    text : "However now Crownie claims that he has priority, but he's made the wrong call before<br>" +
    "will you hover him or keep playing as is?",
    choices : ["Get another teammate to babysit him", "Start hovering around him more"]
};

let babysitRoute1 = {
    image : "images\\pexels-octoptimist-7042390.jpg",
    text : "Refusing to spend another second on Crownie, you convince another teammate to babysit him.<br>" +
    "As you continue playing the game, now both Crownie and the other teamamte insist that a play can be made by them<br>" +
    "Will you give in or keep farming resources?",
    choices : ["Gank", "Keep farming"]
}

let hoverRoute1 = {
    image : "images\\pexels-octoptimist-7042390.jpg",
    text : "You give into Crownie and wait in a bush to ambush the enemy team",
    choices : ["Move forward"]
} 

let hoverRoute2 = {
    image: "images\\pexels-octoptimist-7042390.jpg",
    text : "Anndddd nobody was in a position to get ambushed.<br>" +
    "You've wasted a lot of time and lost a lot of resources<br>" +
    "How will you recover?",
    choices : ["invade enemy territory", "take Crownie's resources"]
}

let smiteRoute1 = {
    image : "images\\pexels-octoptimist-7042390.jpg",
    text : "To not take away too much, you decide to only take the most bountiful resource<br>" +
    "You quickly smite Crownie's cannon, but all of a sudden the game pauses<br>" +
    "CROWNIE LEFT THE GAME!",
    choices : ["What did you expect?"] 
}

let stealRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "You take the 50/50...",
    choices : ["Gamble"]
};

let missedRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "YOU MISSED IT!",
    choices : ["F"]
};

let missedRoute2 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "If a play doesn't happen now, you can kiss this game and Crownie's mental goodbye<br>",
    choices : ["make the play", "pray for a miracle"]
};

let foolRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "As you see an angle on the enemy, you try to activate your ultimate ability, but...<br>" +
    "YOU HAVE NO MANA!<br>" +
    "You just threw the game",
    choices : ["get banned for trolling"]
};

let stoleRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "YOU STOLE IT!",
    choices : ["LESS GOOOOO"]
};

let stoleRoute2 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "Now that you stole it... you need to get out<br>" +
    "the enemy team is still stronger than you cuz you trolled ¯\\_(ツ)_/¯",
    choices : ["•́ε•̀٥"]
};

let stoleRoute3 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "BUT ONE OF YOUR TEAMMATES IS FIGHTING! If you flee, there is a slim chance you can defend.<br>" +
    "<br>HOWEVER, if you fight and survive, you could win the game, but if you die..." +
    "<br>The outcome of the game is in your hands.",
    choices : ["Evade", "Go in"]
}

let finalFightRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "You are one teammate down, and your team begins to lose hope<br>" +
    "But you want that win, and with your unwavering determination you get a double kill!",
    choices : ["Move forward"]
}

let finalFightRoute2 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "The thrill of winning overtakes you.<br>" +
    "As you turn to look at your teammates to congratulate their performance...Your vision goes gray <br>" + 
    "You've died",
    choices : ["Move forward"]
}

let finalFightRoute3 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "Your teammates health bars plummet in unison<br>" +
    "In shame, you close your eyes and pray the enemy just ends the game quickly<br>" +
    "that's until you hear \"An enemy has been slain\"<br>",
    choices : ["it was a good fight ;D"]
}

let finalFightRoute4 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "Rift Alexa (the game's announcer) then continues to announce a double kill<br>" +
    "You open your eyes to see CROWNIE IS DESTROYING THE ENEMY TEAM!<br>" +
    "He has completely WIPED the enemy team, and once he rushes the enemy nexus, Rift Alexa declares your team's victory!",
    choices : ["LET'S GO CROWNIEEE!"]
}

let dropRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "Really man",
    choices : ["???"]
};

let dropRoute2 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "You declined gambling?",
    choices : ["no way this is bad ending"]
}

let evadeRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "You escape successfully, but unfortunately the same can't be said for your team<br>" +
    "You are left alone to defend your nexus" +
    "You don't see a defend option? You can't defend this xD",
    choices : ["rut roh"]
}

let carriedRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "Knowing that nerves can take over and do the worst, you decide to play safe<br>" +
    "with how strong the enemy team is though, being safe can only do so little<br>" +
    "but that is when you notice your team is somehow even in numbers",
    choices : ["Is this witchcraft?"]
}

let carriedRoute2 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "The enemy teams health bars keep dwindling, and that's when Rift Alexa announces Neme (your other teammate) has a triple kill!<br>" +
    "Neme saves the game and your incoming permaban for trolling :)",
    choices : ["I BELIEVE IN WITCHCRAFT!1!!"]
}

let invadeRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "Instead of taking Crownie's resources, you decide to sneak into the enemy jungle to steal their camps",
    choices : ["Move forward"]
}

let invadeRoute2 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "As you creep through their jungle, you spot the enemy near one of their camps.<br>" +
    "how will you choose to handle this?",
    choices : ["Let's dance", "ambush"]
}

let danceRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "You leap out of the enemy bush and immediately start dancing on them<br>" +
    "The enemy player, refusing to be danced on, dances back<br>" +
    "you've successfully initiated a dance battle.",
    choices : ["Keep dancing"]
}

let danceRoute2 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "You both are having a good time having a dance battle<br>" +
    "However all of a sudden the enemy just explodes!<br>" +
    "Your teammate saw the enemy seemingly idle and swiftly assassinated them.",
    choices : ["Kinda BM ngl"]
}

let ambushRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "You leap out of the enemy bush and try attacking the enemy<br>" +
    "They're startled and it seems like you have a chance<br>" +
    "But before you can even consider celebrating your efforts, you are met with 3 other enemy teamamtes, making you a free kill",
    choices : ["GG"]
}

let gankRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "With Crownie AND another teammate suggesting an opportunity, you decide to pay the enemy players near them a visit<br>" +
    "Thankfully, you are fortunate to see one of the strongest enemy team members on the team alone<br>" +
    "What kind of team just leaves their most valuable asset out in the open?",
    choices : ["Move forward"]
}

let gankRoute2 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "Will you take this perfect opportunity, or wait to be sure?",
    choices : ["Fight", "Hide in bush"]
}

let fightAdcRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "You quickly rush towards the strongest enemy player!<br>" +
    "Before they can get away you stun them, creating the perfect gank... but nobody on your team is following up<br>" +
    "That's when you notice just from the edge of your vision that the entire enemy team is prepared to defend this player.",
    choices : ["ITS THE AVENGERS"]
}

let hideMoreRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "You nearly scold yourself for not taking the perfect opportunity when you notice the entire enemy team appear before you<br>" +
    "Once you've seen they've left, and the only one there is the strongest enemy team member, you know you won't hesitate this time.",
    choices : ["Jump out"]
}

let hideMoreRoute2 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "Siezing the moment, you quickly make work of the enemy.<br>" +
    "Even if the enemy team wanted to react, it would be too late.<br>" +
    "From the enemy players death, you and your team rush the enemy nexus!",
    choices : ["Move forward"]
}

let farmingRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "You selfishly decide to keep playing for yourself.<br>" +
    "And like always, karma comes back to bite you.<br>" +
    "You may have not chosen to make a play for your teammates, but the enemy decided to make a play for their's." +
    "The enemy team pushes into your defenses.",
    choices : ["Move forward"]
}

let farmingRoute2 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "The moment is dire, and any misjudgement can and will immediately be punished<br>" +
    "You've made it this far, but you wouldn't want to make Crownie mad on the final stretch.<br>" +
    "Your game, your call.",
    choices : ["Return to base", "Initiate a base race"]
}

let baseRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "Seeing how playing stable has gotten you this far, you take the safest choice and return to base.<br>" +
    "What you didn't consider, however, is the time it will take to get back...<br>"+
    "As you hurry as fast as you can, you can't help but notice your nexus is already exposed<br>No matter how hard you try, you failed to prevent the inevitable.",
    choices : ["FF"]
}

let backDoorRoute1 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "Your team continues to beg for your return, but you realize that this is an all or nothing situation.<br>" +
    "You continue pressuring the enemy base.",
    choices : ["Move forward"]
}

let backDoorRoute2 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "Did you truly make the right choice?<br>As you reach the nexus, you anxiously attack it, as fear rings through your body.<br>" +
    "You and the enemy team have near similar pace in hitting the Nexus<br>" +
    "Curious of how close the match truly was, you review your nexus's health right before the game ended",
    choices : ["See results"]
}

let backDoorRoute3 = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    text : "1  H E A L T H",
    choices : ["Not even close"]
}

//scene groups
// "null" is in place of the appropriate ending
let introScene = [introRoom];
let startScene = [startingRoom];
let trollScene = [trollRoute1, trollRoute2, trollRoute3];
let neglectScene = [neglectRoute1, neglectRoute2];
let stealScene = [stealRoute1];
let missedScene = [missedRoute1, missedRoute2];
let stoleScene = [stoleRoute1, stoleRoute2, stoleRoute3];
let dropScene = [dropRoute1, dropRoute2, null];
let babysitScene = [babysitRoute1];
let hoverScene = [hoverRoute1, hoverRoute2];
let finalFightScene = [finalFightRoute1, finalFightRoute2, finalFightRoute3, finalFightRoute4, null];
let evadeScene = [evadeRoute1, null];
let foolScene = [foolRoute1, null];
let carriedScene = [carriedRoute1, carriedRoute2, null];
let smiteScene = [smiteRoute1, null];
let invadeScene = [invadeRoute1, invadeRoute2];
let danceScene = [danceRoute1, danceRoute2, null];
let ambushScene = [ambushRoute1, null];
let gankScene = [gankRoute1, gankRoute2];
let fightAdcScene = [fightAdcRoute1, null];
let farmingScene = [farmingRoute1, farmingRoute2];
let baseScene = [baseRoute1, null];
let backDoorScene = [backDoorRoute1, backDoorRoute2, backDoorRoute3, null];
let hideMoreScene = [hideMoreRoute1, hideMoreRoute2, null];

//ending objects
let goodEnding = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    heading : "Good Ending",
    text : "You won the game!<br>" +
    "all your teammates"
}

let badEnding = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    heading : "Bad Ending",
    text : "Crownie is angry, and whether you think it's your fault or not, remember the rule:<br>" +
    "Don't make him rage."
}

let trueEnding = {
    image : "images\\pexels-orlovamaria-4947011.jpg",
    heading: "True Ending",
    text : "You've unlocked the freakmasta"
}

//all scenes
let storyNodes = [
    introScene, 
    startScene, 
    trollScene, 
    neglectScene, 
    stealScene, 
    missedScene, 
    stoleScene, 
    dropScene,
    babysitScene,
    hoverScene,
    finalFightScene,
    evadeScene,
    badEnding,
    goodEnding,
    trueEnding,
    foolScene,
    carriedScene,
    smiteScene,
    invadeScene,
    danceScene,
    ambushScene,
    gankScene,
    fightAdcScene,
    hideMoreScene,
    farmingScene,
    baseScene,
    backDoorScene
];

let endingNodes = [goodEnding, badEnding, trueEnding];

function displayNode(node) {
    /*
    display node objects
        Precondition:
            node is an object in storyNodes
        Postcondition:
            the HTML document displays the node's contents
    */
   
    resetChoices();

    if (nodeIdx >= current_scene.length) nodeIdx = 0;
    if (nodeIdx === 0) {
        if (treeNodes.get(node) instanceof Tree) {current_scene = node;}
        path.push(node);
    }
    
    node = current_scene[nodeIdx];
    image.src = node.image;
    caption.innerHTML = node.text;
    let choices = node.choices;
    for (let i = 0; i < node.choices.length; i++) {
        let choice = document.createElement("button");
        let currentTreeNode = treeNodes.get(current_scene);
        let choiceNode;

        if (current_scene.length <= 1) {choiceNode = treeNodes.get(current_scene).children[i].node; skipBttn.hidden = true;}
        else if (current_scene.length > 1 && nodeIdx < current_scene.length - 1) {choiceNode = current_scene[nodeIdx][i]; skipBttn.hidden = false;}
        else {choiceNode = treeNodes.get(current_scene).children[i].node; skipBttn.hidden = true;}
        
        if (currentTreeNode.leaf) skipBttn.hidden = true;
        else if (current_scene.length > 1 && nodeIdx < current_scene.length - 1) skipBttn.hidden = false;
        else if (current_scene.length > 1 && nodeIdx >= current_scene.length - 1) skipBttn.hidden = true;
        // link children to this event. Order matters
        choice.name = i;
        choice.textContent = choices[i];
        choice.addEventListener("click", function () {
            try {
                if (current_scene.length > 1) {nodeIdx++;}
                displayNode(choiceNode);
            }
            catch (error) {
                
                evaluator();
            }
        });
        choices_container.append(choice);
    }
}


function displayEndingNode(node) {
    resetChoices();
    restartBttn.hidden = false;
    image.src = node.image;
    caption.innerHTML = node.text;
    heading.innerHTML = node.heading;
}


function moveBack() {
    if (endingNodes.includes(endingNodes)) return;
    if (path.length > 1) {
        path.pop();
        let prevPath = path[path.length - 1];
        current_scene = prevPath;
        nodeIdx = prevPath.length - 1;
        if (nodeIdx <= 0) path.pop();
        displayNode(prevPath); //must be scene
    }
}


function reset() {
    resetChoices();
    good_choice_count = 0;
    path = [];
    current_scene = introScene;
    jngOutcome = JNG_OUTCOMES[Math.round(Math.random() - 0.1)];
    restartBttn.hidden = true;
    heading.textContent = "Don't make the Crown Shake";
    chooseStealRoute();
    displayNode(introScene);
}


function resetChoices() {
    let initLength = choices_container.children.length;
    for (let i = 0; i < initLength; i++) {
        let choice = choices_container.children[0];
        choices_container.removeChild(choice);
    }
}


function evaluator() {
    if (GOOD_SCENES.includes(current_scene)) displayEndingNode(goodEnding);
    else if (path.toString() === TRUE_PATH.toString()) displayEndingNode(trueEnding);
    else displayEndingNode(badEnding);
}


//creating node tree
function treeify() {
    for (let i = 0; i < storyNodes.length; i++) {
        let node = new Tree(storyNodes[i]);
        treeNodes.set(storyNodes[i], node);
    }
    for (let i = 0; i < ROUTES.length; i++) {
        let parent = treeNodes.get(ROUTES[i][0]);
        let child = treeNodes.get(ROUTES[i][1]); 
        if (parent && child) {
            parent.children.push(child);
            child.parent = parent;
        }
    }
    for (let i = 0; i < treeNodes.size; i++) {
        let node = treeNodes.get(storyNodes[i]);
        node.root = treeNodes.get(startScene);
        if (node.children.length < 1) {
            node.leaf = true;
        }
    }
}


function chooseStealRoute() {
    //choose one of the routes
    let stealTreeNode = treeNodes.get(stealScene);
    switch (jngOutcome) {
        case JNG_OUTCOMES[0]:
            stealTreeNode.children[0] = treeNodes.get(stoleScene);
            break;
        case JNG_OUTCOMES[1]:
            stealTreeNode.children[0] = treeNodes.get(missedScene);
            break;
        default:
            break;
    }
}


function skipScene() {
    //skip scene routes to a scene with choices that change scene
    if (treeNodes.get(current_scene).leaf) return;
    nodeIdx = current_scene.length - 1;
    displayNode(current_scene);
}


class Tree {
    constructor(node, leaf = false, children = [], parent = null, isGood = false) {
        this.root = startScene;
        this.leaf = leaf;
        this.children = children;
        this.parent = parent;
        this.node = node;
        this.isGood = isGood
    }
}


const ROUTES = [
    [introScene, startScene],
    [startScene, trollScene],
    [startScene, neglectScene],
    [trollScene, stealScene],
    [trollScene, dropScene],
    [neglectScene, babysitScene],
    [neglectScene, hoverScene],
    [hoverScene, invadeScene],
    [hoverScene, smiteScene],
    [invadeScene, danceScene],
    [invadeScene, ambushScene],
    [stealScene, undefined], //value will be determined by chooseStealRoute function
    [stoleScene, evadeScene],
    [stoleScene, finalFightScene],
    [missedScene, foolScene],
    [missedScene, carriedScene],
    [babysitScene, gankScene],
    [babysitScene, farmingScene],
    [farmingScene, baseScene],
    [farmingScene, backDoorScene],
    [gankScene, fightAdcScene],
    [gankScene, hideMoreScene]
];

const GOOD_SCENES = [trollScene, stoleScene, danceScene, carriedScene, backDoorScene, hideMoreScene];
const TRUE_PATH = [introScene, startScene, trollScene, stealScene, stoleScene, finalFightScene];

//event listeners
document.addEventListener("keydown", function(event) { //WASD
    switch (event.key.toUpperCase()) {
        case ("A"):
            moveBack();
            break;
        case ("W"):
            if (!skipBttn.hidden) skipScene();
            break;
        case ("D"):
            if (!skipBttn.hidden) skipScene();
            break;
        case ("S"):
            moveBack();
            break;
        default:
            break;
    }
});

document.addEventListener("keydown", function(event) { //Arrow Keys
    switch (event.key) {
        case ("ArrowUp"):
            if (!skipBttn.hidden) skipScene();
            break;
        case ("ArrowDown"):
            moveBack();
            break;
        case ("ArrowLeft"):
            moveBack();
            break;
        case ("ArrowRight"):
            if (!skipBttn.hidden) skipScene();
            break;
        default:
            break;
    }
})

window.addEventListener("load", function() {
    treeify();
    reset();
});

skipBttn.addEventListener("click", skipScene);

restartBttn.addEventListener("click", reset);