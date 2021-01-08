import Phaser from 'phaser'

const orientation = {
  vertical: 0,
  horizontal: 1,
};

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super('hello-world')
    /** number of cells in the grid */
    this.gridSize = { x: 5, y: 5 };

    /** size of each square cell (width & height) */
    this.cellSize = 100;

    /** the position of the grid, expressed in top/left offsets from the top-left canvas corner */
    this.gridPosition = { top: 50, left: 50 };

    /** the maximum valid grid positions on each axis */
    this.cellMaxPositions = { x: this.cellSize * (this.gridSize.x-1), y: this.cellSize * (this.gridSize.y-1) };
  }

  preload() {
    this.load.setBaseURL('http://labs.phaser.io')

    this.load.image('sky', 'assets/skies/space3.png')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('red', 'assets/particles/red.png')
  }

  create() {

    this.createGridCells();
    this.createShipGroup();
    this.createShip({ length: 1, color:0x21810f, position: {x:3,y:3}});
    this.createShip({ length: 2, color:0x810f21, position: {x:0,y:0}});

  }

  createGridCells() {
    console.log(`creating grid`);
    this.gridCells = this.add.grid(this.gridPosition.left, this.gridPosition.top, this.cellSize*5, this.cellSize*5, this.cellSize, this.cellSize, 0x9a9a9a, 1, null, 0).setAltFillStyle(0x757575);
    this.gridCells.showOutline = false;
    this.gridCells.setOrigin(0,0);
  }

  createShipGroup() {
    /** the group of ships */
    this.shipGroup = this.add.group();
  }

  createShip({length, color=0x990000, position}) {
    console.log(`creating ship with length ${length}, color #${color}`);
    const ship = this.add.rectangle(this.gridPosition.left + position.y * this.cellSize, this.gridPosition.top + position.x * this.cellSize, this.cellSize*length, this.cellSize, color);
    ship.setOrigin(0,0);
    ship.setInteractive();

    ship.setData("length", length);
    ship.setData("orientation", orientation.horizontal);
    ship.setData("isHorizontal", () => ship.getData("orientation") === orientation.horizontal );
    ship.setData("isVertical", () => ship.getData("orientation") === orientation.vertical );

    this.shipGroup.add(ship);

    ship.on('pointerover', () => { });

    ship.on('pointerout', () => { });

    this.input.setDraggable(ship);

    this.input.on('dragstart', (pointer, gameObject) => { });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    this.input.on('dragend', (pointer, gameObject) => {
      const sizeAdjustedX = this.cellMaxPositions.x - (+gameObject.getData("isHorizontal")() * this.cellSize * (gameObject.getData("length") - 1));
      const sizeAdjustedY = this.cellMaxPositions.y - (+gameObject.getData("isVertical")() * this.cellSize * (gameObject.getData("length") - 1));
      const clampX = Phaser.Math.Clamp(gameObject.x, 0, sizeAdjustedX);
      const clampY = Phaser.Math.Clamp(gameObject.y, 0, sizeAdjustedY);
      const snapX = Phaser.Math.Snap.To(clampX, this.cellSize, this.gridPosition.left);
      const snapY = Phaser.Math.Snap.To(clampY, this.cellSize, this.gridPosition.top);

      this.tweens.add({
        targets: gameObject,
        x: snapX,
        y: snapY,
        yoyo: false,
        duration: 88
      })
    });

  }

  getValidPosition({ship, target}) {
    console.log(`trying to place ship at ${target}`);
  }
}
