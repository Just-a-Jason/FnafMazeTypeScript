(()=>{"use strict";class e{constructor(e,t,i,s,a){this.name=e,this.category=t,this.path=i,this.width=s,this.height=a;const r=new Image;r.src=i,r.onload=()=>{this.image=r},this.image=r}getCategory(){switch(this.category){case 0:return"Characters";case 2:return"Player Sprites";case 4:return"Custom Tiles";case 1:return"Solid tiles";case 6:return"Collectable items";case 5:return"Powerups";case 7:return"Decorations";default:return"Other"}}static toSpriteObject(t){return new e(t.name,t.category,t.path,t.width,t.height)}}class t{static async loadSprites(t=!0){const i=await this.makeRequest("Json/_buildin.json").then((e=>e.sprites)),s=new Array;for(const a of i)(3!==a.category||t)&&s.push(e.toSpriteObject(a));return s}static async makeRequest(e){const t=await fetch(e);return t.ok?t.json():(console.error(`AssetsLoader.makeRequest(url:string)\nCan't fetch: "${e}"`),null)}}class i{constructor(e=0,t=0){this.x=e,this.y=t}static Distance(e,t){return new i(t.x-e.x,t.y-e.y)}static Add(e,t){return new i(e.x+t.x,e.y+t.y)}static copy(e){return new i(e.x,e.y)}}class s{static drawSprite(e,t,s,a,r){const n=new i(s.width,s.height);a&&(n.x=a),r&&(n.y=r),e.drawImage(s.image,t.x-.5*n.x,t.y-.5*n.y,n.x,n.y)}static drawRectangle(e,t,i,s,a,r){e.save(),r&&(e.globalAlpha=r),e.fillStyle=a,e.fillRect(t.x-.5*i,t.y-.5*s,i,s),e.restore()}static DrawCircle(e,t,i,s,a){e.save(),e.beginPath(),e.fillStyle=s,a&&(e.globalAlpha=a),e.arc(t.x,t.y,i,0,2*Math.PI),e.fill(),e.restore()}static drawText(e,t,i,s,a="#fff",r){e.save(),r&&(e.font=r),e.fillStyle=a,e.fillText(t,i.x,i.y,s),e.restore()}static DrawProgressBar(e,t,i,s,a,r,n="#0f0",o="#000",l=0,c=0){let h=s/i*a;e.save(),e.fillStyle=o,e.fillRect(t.x,t.y,a,r),e.fillStyle=n,l>0&&(r-=l,t.y+=.5*l,t.x+=.5*l,h=s/i*(a-l)),1===c&&(h=-h,t.x+=a,t.x-=l),e.fillRect(t.x,t.y,h,r),e.restore()}static DrawStrokeRect(e,t,i="#fff",s,a,r,n){e.save(),e.beginPath(),e.rect(t.x-.5*a,t.y-.5*r,a,r),e.strokeStyle=i,n&&(e.globalAlpha=n),e.lineWidth=s,e.stroke(),e.restore()}}class a{constructor(e=new i,t,s){this.game=s,this.collisionPosition=new i,this.collisionEnabled=!0,this.collisionRadius=30,this.referenceName=t,this.position=e}CheckForCollisions(){}render(e){this.game.debug&&s.DrawCircle(e,this.position,this.collisionRadius,"#f00",.5),this.sprite&&s.drawSprite(e,this.position,this.sprite)}}class r{static CreateCategoryButton(e){const t=document.createElement("div");t.classList.add("categoryBtn");const i=document.createElement("p");i.innerText=e,t.appendChild(i);const s=document.createElement("div");return e=e.replace(" ","-"),s.id=e,s.classList.add("categoryList"),t.setAttribute("category-data",e),t.addEventListener("click",(e=>{const t=e.currentTarget.getAttribute("category-data"),i=document.querySelector(".categoryListActive");i&&i.id===t?i.classList.remove("categoryListActive"):(i?.classList.remove("categoryListActive"),document.querySelector(`.categoryList#${t}`).classList.add("categoryListActive"))})),{object:t,itemList:s}}static CreateTileSelectableButton(e){const t=document.createElement("div"),i=document.createElement("p");return i.innerText=e.name,t.setAttribute("tile-meta-name",e.name),t.classList.add("uiSelectableButton"),t.appendChild(i),t.appendChild(e.image),t}}class n{constructor(e){this.sprites=e,this.categorisedMenuItems=new Map,this.menu=null,this.selectableButtons=new Map,this.Init()}Init(){this.menu=document.querySelector(".editModeUI"),this.ReloadMenu(),n.Instance||(n.Instance=this),l.Instance?.setTileButtonAsActive(),document.querySelector(".categoryList")?.classList.add("categoryListActive")}ReloadMenu(){if(!this.menu)throw new Error("The menu object is not defined.");{this.Categorize();const e=this.menu.querySelector(".scroll-view");this.selectableButtons.clear(),e.innerHTML="";for(let t of this.categorisedMenuItems.keys()){const i=r.CreateCategoryButton(t);e.appendChild(i.object),e.appendChild(i.itemList);const s=this.categorisedMenuItems.get(t);for(const e of s){const t=r.CreateTileSelectableButton(e);t.addEventListener("click",(e=>{const t=e.currentTarget;if(t.classList.contains("selectedTile"))return;const i=document.querySelector(".selectedTile");i?.classList.remove("selectedTile");const s=t.getAttribute("tile-meta-name");l.Instance?.setSprite(s),t.classList.add("selectedTile")})),this.selectableButtons.set(e,t),i.itemList.appendChild(t)}}}}Categorize(){const e=new Map;this.categorisedMenuItems.clear();for(let t of this.sprites){const i=t.getCategory();e.has(t.getCategory())||e.set(t.getCategory(),new Array),e.get(i)?.push(t)}this.categorisedMenuItems=e}Log(){console.log(`All tiles categories count: ${this.categorisedMenuItems?.size}`),console.log(this.categorisedMenuItems)}}n.Instance=null;const o={NightmareFoxy:new e("NightmareFoxy",0,"Images/Sprites/Characters/NightmareFoxy.webp",70,70),GoldenFreddy:new e("GoldenFreddy",0,"Images/Sprites/Characters/GoldenFreddy.webp",70,70),Springtrap:new e("Springtrap",0,"Images/Sprites/Characters/Springtrap.webp",70,70),Bonnie:new e("Bonnie",0,"Images/Sprites/Characters/Bonnie.webp",70,70),Cupcake:new e("Cupcake",0,"Images/Sprites/Characters/Cupcake.webp",50,50),William:new e("William",0,"Images/Sprites/Characters/William.webp",70,70),Freddy:new e("Freddy",0,"Images/Sprites/Characters/Freddy.webp",70,70),Chica:new e("Chica",0,"Images/Sprites/Characters/Chica.webp",70,70),Foxy:new e("Foxy",0,"Images/Sprites/Characters/Foxy.webp",70,70),Guard:new e("Guard",2,"Images/Sprites/Player/Guard.webp",70,70),Wall:new e("Wall",1,"Images/Sprites/Solid Tiles/Wall.webp",70,70),DashedBG:new e("DashedBG",3,"Images/Assets/dashedbg.png",40,40),Cherry:new e("Cherry",6,"Images/Sprites/Collectables/cherry.webp",70,70),Mask:new e("Mask",5,"Images/Sprites/Powerups/mask.webp",70,70),FlashLight:new e("FlashLight",5,"Images/Sprites/Powerups/flashlight.webp",70,70),PhoneCall:new e("PhoneCall",5,"Images/Sprites/Powerups/phone call.webp",70,70),PinkBlock:new e("PinkBlock",4,"Images/Sprites/Custom Tiles/pink.webp",70,70),PizzeriaWall:new e("PizzeriaWall",1,"Images/Sprites/Solid Tiles/PizzeriaWall.webp",70,70),robotPice1:new e("robotPice1",7,"Images/Sprites/Decorations/robotPice1.webp",70,70),robotPice2:new e("robotPice2",7,"Images/Sprites/Decorations/robotPice2.webp",70,70),robotPice3:new e("robotPice3",7,"Images/Sprites/Decorations/robotPice3.webp",70,70),robotPice4:new e("robotPice4",7,"Images/Sprites/Decorations/robotPice4.webp",70,70),FamilyPizza:new e("FamilyPizza",6,"Images/Sprites/Collectables/full-pizza.webp",70,70),Hamburger:new e("Hamburger",6,"Images/Sprites/Collectables/hamburger.webp",70,70),PizzaSlice:new e("PizzaSlice",6,"Images/Sprites/Collectables/pizza-slice.webp",70,70),SoftDrink:new e("SoftDrink",6,"Images/Sprites/Collectables/soft-drink.webp",70,70),BlankWall:new e("BlankWall",1,"Images/Sprites/Solid Tiles/BlankWall.webp",70,70),Lolipop:new e("Lolipop",6,"Images/Sprites/Collectables/lolipop.webp",70,70),Door:new e("Door",1,"Images/Sprites/Solid Tiles/door.webp",70,70)};class l{constructor(e,t,s=Math.ceil(e.canvasWidth/t)){this.game=e,this.levelSize=t,this.rowMaxCells=s,this.cursorPosition=new i(.5*this.levelSize,.5*this.levelSize),this.grid=new Array,this.loadedSprites=Object.keys(o),this.selectedSpriteIdx=0,this.pattern=new Array,this.gridIndex=0,this.clickAudio=new Audio("Sounds/Effects/click.ogg"),this.selectedSprite=o[this.loadedSprites[0]],this.initGrid(),this.clickAudio.volume=.5,l.Instance||(l.Instance=this)}getSpritesArray(){let e=new Array;for(const t of this.loadedSprites){const i=o[t];3!==i.category&&e.push(i)}return e}setSprite(e){this.selectedSprite=o[e],this.clickAudio.play()}setTileButtonAsActive(){const e=document.querySelector(".selectedTile");e?.classList.remove("selectedTile");const t=n.Instance?.selectableButtons.get(this.selectedSprite);t.classList.add("selectedTile"),this.clickAudio.play()}initGrid(){for(let e=0;e<this.rowMaxCells;e++)for(let t=0;t<this.rowMaxCells;t++)(e+t)%2==0?this.pattern.push("#222"):this.pattern.push("#101314"),this.grid?.push(null);this.loadEmptyLevel()}placeSprite(){this.grid[this.gridIndex]=this.selectedSprite}removeSprite(){this.grid[this.gridIndex]=null}calculateGridIndex(){this.gridIndex=Math.floor(this.cursorPosition.x/this.levelSize)+Math.floor(this.cursorPosition.y/this.levelSize)*this.rowMaxCells}loadEmptyLevel(){this.addFullRow(0);for(let e=1;e<this.rowMaxCells-1;e++)this.addBoxedColumn(e);this.addFullRow(this.rowMaxCells-1)}addFullRow(e){for(let t=0;t<this.rowMaxCells;t++)this.grid[t+e*this.rowMaxCells]=o.Wall}addBoxedColumn(e){const t=e*this.rowMaxCells;this.grid[t]=o.Wall,this.grid[t+(this.rowMaxCells-1)]=o.Wall}changeSprite(e){this.selectedSpriteIdx+=e,console.log(this.selectedSpriteIdx),this.selectedSpriteIdx>this.loadedSprites.length-1&&(this.selectedSpriteIdx=0),this.selectedSpriteIdx<0&&(this.selectedSpriteIdx=this.loadedSprites.length-1);const t=this.loadedSprites[this.selectedSpriteIdx],i=o[t];this.selectedSprite=i,this.setTileButtonAsActive()}renderBackground(e){this.renderForeground(e)}renderForeground(e){}render(e){const t=new i(.5*this.levelSize,.5*this.levelSize);t.x-=this.game.mainCamera.position.x,t.y-=this.game.mainCamera.position.y;let a=0;for(let i=0;i<this.rowMaxCells;i++){for(let i=0;i<this.rowMaxCells;i++)s.drawRectangle(e,t,this.levelSize,this.levelSize,this.pattern[a]),null!==this.grid[a]&&(e.save(),e.filter="contrast(1.3)",s.drawSprite(e,t,this.grid[a],this.levelSize*this.game.mainCamera.cameraZoomAmount,this.levelSize*this.game.mainCamera.cameraZoomAmount),e.restore()),t.x+=this.levelSize,a++;t.x=.5*this.levelSize,t.x-=this.game.mainCamera.position.x,t.y+=this.levelSize}e.save(),e.filter="opacity(0.5) contrast(1.3)",s.drawSprite(e,this.cursorPosition,this.selectedSprite,this.levelSize,this.levelSize),e.restore();const r=i.copy(this.cursorPosition);r.x-=10*this.selectedSprite.name.length/2,r.y+=this.levelSize/1.5,s.drawText(e,this.selectedSprite.name,r,200,"#fff","10px 'Press Start 2P', cursive"),s.drawSprite(e,this.cursorPosition,o.DashedBG,this.levelSize,this.levelSize)}}l.Instance=null;class c{constructor(e,t){this.game=e,this.cameraName=t,this.position=new i,this.cameraZoomAmountMax=2,this.cameraZoomAmount=1,this.smoothing=10,this.id=0,this.speed=500,this.targetPosition=new i,this.id=c.nextId++}render(e){if(!this.game.debug)return;const t=new i(20,this.game.canvasHeight-20),a=new i(.5*this.game.canvasWidth,.5*this.game.canvasHeight);s.drawRectangle(e,a,this.game.canvasWidth,this.game.canvasHeight,"#f00",.1),s.DrawStrokeRect(e,a,"#fff",20,this.game.canvasWidth,this.game.canvasHeight,.5),s.DrawStrokeRect(e,a,"#f00",5,.2*this.game.canvasWidth,.2*this.game.canvasHeight,.5),s.drawText(e,this.cameraName,t,150,"#fff","20px 'Press Start 2P', cursive")}FollowTarget(e){}FollowPosition(){if(!this.targetPosition)return;const e=this.game.DeltaTime*this.speed;this.position.y<this.targetPosition.y&&(this.position.y+=e),this.position.y>this.targetPosition.y&&(this.position.y-=e),this.position.x<this.targetPosition.x&&(this.position.x+=e),this.position.x>this.targetPosition.x&&(this.position.x-=e)}}c.nextId=0;class h{constructor(e,t){this.canvasWidth=e,this.canvasHeight=t,this.mapEditor=new l(this,100),this.lastFrameTime=performance.now(),this.mainCamera=new c(this,"Main Camera"),this.renderable=new Array,this.UI=null,this.editMode=!0,this.debug=!1,this.DeltaTime=1,this.fps=0,this.uiSelectionMenu=new n(this.mapEditor.getSpritesArray())}addObject(e){this.renderable.push(e)}render(e){e.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.mainCamera.FollowPosition(),this.mapEditor.render(e),this.processAI(),this.renderable.forEach((t=>{t.render(e)})),this.UI?.render(e)}processAI(){this.calculateDeltaTime(),this.renderable.forEach((e=>{e.Main?.()}))}checkForCollision(e,t){const s=i.Distance(i.Add(e.collisionPosition,e.position),i.Add(t.collisionPosition,t.position)),a=Math.hypot(s.y,s.x),r=e.collisionRadius+t.collisionRadius;return[a<r,a,r,s]}findObjectByReferenceName(e){for(let t of this.renderable)if(t instanceof a&&t.referenceName===e)return t;return null}findObjectsByReferenceName(e){const t=new Array;for(let i of this.renderable)i.referenceName===e&&t.push(i);return t}findObjectByType(e,t){for(const i of this.renderable)if(i!==t&&i instanceof e&&i)return i;return null}findObjectsByType(e,t){const i=new Array;for(const s of this.renderable)s!==t&&s instanceof e&&s&&i.push(s);return i.length>0?i:null}calculateDeltaTime(){const e=performance.now(),t=e-this.lastFrameTime;this.DeltaTime=t/1e3,this.lastFrameTime=e,this.fps=Math.floor(1e3/t)}}function d(e,t,i){return e>i?i:e<t?t:e}const m=new Audio("Sounds/Music/Chase.ogg"),u=new Audio("Sounds/Music/Stomp.ogg");u.volume=1,m.loop=!0,m.volume=0;class p extends a{constructor(){super(...arguments),this.sprite=o.Guard,this.isChased=!1,this.normalSpeed=200,this.runSpeed=2*this.normalSpeed,this.speed=this.normalSpeed,this.fov=100,this.vibrationsRunner=null,this.running=!1,this.staminaMax=100,this.stamina=this.staminaMax}Main(){const e=navigator.getGamepads()[0];if(this.Move(e),this.isChased&&m.volume<1){this.vibrationsRunner||(this.vibrationsRunner=setInterval(this.DramaticVibrations,1e3)),m.paused&&m.play();const e=d(m.volume+this.game.DeltaTime/10,0,1);m.volume=e}else if(m.volume>0&&!this.isChased){const e=d(m.volume-this.game.DeltaTime/10,0,1);0===e&&(m.currentTime=0,m.pause(),this.vibrationsRunner&&(clearInterval(this.vibrationsRunner),this.vibrationsRunner=null)),m.volume=e}}render(e){super.render(e),this.game.debug&&s.DrawCircle(e,this.position,this.fov,"#ff0",.2)}DramaticVibrations(){const e=navigator.getGamepads()[0];u.paused&&u.play(),e?.vibrationActuator?.playEffect("dual-rumble",{strongMagnitude:m.volume,duration:300})}Move(e){if(e){this.HandleGamePadButtonsInput(e);const t=.4,s=Math.abs(e.axes[0])>t?e.axes[0]:0,a=Math.abs(e.axes[1])>t?e.axes[1]:0,r=new i(s*this.speed*this.game.DeltaTime,a*this.speed*this.game.DeltaTime);this.position.x+=r.x,this.position.y+=r.y}this.position.x+this.collisionRadius>this.game.canvasWidth&&(this.position.x=this.game.canvasWidth-this.collisionRadius),this.position.x<this.collisionRadius&&(this.position.x=this.collisionRadius),this.position.y+this.collisionRadius>this.game.canvasHeight&&(this.position.y=this.game.canvasHeight-this.collisionRadius),this.position.y-this.collisionRadius<0&&(this.position.y=this.collisionRadius)}HandleGamePadButtonsInput(e){this.running=e.buttons[10].pressed,this.running&&this.stamina>1?this.speed=this.runSpeed:this.speed=this.normalSpeed,this.running&&this.stamina>1?this.stamina=d(this.stamina-30*this.game.DeltaTime,1,this.staminaMax):!this.running&&this.stamina<this.staminaMax&&(this.stamina=d(this.stamina+15*this.game.DeltaTime,0,this.staminaMax))}getStaminaPercent(){return this.stamina/this.staminaMax}}class g{constructor(e){this.game=e,this.player=null,this.currentValue=0}render(e){this.player?this.DrawPlayerUI(e):this.player=this.game.findObjectByType(p),this.game.mainCamera.render(e),this.DrawFpsCounter(e)}DrawFpsCounter(e){if(this.game.debug){const t=new i(this.game.canvasWidth),a=new i(200,80),r=20,n=new i(this.game.canvasWidth-.5*a.x+.5*r,.5*a.y-.5*r);s.drawRectangle(e,t,a.x,a.y,"#000"),s.drawText(e,`FPS: ${this.game.fps}`,n,80,"#fff",`${r}px 'Press Start 2P', cursive`)}this.currentValue=d(this.currentValue+100*this.game.DeltaTime,0,200)}DrawPlayerUI(e){}}Array(),window.addEventListener("load",(async()=>{const e=new Audio("Sounds/Music/music.ogg");e.loop=!0;const s=document.querySelector("canvas#game-canvas"),a=s.getContext("2d");s.height=800,s.width=800;const r=new h(s.width,s.height);r.UI=new g(r),console.log(await t.loadSprites()),console.log(await t.loadSprites(!1)),s.addEventListener("mousemove",(e=>{if(0===o){const t=.5*r.mapEditor.levelSize,s=d(e.offsetX,t,r.canvasWidth),a=d(e.offsetY,t,r.canvasHeight);let n=Math.ceil(s/t),o=Math.ceil(a/t);n%2==0&&n--,o%2==0&&o--;const l=new i(Math.round(n*t),Math.round(o*t));r.mapEditor.cursorPosition=l}})),s.addEventListener("contextmenu",(e=>{e.preventDefault()})),s.addEventListener("mousedown",(t=>{if(e.play(),!r.editMode)return;const i=r.mapEditor;i.calculateGridIndex(),0===t.button&&i.placeSprite(),2===t.button&&i.removeSprite()}));let n,o=0;function l(){const e=navigator.getGamepads()[0];if(e&&(e.buttons[7].pressed&&e.buttons[1].pressed&&(r.debug=!r.debug),r.editMode)){const t=r.mapEditor.cursorPosition,s=r.mapEditor.levelSize,a={minimum:.5*s,maximum:s*(r.mapEditor.rowMaxCells-.5)},n=new i(0,0),o=r.mapEditor;e.buttons[15].pressed&&(n.x=1),e.buttons[14].pressed&&(n.x=-1),e.buttons[12].pressed&&(n.y=-1),e.buttons[13].pressed&&(n.y=1),t.x=d(t.x+s*n.x,a.minimum,a.maximum),t.y=d(t.y+s*n.y,a.minimum,a.maximum),0===n.x&&0===n.y||o.calculateGridIndex(),e.buttons[0].pressed&&o.placeSprite(),e.buttons[1].pressed&&!r.debug&&o.removeSprite(),e.buttons[4].pressed&&(o.changeSprite(-1),e.vibrationActuator?.playEffect("dual-rumble",{duration:100,weakMagnitude:.7})),e.buttons[5].pressed&&(o.changeSprite(1),e.vibrationActuator?.playEffect("dual-rumble",{duration:100,weakMagnitude:.7}))}}window.addEventListener("gamepadconnected",(e=>{n=setInterval(l,100),console.info(`Gamepad connected. ID(${e.gamepad.id})`),o=1})),window.addEventListener("gamepaddisconnected",(e=>{clearInterval(n),n=null,console.info(`Gamepad disconnected. ID(${e.gamepad.id})`),o=0})),window.addEventListener("keydown",(e=>{if(r.editMode){const t=r.mainCamera,i=r.mapEditor.levelSize,s=t.targetPosition;switch(e.key){case"w":s.y+=-i;break;case"s":s.y+=i;break;case"a":s.x+=-i;break;case"d":s.x+=i;break;case"q":r.mapEditor.changeSprite(-1);break;case"e":r.mapEditor.changeSprite(1)}}})),s.addEventListener("wheel",(e=>{const t=r.mainCamera,i=-e.deltaY*r.DeltaTime/100;t.cameraZoomAmount=d(t.cameraZoomAmount+i,.5,t.cameraZoomAmountMax)})),function e(){r.render(a),requestAnimationFrame(e)}()}))})();