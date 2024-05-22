addLayer("f", {
    name: "focus", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "f", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#6CEB28",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "magical energy", // Name of prestige currency
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
                return player[this.layer].points.add(1).pow(0.5).add(1)
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

addLayer("m", {
    position: 1,
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#42A4F5",                       // The color for this layer, which affects many elements.
    resource: "mana",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(50),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        
        mult = new Decimal(1)
        if (hasUpgrade('m', 13)) mult = mult.times(upgradeEffect('m', 13))
        return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    milestones: 
    {
        0: 
        {
            requirementDescription: "1 mana",
            effectDescription: "After accumulating magical energy, you notice something new",
            done() { return player.m.points.gte(1) },
        },
    },
    upgrades: 
    {
        11: 
        {
            title: "Magical energy attraction",
            description: "You use your mana to attract more magical energy",
            cost: new Decimal(1),
            unlocked()
            {
                return hasMilestone('m',0)
            },
            effect() 
            {
                return player[this.layer].points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        12: 
        {
            title: "Remove distractions",
            description: "You can focus better thanks to mana",
            cost: new Decimal(2),
            unlocked()
            {
                return hasMilestone('m',0)
            },
            effect() 
            {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

            
        },
        13: 
        {
            title: "Mana understanding I",
            description: "You create mana faster with your newfound knowledge",
            cost: new Decimal(10),
            unlocked()
            {
                return hasMilestone('m',0)
            },
            effect() 
            {
                return player[this.layer].points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
})

