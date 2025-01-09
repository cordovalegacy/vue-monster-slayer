const app = Vue.createApp({
    data() {
        return {
            battleLogList: [],
            monsterHealth: 100,
            playerHealth: 100,
            damage: 0,
            whoseTurn: 'player'
        }
    },
    watch: {
        whoseTurn() {
            if (this.whoseTurn === 'monster') {
                setTimeout(() => {
                    this.damage = Math.floor(Math.random() * 100)
                    if (this.damage >= this.playerHealth) {
                        alert('The monster has beaten you, you lose!')
                        this.playerHealth = 0
                    } else {
                        this.playerHealth -= this.damage
                    }
                    this.battleLogList.push('The monster has attacked you for ' + this.damage)
                    this.damage = 0
                    this.whoseTurn = 'player'
                }, 3000)
            }
        }
    },
    computed: {
        monsterBarStyles() {
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyles() {
            return { width: this.playerHealth + '%' }
        }
    },
    methods: {
        addToBattleLog(value) {
            if (this.playerHealth === 0 || this.monsterHealth === 0) {
                if (window.confirm('Would you like to play again?')) {
                    this.playerHealth = 100
                    this.monsterHealth = 100
                    this.damage = 0
                    this.whoseTurn = 'player'
                    this.battleLogList = []
                }
                return
            }

            switch (value) {
                case 'ATTACK':
                    const attackMessage = 'You have attacked for '
                    this.handleMonsterDamage(value)
                    this.battleLogList.push(`${attackMessage} ${this.damage}`)
                    break
                case 'SPECIAL ATTACK':
                    this.handleMonsterDamage(value)
                    const specialAttackMessage = 'You have special attacked for'
                    this.battleLogList.push(`${specialAttackMessage} ${this.damage}`)
                    break
                case 'HEAL':
                    this.handleMonsterDamage(value)
                    const healMessage = 'You have healed for'
                    this.battleLogList.push(`${healMessage} ${this.damage}`)
                    break;
                case 'SURRENDER':
                    const surrenderMessage = 'You have surrendered'
                    this.battleLogList.push(surrenderMessage)
                    this.playerHealth = 0
                    alert('Game Over, You Lose')
                    break;
                default:
                    break;
            }

            if (this.monsterHealth > 0) {
                this.damage = 0
                this.whoseTurn = 'monster'
            } else {
                this.monsterHealth = 0
                this.damage = 0
                alert('You win! You beat the monster')
            }
        },
        handleMonsterDamage(damageType) {
            this.damage = Math.floor(Math.random() * 100)
            switch (damageType) {
                case 'ATTACK':
                    this.monsterHealth -= this.damage
                    break
                case 'SPECIAL ATTACK':
                    this.damage *= 2
                    if (this.damage > this.monsterHealth) {
                        this.monsterHealth = 0
                        this.damage = 0
                        alert('You have beaten the monster')
                    } else {
                        this.monsterHealth -= this.damage
                    }
                    break
                case 'HEAL':
                    if (this.playerHealth >= 100) {
                        this.playerHealth = 100
                        alert('Your health has been fully restored')
                        return
                    }
                    this.playerHealth += 30
                    this.damage = 30
            }
        }
    }
})

app.mount("#game")