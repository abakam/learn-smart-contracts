const { expect } = require("chai");
require("ethers");

// Start test lock
describe('Box With Ownable', function(){

    before(async function() {
        this.Box = await ethers.getContractFactory("BoxWithOwnable")
    });

    this.beforeEach(async function() {
        this.box = await this.Box.deploy();
        await this.box.deployed();
    })

    it('retrieve returns a previously stored value', async function() {
        // Store value
        await this.box.store(52);

        // Test if the returned value is same one
        // To compare 256 bit integers, you need to use strings
        expect((await this.box.retrieve()).toString()).to.equal('52');
    });
});