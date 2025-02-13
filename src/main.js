import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [HelloWorldScene]
}

export default new Phaser.Game(config)
