(() => {
  "use strict";
  class e {
    constructor(e, t, i, s, a) {
      (this.name = e),
        (this.category = t),
        (this.path = i),
        (this.width = s),
        (this.height = a),
        (this.path = "Images/" + this.path);
      const r = new Image();
      (r.src = this.path),
        (r.onload = () => {
          this.image = r;
        }),
        (this.image = r);
    }
    getCategory() {
      switch (this.category) {
        case 0:
          return "Characters";
        case 2:
          return "Player Sprites";
        case 4:
          return "Custom Tiles";
        case 1:
          return "Solid tiles";
        case 6:
          return "Collectable items";
        case 5:
          return "Powerups";
        case 7:
          return "Decorations";
        default:
          return "Other";
      }
    }
    static toSpriteObject(t) {
      return new e(t.name, t.category, t.path, t.width, t.height);
    }
  }
  class t {
    static async loadSprites(t = !0) {
      const i = await this.makeRequest("Json/_buildin.json").then(
          (e) => e.sprites
        ),
        s = new Array();
      for (const a of i) (3 !== a.category || t) && s.push(e.toSpriteObject(a));
      return s;
    }
    static async makeRequest(e) {
      const t = await fetch(e);
      return t.ok
        ? t.json()
        : (console.error(
            `AssetsLoader.makeRequest(url:string)\nCan't fetch: "${e}"`
          ),
          null);
    }
  }
  class i {
    constructor(e = 0, t = 0) {
      (this.x = e), (this.y = t);
    }
    static Distance(e, t) {
      return new i(t.x - e.x, t.y - e.y);
    }
    static Add(e, t) {
      return new i(e.x + t.x, e.y + t.y);
    }
    static copy(e) {
      return new i(e.x, e.y);
    }
  }
  class s {
    static drawSprite(e, t, s, a, r) {
      const n = new i(s.width, s.height);
      a && (n.x = a),
        r && (n.y = r),
        e.drawImage(s.image, t.x - 0.5 * n.x, t.y - 0.5 * n.y, n.x, n.y);
    }
    static drawRectangle(e, t, i, s, a, r) {
      e.save(),
        r && (e.globalAlpha = r),
        (e.fillStyle = a),
        e.fillRect(t.x - 0.5 * i, t.y - 0.5 * s, i, s),
        e.restore();
    }
    static DrawCircle(e, t, i, s, a) {
      e.save(),
        e.beginPath(),
        (e.fillStyle = s),
        a && (e.globalAlpha = a),
        e.arc(t.x, t.y, i, 0, 2 * Math.PI),
        e.fill(),
        e.restore();
    }
    static drawText(e, t, i, s, a = "#fff", r) {
      e.save(),
        r && (e.font = r),
        (e.fillStyle = a),
        e.fillText(t, i.x, i.y, s),
        e.restore();
    }
    static DrawProgressBar(
      e,
      t,
      i,
      s,
      a,
      r,
      n = "#0f0",
      o = "#000",
      l = 0,
      c = 0
    ) {
      let h = (s / i) * a;
      e.save(),
        (e.fillStyle = o),
        e.fillRect(t.x, t.y, a, r),
        (e.fillStyle = n),
        l > 0 &&
          ((r -= l),
          (t.y += 0.5 * l),
          (t.x += 0.5 * l),
          (h = (s / i) * (a - l))),
        1 === c && ((h = -h), (t.x += a), (t.x -= l)),
        e.fillRect(t.x, t.y, h, r),
        e.restore();
    }
    static DrawStrokeRect(e, t, i = "#fff", s, a, r, n) {
      e.save(),
        e.beginPath(),
        e.rect(t.x - 0.5 * a, t.y - 0.5 * r, a, r),
        (e.strokeStyle = i),
        n && (e.globalAlpha = n),
        (e.lineWidth = s),
        e.stroke(),
        e.restore();
    }
  }
  class a {
    constructor(e = new i(), t, s) {
      (this.game = s),
        (this.collisionPosition = new i()),
        (this.collisionEnabled = !0),
        (this.collisionRadius = 30),
        (this.referenceName = t),
        (this.position = e);
    }
    CheckForCollisions() {}
    render(e) {
      this.game.debug &&
        s.DrawCircle(e, this.position, this.collisionRadius, "#f00", 0.5),
        this.sprite && s.drawSprite(e, this.position, this.sprite);
    }
  }
  class r {
    static createCategoryButton(e) {
      const t = document.createElement("div");
      t.classList.add("categoryBtn");
      const i = document.createElement("p");
      (i.innerText = e), t.appendChild(i);
      const s = document.createElement("div");
      return (
        (e = e.replace(" ", "-")),
        (s.id = e),
        s.classList.add("categoryList"),
        t.setAttribute("category-data", e),
        t.addEventListener("click", (e) => {
          const t = e.currentTarget.getAttribute("category-data"),
            i = document.querySelector(".categoryListActive");
          i && i.id === t
            ? i.classList.remove("categoryListActive")
            : (i?.classList.remove("categoryListActive"),
              document
                .querySelector(`.categoryList#${t}`)
                .classList.add("categoryListActive"));
        }),
        { object: t, itemList: s }
      );
    }
    static createTileSelectableButton(e) {
      const t = document.createElement("div"),
        i = document.createElement("p");
      return (
        (i.innerText = e.name),
        t.setAttribute("tile-meta-name", e.name),
        t.classList.add("uiSelectableButton"),
        t.appendChild(i),
        t.appendChild(e.image),
        t
      );
    }
  }
  class n {
    constructor(e) {
      (this.sprites = e),
        (this.categorisedMenuItems = new Map()),
        (this.menu = null),
        (this.selectableButtons = new Map()),
        this.init();
    }
    init() {
      (this.menu = document.querySelector(".editModeUI")),
        this.reloadMenu(),
        n.Instance || (n.Instance = this),
        c.Instance?.setTileButtonAsActive(),
        document
          .querySelector(".categoryList")
          ?.classList.add("categoryListActive");
    }
    reloadMenu() {
      if (!this.menu) throw new Error("The menu object is not defined.");
      {
        this.categorize();
        const e = this.menu.querySelector(".scroll-view");
        this.selectableButtons.clear(), (e.innerHTML = "");
        for (let t of this.categorisedMenuItems.keys()) {
          const i = r.createCategoryButton(t);
          e.appendChild(i.object), e.appendChild(i.itemList);
          const s = this.categorisedMenuItems.get(t);
          for (const e of s) {
            const t = r.createTileSelectableButton(e);
            t.addEventListener("click", (e) => {
              const t = e.currentTarget;
              if (t.classList.contains("selectedTile")) return;
              const i = document.querySelector(".selectedTile");
              i?.classList.remove("selectedTile");
              const s = t.getAttribute("tile-meta-name");
              c.Instance?.setSprite(s), t.classList.add("selectedTile");
            }),
              this.selectableButtons.set(e, t),
              i.itemList.appendChild(t);
          }
        }
      }
    }
    categorize() {
      const e = new Map();
      this.categorisedMenuItems.clear();
      for (let t of this.sprites) {
        const i = t.getCategory();
        e.has(t.getCategory()) || e.set(t.getCategory(), new Array()),
          e.get(i)?.push(t);
      }
      (this.categorisedMenuItems = e), console.log(e);
    }
    Log() {
      console.log(
        `All tiles categories count: ${this.categorisedMenuItems?.size}`
      ),
        console.log(this.categorisedMenuItems);
    }
  }
  n.Instance = null;
  const o = {
    NightmareFoxy: new e(
      "NightmareFoxy",
      0,
      "Sprites/Characters/NightmareFoxy.webp",
      70,
      70
    ),
    GoldenFreddy: new e(
      "GoldenFreddy",
      0,
      "Sprites/Characters/GoldenFreddy.webp",
      70,
      70
    ),
    Springtrap: new e(
      "Springtrap",
      0,
      "Sprites/Characters/Springtrap.webp",
      70,
      70
    ),
    Bonnie: new e("Bonnie", 0, "Sprites/Characters/Bonnie.webp", 70, 70),
    Cupcake: new e("Cupcake", 0, "Sprites/Characters/Cupcake.webp", 50, 50),
    William: new e("William", 0, "Sprites/Characters/William.webp", 70, 70),
    Freddy: new e("Freddy", 0, "Sprites/Characters/Freddy.webp", 70, 70),
    Chica: new e("Chica", 0, "Sprites/Characters/Chica.webp", 70, 70),
    Foxy: new e("Foxy", 0, "Sprites/Characters/Foxy.webp", 70, 70),
    Guard: new e("Guard", 2, "Sprites/Player/Guard.webp", 70, 70),
    Wall: new e("Wall", 1, "Sprites/Solid Tiles/Wall.webp", 70, 70),
    DashedBG: new e("DashedBG", 3, "Assets/dashedbg.png", 40, 40),
    Cherry: new e("Cherry", 6, "Sprites/Collectables/cherry.webp", 70, 70),
    Mask: new e("Mask", 5, "Sprites/Powerups/mask.webp", 70, 70),
    FlashLight: new e(
      "FlashLight",
      5,
      "Sprites/Powerups/flashlight.webp",
      70,
      70
    ),
    PhoneCall: new e(
      "PhoneCall",
      5,
      "Sprites/Powerups/phone call.webp",
      70,
      70
    ),
    PinkBlock: new e("PinkBlock", 4, "Sprites/Custom Tiles/pink.webp", 70, 70),
    PizzeriaWall: new e(
      "PizzeriaWall",
      1,
      "Sprites/Solid Tiles/PizzeriaWall.webp",
      70,
      70
    ),
    robotPice1: new e(
      "robotPice1",
      7,
      "Sprites/Decorations/robotPice1.webp",
      70,
      70
    ),
    robotPice2: new e(
      "robotPice2",
      7,
      "Sprites/Decorations/robotPice2.webp",
      70,
      70
    ),
    robotPice3: new e(
      "robotPice3",
      7,
      "Sprites/Decorations/robotPice3.webp",
      70,
      70
    ),
    robotPice4: new e(
      "robotPice4",
      7,
      "Sprites/Decorations/robotPice4.webp",
      70,
      70
    ),
    FamilyPizza: new e(
      "FamilyPizza",
      6,
      "Sprites/Collectables/full-pizza.webp",
      70,
      70
    ),
    Hamburger: new e(
      "Hamburger",
      6,
      "Sprites/Collectables/hamburger.webp",
      70,
      70
    ),
    PizzaSlice: new e(
      "PizzaSlice",
      6,
      "Sprites/Collectables/pizza-slice.webp",
      70,
      70
    ),
    SoftDrink: new e(
      "SoftDrink",
      6,
      "Sprites/Collectables/soft-drink.webp",
      70,
      70
    ),
    BlankWall: new e(
      "BlankWall",
      1,
      "Sprites/Solid Tiles/BlankWall.webp",
      70,
      70
    ),
    Lolipop: new e("Lolipop", 6, "Sprites/Collectables/lolipop.webp", 70, 70),
    Door: new e("Door", 1, "Sprites/Solid Tiles/door.webp", 70, 70),
  };
  function l(e, t, i) {
    return e > i ? i : e < t ? t : e;
  }
  class c {
    constructor(e, t, s = Math.ceil(e.canvasWidth / t)) {
      (this.game = e),
        (this.levelSize = t),
        (this.rowMaxCells = s),
        (this.cursorPosition = new i(
          0.5 * this.levelSize,
          0.5 * this.levelSize
        )),
        (this.grid = new Array()),
        (this.sprites = null),
        (this.selectedSpriteIdx = 0),
        (this.pattern = new Array()),
        (this.gridIndex = 0),
        (this.clickAudio = new Audio("Sounds/Effects/click.ogg")),
        (this.selectedSprite = null),
        this.initGrid(),
        (this.clickAudio.volume = 0.5),
        c.Instance || (c.Instance = this);
    }
    setSprites(e) {
      this.sprites = e;
    }
    getSprites() {
      return this.sprites;
    }
    setSprite(e) {
      (this.selectedSpriteIdx = this.getIndexOfSprite(e)),
        console.log(e, this.selectedSpriteIdx),
        (this.selectedSprite = this.sprites[this.selectedSpriteIdx]),
        this.clickAudio.play();
    }
    getIndexOfSprite(e) {
      let t = 0;
      console.log("geting index"), console.log(this.sprites);
      for (const i of this.sprites) {
        if (i.name === e) return t;
        t++;
      }
      return -1;
    }
    setTileButtonAsActive() {
      if (null === this.selectedSprite) return;
      const e = document.querySelector(".selectedTile");
      e?.classList.remove("selectedTile");
      const t = n.Instance?.selectableButtons.get(this.selectedSprite);
      t?.classList.add("selectedTile"), this.clickAudio.play();
    }
    initGrid() {
      for (let e = 0; e < this.rowMaxCells; e++)
        for (let t = 0; t < this.rowMaxCells; t++)
          (e + t) % 2 == 0
            ? this.pattern.push("#222")
            : this.pattern.push("#101314"),
            this.grid?.push(null);
      this.loadEmptyLevel();
    }
    placeSprite() {
      this.grid[this.gridIndex] = this.selectedSprite;
    }
    removeSprite() {
      this.grid[this.gridIndex] = null;
    }
    calculateGridIndex() {
      this.gridIndex =
        Math.floor(this.cursorPosition.x / this.levelSize) +
        Math.floor(this.cursorPosition.y / this.levelSize) * this.rowMaxCells;
    }
    loadEmptyLevel() {
      this.addFullRow(0);
      for (let e = 1; e < this.rowMaxCells - 1; e++) this.addBoxedColumn(e);
      this.addFullRow(this.rowMaxCells - 1);
    }
    addFullRow(e) {
      for (let t = 0; t < this.rowMaxCells; t++)
        this.grid[t + e * this.rowMaxCells] = o.Wall;
    }
    addBoxedColumn(e) {
      const t = e * this.rowMaxCells;
      (this.grid[t] = o.Wall), (this.grid[t + (this.rowMaxCells - 1)] = o.Wall);
    }
    changeSprite(e) {
      (this.selectedSpriteIdx = l(
        this.selectedSpriteIdx + e,
        0,
        this.sprites.length
      )),
        (this.selectedSprite = this.sprites[this.selectedSpriteIdx]),
        this.setTileButtonAsActive();
    }
    renderBackground(e) {
      this.renderForeground(e);
    }
    renderForeground(e) {}
    render(e) {
      const t = new i(0.5 * this.levelSize, 0.5 * this.levelSize);
      (t.x -= this.game.mainCamera.position.x),
        (t.y -= this.game.mainCamera.position.y);
      let a = 0;
      for (let i = 0; i < this.rowMaxCells; i++) {
        for (let i = 0; i < this.rowMaxCells; i++)
          s.drawRectangle(
            e,
            t,
            this.levelSize,
            this.levelSize,
            this.pattern[a]
          ),
            null !== this.grid[a] &&
              (e.save(),
              (e.filter = "contrast(1.3)"),
              s.drawSprite(
                e,
                t,
                this.grid[a],
                this.levelSize * this.game.mainCamera.cameraZoomAmount,
                this.levelSize * this.game.mainCamera.cameraZoomAmount
              ),
              e.restore()),
            (t.x += this.levelSize),
            a++;
        (t.x = 0.5 * this.levelSize),
          (t.x -= this.game.mainCamera.position.x),
          (t.y += this.levelSize);
      }
      this.drawSelectedSprite(e);
    }
    drawSelectedSprite(e) {
      if (this.selectedSprite) {
        e.save(),
          (e.filter = "opacity(0.5) contrast(1.3)"),
          s.drawSprite(
            e,
            this.cursorPosition,
            this.selectedSprite,
            this.levelSize,
            this.levelSize
          ),
          e.restore();
        const t = i.copy(this.cursorPosition);
        (t.x -= (10 * this.selectedSprite.name.length) / 2),
          (t.y += this.levelSize / 1.5),
          s.drawText(
            e,
            this.selectedSprite.name,
            t,
            200,
            "#fff",
            "10px 'Press Start 2P', cursive"
          ),
          s.drawSprite(
            e,
            this.cursorPosition,
            o.DashedBG,
            this.levelSize,
            this.levelSize
          );
      }
    }
  }
  c.Instance = null;
  class h {
    constructor(e, t) {
      (this.game = e),
        (this.cameraName = t),
        (this.position = new i()),
        (this.cameraZoomAmountMax = 2),
        (this.cameraZoomAmount = 1),
        (this.smoothing = 10),
        (this.id = 0),
        (this.speed = 500),
        (this.targetPosition = new i()),
        (this.id = h.nextId++);
    }
    render(e) {
      if (!this.game.debug) return;
      const t = new i(20, this.game.canvasHeight - 20),
        a = new i(0.5 * this.game.canvasWidth, 0.5 * this.game.canvasHeight);
      s.drawRectangle(
        e,
        a,
        this.game.canvasWidth,
        this.game.canvasHeight,
        "#f00",
        0.1
      ),
        s.DrawStrokeRect(
          e,
          a,
          "#fff",
          20,
          this.game.canvasWidth,
          this.game.canvasHeight,
          0.5
        ),
        s.DrawStrokeRect(
          e,
          a,
          "#f00",
          5,
          0.2 * this.game.canvasWidth,
          0.2 * this.game.canvasHeight,
          0.5
        ),
        s.drawText(
          e,
          this.cameraName,
          t,
          150,
          "#fff",
          "20px 'Press Start 2P', cursive"
        );
    }
    followTarget(e) {}
    followPosition() {
      (this.position.x = this.targetPosition.x),
        (this.position.y = this.targetPosition.y);
    }
  }
  h.nextId = 0;
  class d {
    constructor(e, t) {
      (this.canvasWidth = e),
        (this.canvasHeight = t),
        (this.mapEditor = new c(this, 100)),
        (this.lastFrameTime = performance.now()),
        (this.mainCamera = new h(this, "Main Camera")),
        (this.renderable = new Array()),
        (this.UI = null),
        (this.editMode = !0),
        (this.debug = !1),
        (this.DeltaTime = 1),
        (this.fps = 0);
    }
    addObject(e) {
      this.renderable.push(e);
    }
    render(e) {
      e.clearRect(0, 0, this.canvasWidth, this.canvasHeight),
        this.mainCamera.followPosition(),
        this.mapEditor.render(e),
        this.processAI(),
        this.renderable.forEach((t) => {
          t.render(e);
        }),
        this.UI?.render(e);
    }
    processAI() {
      this.calculateDeltaTime(),
        this.renderable.forEach((e) => {
          e.Main?.();
        });
    }
    checkForCollision(e, t) {
      const s = i.Distance(
          i.Add(e.collisionPosition, e.position),
          i.Add(t.collisionPosition, t.position)
        ),
        a = Math.hypot(s.y, s.x),
        r = e.collisionRadius + t.collisionRadius;
      return [a < r, a, r, s];
    }
    findObjectByReferenceName(e) {
      for (let t of this.renderable)
        if (t instanceof a && t.referenceName === e) return t;
      return null;
    }
    findObjectsByReferenceName(e) {
      const t = new Array();
      for (let i of this.renderable) i.referenceName === e && t.push(i);
      return t;
    }
    findObjectByType(e, t) {
      for (const i of this.renderable)
        if (i !== t && i instanceof e && i) return i;
      return null;
    }
    findObjectsByType(e, t) {
      const i = new Array();
      for (const s of this.renderable)
        s !== t && s instanceof e && s && i.push(s);
      return i.length > 0 ? i : null;
    }
    calculateDeltaTime() {
      const e = performance.now(),
        t = e - this.lastFrameTime;
      (this.DeltaTime = t / 1e3),
        (this.lastFrameTime = e),
        (this.fps = Math.floor(1e3 / t));
    }
  }
  const p = new Audio("Sounds/Music/Chase.ogg"),
    u = new Audio("Sounds/Music/Stomp.ogg");
  (u.volume = 1), (p.loop = !0), (p.volume = 0);
  class m extends a {
    constructor() {
      super(...arguments),
        (this.sprite = o.Guard),
        (this.isChased = !1),
        (this.normalSpeed = 200),
        (this.runSpeed = 2 * this.normalSpeed),
        (this.speed = this.normalSpeed),
        (this.fov = 100),
        (this.vibrationsRunner = null),
        (this.running = !1),
        (this.staminaMax = 100),
        (this.stamina = this.staminaMax);
    }
    Main() {
      const e = navigator.getGamepads()[0];
      if ((this.Move(e), this.isChased && p.volume < 1)) {
        this.vibrationsRunner ||
          (this.vibrationsRunner = setInterval(this.DramaticVibrations, 1e3)),
          p.paused && p.play();
        const e = l(p.volume + this.game.DeltaTime / 10, 0, 1);
        p.volume = e;
      } else if (p.volume > 0 && !this.isChased) {
        const e = l(p.volume - this.game.DeltaTime / 10, 0, 1);
        0 === e &&
          ((p.currentTime = 0),
          p.pause(),
          this.vibrationsRunner &&
            (clearInterval(this.vibrationsRunner),
            (this.vibrationsRunner = null))),
          (p.volume = e);
      }
    }
    render(e) {
      super.render(e),
        this.game.debug &&
          s.DrawCircle(e, this.position, this.fov, "#ff0", 0.2);
    }
    DramaticVibrations() {
      const e = navigator.getGamepads()[0];
      u.paused && u.play(),
        e?.vibrationActuator?.playEffect("dual-rumble", {
          strongMagnitude: p.volume,
          duration: 300,
        });
    }
    Move(e) {
      if (e) {
        this.HandleGamePadButtonsInput(e);
        const t = 0.4,
          s = Math.abs(e.axes[0]) > t ? e.axes[0] : 0,
          a = Math.abs(e.axes[1]) > t ? e.axes[1] : 0,
          r = new i(
            s * this.speed * this.game.DeltaTime,
            a * this.speed * this.game.DeltaTime
          );
        (this.position.x += r.x), (this.position.y += r.y);
      }
      this.position.x + this.collisionRadius > this.game.canvasWidth &&
        (this.position.x = this.game.canvasWidth - this.collisionRadius),
        this.position.x < this.collisionRadius &&
          (this.position.x = this.collisionRadius),
        this.position.y + this.collisionRadius > this.game.canvasHeight &&
          (this.position.y = this.game.canvasHeight - this.collisionRadius),
        this.position.y - this.collisionRadius < 0 &&
          (this.position.y = this.collisionRadius);
    }
    HandleGamePadButtonsInput(e) {
      (this.running = e.buttons[10].pressed),
        this.running && this.stamina > 1
          ? (this.speed = this.runSpeed)
          : (this.speed = this.normalSpeed),
        this.running && this.stamina > 1
          ? (this.stamina = l(
              this.stamina - 30 * this.game.DeltaTime,
              1,
              this.staminaMax
            ))
          : !this.running &&
            this.stamina < this.staminaMax &&
            (this.stamina = l(
              this.stamina + 15 * this.game.DeltaTime,
              0,
              this.staminaMax
            ));
    }
    getStaminaPercent() {
      return this.stamina / this.staminaMax;
    }
  }
  class g {
    constructor(e) {
      (this.game = e), (this.player = null), (this.currentValue = 0);
    }
    render(e) {
      this.player
        ? this.DrawPlayerUI(e)
        : (this.player = this.game.findObjectByType(m)),
        this.game.mainCamera.render(e),
        this.DrawFpsCounter(e);
    }
    DrawFpsCounter(e) {
      if (this.game.debug) {
        const t = new i(this.game.canvasWidth),
          a = new i(200, 80),
          r = 20,
          n = new i(
            this.game.canvasWidth - 0.5 * a.x + 0.5 * r,
            0.5 * a.y - 0.5 * r
          );
        s.drawRectangle(e, t, a.x, a.y, "#000"),
          s.drawText(
            e,
            `FPS: ${this.game.fps}`,
            n,
            80,
            "#fff",
            `${r}px 'Press Start 2P', cursive`
          );
      }
      this.currentValue = l(
        this.currentValue + 100 * this.game.DeltaTime,
        0,
        200
      );
    }
    DrawPlayerUI(e) {}
  }
  class w {
    constructor(
      t = new i(),
      s = new e("kursor myszy", 3, "kursor.png", 200, 300)
    ) {
      (this.position = t), (this.sprite = s);
    }
    render(e) {
      s.drawSprite(e, this.position, this.sprite);
    }
    setPosition(e) {
      (this.position.x = e.offsetX), (this.position.y = e.offsetY);
    }
  }
  window.addEventListener("load", async () => {
    const e = new Audio("Sounds/Music/music.ogg");
    e.loop = !0;
    const s = document.querySelector("canvas#game-canvas"),
      a = s.getContext("2d");
    (s.height = 800), (s.width = 800);
    const r = await t.loadSprites(),
      o = new d(s.width, s.height);
    (o.UI = new g(o)),
      o.mapEditor.setSprites(r),
      new n(r),
      s.addEventListener("mousemove", (e) => {
        if (0 === h) {
          const t = 0.5 * o.mapEditor.levelSize,
            s = l(e.offsetX, t, o.canvasWidth),
            a = l(e.offsetY, t, o.canvasHeight);
          let r = Math.ceil(s / t),
            n = Math.ceil(a / t);
          r % 2 == 0 && r--, n % 2 == 0 && n--;
          const c = new i(Math.round(r * t), Math.round(n * t));
          o.mapEditor.cursorPosition = c;
        }
      }),
      s.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      }),
      s.addEventListener("mousedown", (t) => {
        if ((e.play(), !o.editMode)) return;
        const i = o.mapEditor;
        i.calculateGridIndex(),
          0 === t.button && i.placeSprite(),
          2 === t.button && i.removeSprite();
      });
    let c,
      h = 0;
    window.addEventListener("gamepadconnected", (e) => {
      (c = setInterval(u, 100)),
        console.info(`Gamepad connected. ID(${e.gamepad.id})`),
        (h = 1);
    }),
      window.addEventListener("gamepaddisconnected", (e) => {
        clearInterval(c),
          (c = null),
          console.info(`Gamepad disconnected. ID(${e.gamepad.id})`),
          (h = 0);
      }),
      window.addEventListener("keydown", (e) => {
        if (o.editMode) {
          const t = o.mainCamera,
            i = o.mapEditor.levelSize,
            s = t.targetPosition;
          switch (e.key) {
            case "w":
              s.y += -i;
              break;
            case "s":
              s.y += i;
              break;
            case "a":
              s.x += -i;
              break;
            case "d":
              s.x += i;
              break;
            case "q":
              o.mapEditor.changeSprite(-1);
              break;
            case "e":
              o.mapEditor.changeSprite(1);
          }
        }
      });
    const p = new w();
    function u() {
      const e = navigator.getGamepads()[0];
      if (
        e &&
        (e.buttons[7].pressed && e.buttons[1].pressed && (o.debug = !o.debug),
        o.editMode)
      ) {
        const t = o.mapEditor.cursorPosition,
          s = o.mapEditor.levelSize,
          a = {
            minimum: 0.5 * s,
            maximum: s * (o.mapEditor.rowMaxCells - 0.5),
          },
          r = new i(0, 0),
          n = o.mapEditor;
        e.buttons[15].pressed && (r.x = 1),
          e.buttons[14].pressed && (r.x = -1),
          e.buttons[12].pressed && (r.y = -1),
          e.buttons[13].pressed && (r.y = 1),
          (t.x = l(t.x + s * r.x, a.minimum, a.maximum)),
          (t.y = l(t.y + s * r.y, a.minimum, a.maximum)),
          (0 === r.x && 0 === r.y) || n.calculateGridIndex(),
          e.buttons[0].pressed && n.placeSprite(),
          e.buttons[1].pressed && !o.debug && n.removeSprite(),
          e.buttons[4].pressed &&
            (n.changeSprite(-1),
            e.vibrationActuator?.playEffect("dual-rumble", {
              duration: 100,
              weakMagnitude: 0.7,
            })),
          e.buttons[5].pressed &&
            (n.changeSprite(1),
            e.vibrationActuator?.playEffect("dual-rumble", {
              duration: 100,
              weakMagnitude: 0.7,
            }));
      }
    }
    o.addObject(p),
      s.addEventListener("wheel", (e) => {}),
      s.addEventListener("mousemove", (e) => {
        p.setPosition(e);
      }),
      (function e() {
        o.render(a), requestAnimationFrame(e);
      })();
  });
})();
