let thingsToLoad = [
    "res/images/drone.png",
    "res/maps/map2.png"
];

let h = hexi(512, 512, setup, thingsToLoad, load);
h.fps = 16;
version = 1.1;
h.scaleToWindow();
h.start();
let target;
let obstacles = [];

DEBUG = true;
DRONE_SPEED=5;
CURRENT_MISSION=[];
HOME_BASE = {x: 285, y: 246};
MISSION_1 = [
    {x: 50, y: 50},
    {x: 200, y: 100},
    {x: 450, y: 200},
    {x: 450, y: 450},
    {x: 50, y: 50},
    HOME_BASE
];
MISSION_2 = [
    {x: 50, y: 50},
    {x: 50, y: 450},
    {x: 455, y: 440},
    {x: 455, y: 45, drop: true},
    HOME_BASE
];

function log(str){
    if (DEBUG){
        console.log(str);
    }
}

function load() {
    //Display the file currently being loaded
    console.log(`loading: ${h.loadingFile}`);
    //Display the percentage of files currently loaded
    console.log(`progress: ${h.loadingProgress}`);
    h.loadingBar();
}

function createLaser(length=110){
    laser = h.rectangle(length, 8, "greenyellow", "black", 0, 0, -17);
    laser.alpha = 0.5;
    laser.pivotY = 0.5;
    laser.circular = true;
    laser.visible = DEBUG;
    return laser;
}

function setup() {
    map = h.sprite("res/maps/map2.png");
    map.alpha = 0.70;

    h.laserA = createLaser();
    h.laserB = createLaser();
    h.laserC = createLaser();
    h.laserD = createLaser(80);
    h.laserE = createLaser(80);

    h.drone = h.sprite("res/images/drone.png", HOME_BASE.x, HOME_BASE.y);
    h.drone.scale.x = h.drone.scale.y = 0.10;
    h.drone.pivotY = h.drone.pivotX = 0.5;
    h.drone.tint = 0xffb366;

    target = h.circle(26, "blue", "black", 0, 0, -27);
    target.pivotX = target.pivotY = 0.5;
    target.visible = DEBUG;

    version = h.text("Version " + version, "14px puzzler", "black");
    version.x = 440;
    version.y = 490;

    mission1but = h.text("Mission 1", "14px puzzler", "black");
    mission1but.x = 5;
    mission1but.y = 490;
    mission1but.interact = true;
    mission1but.press = function() {
        h.increment=0;
        CURRENT_MISSION=MISSION_1;
        target.x = CURRENT_MISSION[h.increment].x;
        target.y = CURRENT_MISSION[h.increment].y; 
        drawObstacles();
        h.state = mission;
    }

    mission2but = h.text("Mission 2", "14px puzzler", "black");
    mission2but.x = 85;
    mission2but.y = 490;
    mission2but.interact = true;
    mission2but.press = function() {
        h.increment=0;
        CURRENT_MISSION=MISSION_2;
        target.x = CURRENT_MISSION[h.increment].x;
        target.y = CURRENT_MISSION[h.increment].y; 
        h.state = mission;
    }
}

function dropPackage(){
    h.rectangle(16, 16, "red", "black", 2, h.drone.x, h.drone.y);
}

function drawObstacles(){
    obstacles.push(h.circle(46, "gray", "black", 0, 110, 110));
    obstacles.push(h.circle(46, "gray", "black", 0, 315, 180));
    obstacles.push(h.circle(46, "gray", "black", 0, 100, 350));        
    obstacles.push(h.circle(46, "gray", "black", 0, 350, 350));
}

function completed(){

}

function mission() {
    navigateDrone();
    if (h.distance(h.drone, target) < 5 ){//&& h.increment < CURRENT_MISSION.length){
        if(h.increment >= CURRENT_MISSION.length){
            log("Landed safetly!");
            h.state = completed;
        }else{
            if (CURRENT_MISSION[h.increment].drop){
                dropPackage();
            }
            target.x = CURRENT_MISSION[h.increment].x;
            target.y = CURRENT_MISSION[h.increment].y; 
            h.increment++;
        }
    }
}

