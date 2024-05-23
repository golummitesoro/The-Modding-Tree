addLayer("f", {
    name: "focus", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#6CEB28",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "focus", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() // Calculate the multiplier for main currency from bonuses
    { 
        mult = new Decimal(1)
        if (hasUpgrade('f', 13)) mult = mult.times(upgradeEffect('f', 13))
        if (hasUpgrade('m', 12)) mult = mult.times(upgradeEffect('m', 12))
        return mult
    },
    gainExp() 
    { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: 
    [
        {key: "M", description: "M: Reset for magical energy", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    branches:["m"],
    upgrades: 
    {
        11: 
        {
            title: "Start focusing",
            description: "You can feel some strange energy around you",
            cost: new Decimal(1),
        },
        12: 
        {
            title: "Close your eyes",
            description: "You realize your focus influences how much energy you feel",
            cost: new Decimal(2),
            effect() 
            {
                return player[this.layer].points.add(1).pow(0.5).add(1).times(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: 
        {
            title: "Calm your mind",
            description: "This new energy clears your mind, helping you focus",
            cost: new Decimal(2),
            effect() 
            {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
})



