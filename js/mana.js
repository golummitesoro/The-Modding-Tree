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
                return player[this.layer].points.add(1).pow(0.4)
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