function testCollision(){
    //collision = 0;
    for (i=0; i<obstacles.length; i++){
        if (angledHitTest(h.laserA, obstacles[i])){
            log("lasers triggered!");
            h.laserA.alpha = 1;
            return 0.25;
        } else {
            h.laserA.alpha = 0.5;
        }
        if (angledHitTest(h.laserB, obstacles[i])){
            log("lasers triggered!");
            h.laserB.alpha = 1;
            return 0.35;
        } else {
            h.laserB.alpha = 0.5;
        }
        if (angledHitTest(h.laserC, obstacles[i])){
            log("lasers triggered!");
            h.laserC.alpha = 1;
            return -0.25;
        } else {
            h.laserC.alpha = 0.5;
        }
        if (angledHitTest(h.laserD, obstacles[i])){
            log("lasers triggered!");
            h.laserD.alpha = 1;
            return -0.20;
        } else {
            h.laserD.alpha = 0.5;
        }
        if (angledHitTest(h.laserE, obstacles[i])){
            log("lasers triggered!");
            h.laserE.alpha = 1;
            return 0.20;
        } else {
            h.laserE.alpha = 0.5;
        }
    }
    return 0;
}

function navigateDrone(){

    // Because Pixi is weird and will do infinite radians
    if (h.drone.rotation > 6.28){
        h.drone.rotation = 0;
    } else if (h.drone.rotation < -6.28){
        h.drone.rotation = 0;
    }

    collision = testCollision();
    if (collision != 0){
        h.drone.rotation += collision;
    }else{
        // Alter heading to point at current target position
        if(Math.floor(h.drone.rotation * 10) < Math.floor(h.angle(h.drone, target)* 10)){
            h.drone.rotation += 0.05;
        }else if(Math.floor(h.drone.rotation * 10) > Math.floor(h.angle(h.drone, target) * 10)){
            h.drone.rotation -= 0.05;
        }
    }

    // Update velocity from vector to cartesian.
    h.drone.vx = Math.cos(h.drone.rotation) * DRONE_SPEED;
    h.drone.vy = Math.sin(h.drone.rotation) * DRONE_SPEED;

    // Update laser positions relative to plane.
    h.laserA.x = h.drone.x;
    h.laserA.y = h.drone.y;
    h.laserA.rotation = h.drone.rotation-0.3;
    h.laserB.x = h.drone.x;
    h.laserB.y = h.drone.y;
    h.laserB.rotation = h.drone.rotation;
    h.laserC.x = h.drone.x;
    h.laserC.y = h.drone.y;
    h.laserC.rotation = h.drone.rotation+0.3;
    h.laserD.x = h.drone.x;
    h.laserD.y = h.drone.y;
    h.laserD.rotation = h.drone.rotation+0.55;
    h.laserE.x = h.drone.x;
    h.laserE.y = h.drone.y;
    h.laserE.rotation = h.drone.rotation-0.55;

    h.move(h.drone);
}

function drawAngle(sprite1, sprite2){
    for(var i=0; i<sprite1.width; i+=10){
        xValue = sprite1.x + (i * Math.cos(sprite1.rotation));
        yValue = sprite1.y + (i * Math.sin(sprite1.rotation));
        h.rectangle(2, 2, "red", "black", 0, xValue, yValue);
    }
    return false;
}

function angledHitTest(sprite1, sprite2){
    for(var i=0; i<sprite1.width; i+=10){
        xValue = sprite1.x + (i * Math.cos(sprite1.rotation));
        yValue = sprite1.y + (i * Math.sin(sprite1.rotation));
        if (h.hit({x: xValue, y:yValue, width:16, height:16}, sprite2)) {
            return true;
        }       
    }
    return false;
}