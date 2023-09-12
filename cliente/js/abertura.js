export default class abertura extends Phaser.Scene {
  constructor () {
    super('abertura')
  }
  preload() {
    this.load.spritesheet('abertura', '../assets/capa.png', {
      frameWidth: 800,
      frameHeight: 450,
    })
  }
    create() {
      this.abertura = this.add.sprite(400, 225, 'abertura')
      this.add.text(50, this.game.config.height * 0.85, '[iniciar]')
        .setInteractive()
        .on('pointerdown', () => {
          this.game.scene.stop('abertura')
          this.game.scene.start('cena1')
        })

      /*Abertura*/

      this.anims.create({
        key: 'abertura',
        frames: this.anims.generateFrameNumbers('abertura', {
          start: 0,
          end: 4
        }),
        frameRate: 3,
        repeat: -1
      })

      this.abertura.anims.play('abertura')
    }
  }

